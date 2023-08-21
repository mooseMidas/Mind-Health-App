const Doctor = require('../models/doctorModel');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');

// Retrieve doctor details based on their ID
exports.getDoctorByID = async (req, res) => {
  try {
    // Find the doctor by their ID
    const doctor = await Doctor.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: 'Doctor details found',
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error getting doctor info', success: false, error });
  }
};

// Allow a doctor to update their profile details
exports.updateDoctorProfile = async (req, res) => {
  try {
    // Find the doctor by their userId and update their profile details
    const doctor = await Doctor.findOneAndUpdate(
      { userId: req.body.userId },
      req.body,
    );
    res.status(200).send({
      success: true,
      message: 'Doctor profile updated successfully',
      data: doctor,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error getting doctor info', success: false, error });
  }
};

// Allow a doctor to view appointments they have received
exports.getAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ userId: req.body.userId });
    // Find appointments associated with the doctor
    const appointments = await Appointment.find({ doctorId: doctor._id });
    res.status(200).send({
      message: 'Appointments fetched successfully',
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

// Allows doctor to accept or reject appointment request
exports.changeAppointmentStatus = async (req, res) => {
  try {
    // Extract appointmentId and status from the request body
    const { appointmentId, status } = req.body;
    // Update the appointment's status
    const appointment = await Appointment.findByIdAndUpdate(appointmentId, {
      status,
    });
    // Find the user associated with the appointment
    const user = await User.findOne({ _id: appointment.userId });
    // Update user's unseenNotifications array with a new notification
    const { unseenNotifications } = user;
    unseenNotifications.push({
      type: 'appointment-status-changed',
      message: `Your appointment has been ${status}`,
      onClickPath: '/appointments',
    });
    // Save the user's updated information
    await user.save();

    res.status(200).send({
      message: 'Appointment status updated successfully',
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: 'Error changing appointment status',
      success: false,
      error,
    });
  }
};
