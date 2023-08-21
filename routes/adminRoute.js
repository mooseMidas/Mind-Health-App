const express = require('express');
const { checkJWTToken } = require('../middleware/middleware.js');
const {
	getAllDoctors,
	getAllUsers,
	updateDoctor,
	getAllAppointments,
} = require('../controllers/admin.js');

const router = express.Router();

router.get('/get-all-doctors', checkJWTToken, getAllDoctors);
router.get('/get-all-users', checkJWTToken, getAllUsers);
router.get('/get-all-appointments', checkJWTToken, getAllAppointments);
router.post('/update-doctor-status', checkJWTToken, updateDoctor);

module.exports = router;
