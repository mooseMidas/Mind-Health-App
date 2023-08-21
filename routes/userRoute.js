const express = require('express');
const { checkJWTToken } = require('../middleware/middleware.js');
const {
	isLoggedIn,
	getUserInfo,
	registerDoctor,
	markAllAsSeen,
	deleteAllNotifications,
	getAllApprovedDoctors,
	bookAppointment,
	getAppointmentsByUserId,
} = require('../controllers/users.js');

const router = express.Router();

router.get('/is_logged_in', checkJWTToken, isLoggedIn);
router.get('/get-user', checkJWTToken, getUserInfo);
router.post('/register-doctor', checkJWTToken, registerDoctor);
router.put('/mark-all-as-seen', checkJWTToken, markAllAsSeen);
router.delete(
	'/delete-all-notifications',
	checkJWTToken,
	deleteAllNotifications
);
router.get('/get-all-approved-doctors', checkJWTToken, getAllApprovedDoctors);
router.post('/book-appointment', checkJWTToken, bookAppointment);
router.post(
	'/get-appointments-by-userId',
	checkJWTToken,
	getAppointmentsByUserId
);

module.exports = router;
