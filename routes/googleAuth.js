const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Route for successful Google login
router.get('/login/success', (req, res) => {
    if(req.user){
    // Create a payload for the JWT token
    const payload = {
        id: req.user._id,
        name: req.user.name,
      };
      // Generate JWT token with payload and set expiration time to 1 day
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
  
      // Set the token as a cookie and send success response
      // Token will be stored in UI
       res
        .cookie('access_token', token, {
          httpOnly: true,
        })
        // User is then redirected to home page
        .redirect('http://localhost:3000/')
    } else {
        res.status(403).send({
            success: false,
            message: 'Not authorized by Google',
        });
    }
});

// Route for failed Google login
router.get('/login/failed', (req, res) => {
  // Respond with a unauthorized response for failed authentication
	res.status(401).send({
		success: false,
		message: 'Failed to authenticate with Google',
	});
});

// Google callback route after successful authentication
router.get(
	'/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/login/failed',
		successRedirect: 'http://localhost:5000/api/google-auth/login/success', // Redirect upon successful authentication
	})
);

// Initiates Google authentication middleware
router.get(
	'/google',
	passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Logout route
router.get('/logout', (req, res) => {
    // Log out the user and clear the JWT token cookie
    req.logout();
    res.clearCookie('access_token'); // Clear the JWT token cookie
    // Redirect to the login page
    res.redirect('http://localhost:3000/login')
})

module.exports = router;
