/* eslint-disable consistent-return */
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

// Checks if the user is logged in
exports.isLoggedIn = async (req, res) => {
  // Retrieve the access_token cookie
  const token = req.cookies.access_token;

  // If token is not present, return false
  if (!token) {
    return res.json(false);
  }
  // Verify the token, if valid return true, otherwise return false
  return jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      return res.json(false);
    }
    return res.send(true);
  });
};

// Retrieves a user's information
exports.getUserInfo = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id;
    // Retrieve and return the user's name and email only
    const data = await User.findById(userId).select('name email isDoctor isAdmin seenNotifications unseenNotifications');
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

// Handles user registration
exports.registerDoctor = async (req, res) => {
  try {
    // Acquire doctor application from UI then save to MongoDB with pending status
    const newDoctor = new Doctor({ ...req.body, status: 'pending' });
    await newDoctor.save();
    // Find admin to notify of application
    const adminUser = await User.findOne({ isAdmin: true });
    const { unseenNotifications } = adminUser;
    // notification is pushed to admin unseen notification box
    unseenNotifications.push({
      type: 'new-doctor-request',
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor role`,
      data: {
        doctorId: newDoctor._id,
        name: `${newDoctor.firstName} ${newDoctor.lastName}`,
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: 'Application success',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error creating doctor profile', success: false, err });
  }
};

// Updates all notifications as seen
exports.markAllAsSeen = async (req, res) => {
  try {
    // User ID acquired from post request then used to find user in DB
    const user = await User.findOne({ _id: req.body.userId });
    // Extract the unseenNotifications and seenNotifications arrays from the user
    const { unseenNotifications } = user;
    const { seenNotifications } = user;
    // Move all unseenNotifications to the seenNotifications array then clear seenNotifications
    seenNotifications.push(...unseenNotifications);
    user.unseenNotifications = [];
    user.seenNotifications = seenNotifications;
    const updateUser = await user.save();
    // User's password is hiddeen before sending data
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: 'All notifications marked as seen',
      data: updateUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error updating notifications', success: false, err });
  }
};

// This function deletes all notifications for a specific user.
exports.deleteAllNotifications = async (req, res) => {
  try {
    // Find the user based on the provided userId from the request
    const user = await User.findOne({ _id: req.body.userId });
    // Clear both the unseenNotifications and seenNotifications arrays for the user
    user.unseenNotifications = [];
    user.seenNotifications = [];
    // Save the user's updated information after removing notifications
    const updateUser = await user.save();
    // Remove the password field from the updateUser object before sending the response
    updateUser.password = undefined;
    res.status(200).send({
      success: true,
      message: 'All notifications deleted',
      data: updateUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error deleting notifications', success: false, err });
  }
};

// This function retrieves a list of all approved doctors. To display on Home page.
exports.getAllApprovedDoctors = async (req, res) => {
  try {
    // Find all doctors in the database with an 'approved' status
    const doctors = await Doctor.find({ status: 'approved' });
    res.status(200).send({
      message: 'Data found successfully',
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error fetching data',
      success: false,
      error,
    });
  }
};

// This function allows users to book a new appointment.
exports.bookAppointment = async (req, res) => {
  try {
    // Set the status of the appointment as 'pending'
    req.body.status = 'pending';
    // Create a new appointment instance using the request body
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    // Find the doctor associated with the appointment request
    const doctor = await User.findOne({ _id: req.body.doctorInfo.userId });
    // Add a new notification to the doctor's unseenNotifications array
    doctor.unseenNotifications.push({
      type: 'new-appointment-request',
      message: `A new appointment request has been made by ${req.body.userInfo.name} for ${req.body.date} ${req.body.time}`,
    });
    await doctor.save();
    res.status(200).send({
      message: 'Booking request sent through, please wait for approval',
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error booking appointment',
      success: false,
      error,
    });
  }
};

// This function retrieves all appointments associated with a specific user.
exports.getAppointmentsByUserId = async (req, res) => {
  try {
    // Find all appointments in the database with a matching userId
    const appointments = await Appointment.find({ userId: req.body.userId });
    res.status(200).send({
      message: 'Appointments found successfully',
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error fetching appointments',
      success: false,
      error,
    });
  }
};
