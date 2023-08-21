const express = require('express');
const { checkJWTToken } = require('../middleware/middleware.js');
const {
  getDoctorByID, updateDoctorProfile, getAppointmentsByDoctorId, changeAppointmentStatus,
} = require('../controllers/doctor.js');

const router = express.Router();

router.post('/get-doctor-by-doctorId', checkJWTToken, getDoctorByID);
router.put('/update-doctor-profile', checkJWTToken, updateDoctorProfile);
router.post('/get-appointments-by-doctorId', checkJWTToken, getAppointmentsByDoctorId);
router.post('/change-appointment-status', checkJWTToken, changeAppointmentStatus);

module.exports = router;
