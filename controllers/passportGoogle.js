const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const User = require('../models/userModel');
require('dotenv').config();

// Config for both deployed and local hosting
const strategyConfig = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL:
		process.env.NODE_ENV === 'production'
			? `${process.env.HEROKU_HOST_URI}/api/google-auth/google/callback`
			: `${process.env.HOST}:${process.env.PORT}/api/google-auth/google/callback`,
	passReqToCallback: true,
	scope: ['profile', 'email'],
};

// Configure Google OAuth strategy
passport.use(
	new GoogleStrategy(
		strategyConfig,
		async (accessToken, refreshToken, email, profile, done) => {
			try {
				// Check if the user with the given email already exists
				let user = await User.findOne({ email: profile.emails[0].value });
				if (!user) {
					// If the user doesn't exist, create a new user
					user = new User({
						name: profile.displayName,
						email: profile.emails[0].value,
						password: 'google', // Temporary password
					});
					await user.save();
				}
				// Pass the user to the done callback
				done(null, user);
			} catch (err) {
				done(err);
			}
		}
	)
);

// Serialize user's ID to store in the session
passport.serializeUser((user, done) => {
	done(null, user);
});

// Deserialize user by retrieving user from the database using the serialized ID
passport.deserializeUser(async (id, done) => {
	try {
		const user = await User.findById(id);
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

// React Social Login with Passport.js | React oAuth w/ Google, Facebook, Github, YouTube, Retrieved on 16 August 2023 from https://www.youtube.com/watch?v=7K9kDrtc4S8&t=2776s
