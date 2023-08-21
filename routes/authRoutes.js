const express = require('express');
const {
  register,
  login,
  logout,
  googleAuth,
  googleAuthCallback,
} = require('../controllers/auth.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);


module.exports = router;
