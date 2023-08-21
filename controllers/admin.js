const User = require('../models/userModel');
const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');

// Strictly admin controllers.

// Pulls all doctors data from DB
exports.getAllDoctors = async (req, res) => {
  try {
    // find all doctors
    const doctors = await Doctor.find({});
    res.status(200).send({
      success: true,
      message: 'Doctor List Found',
      data: doctors,
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
      success: false,
      message: 'Error fetching Doctor data',
    });
  }
};

// Returns all users from DB
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      success: true,
      message: 'User List Found',
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
      success: false,
      message: 'Error fetching user data',
    });
  }
};

// Retruns all appintments from DB
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({});
    res.status(200).send({
      success: true,
      message: 'Appointment List Found',
      data: appointments,
    });
  } catch (err) {
    console.log(err);
    res.status(200).send({
      success: false,
      message: 'Error fetching user data',
    });
  }
};

// Allows admin to update status of isDoctor
exports.updateDoctor = async (req, res) => {
  try {
    // First find doctor by ID in DB then update status value
    const { doctorId, status } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    });
    // Notifying doctor of status update by using userID
    // Note: Only the User model contains the notifications object
    const user = await User.findOne({ _id: doctor.userId });
    const { unseenNotifications } = user;
    unseenNotifications.push({
      type: 'new-doctor-request-changed',
      message: `${doctor.firstName} ${doctor.lastName} your account has been ${status}`,
      onClickPath: '/notifications',
    });
    // Update the isDoctor field based on the approval status
    user.isDoctor = status === 'approved';
    await user.save();

    res.status(200).send({
      message: 'Doctor status updated successfully',
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error applying doctor account',
      success: false,
      error,
    });
  }
};
