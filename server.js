const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const passport = require('passport');
const passportSetup = require('./controllers/passportGoogle');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const googleAuthRoute = require('./routes/googleAuth');
const authRoutes = require('./routes/authRoutes');
const usersRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');
const doctorRoutes = require('./routes/doctorsRoute');

const app = express();

// Passport code
app.use(
	cookieSession({
		name: 'access_token',
		keys: ['testKeys'],
		maxAge: 24 * 60 * 60 * 1000, // Max session duration: 24 hours in milliseconds
	})
);

app.use(express.json());
app.use(cookieParser());

app.use(
	session({
		secret: process.env.GOOGLE_CLIENT_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

// Passport code
app.use(passport.initialize());
app.use(passport.session());

// Passport code
app.use(
	cors({
		origin: 'http://localhost:3000',
		methods: 'GET,POST,PUT,DELETE',
		credential: true,
	})
);

// Routes
app.use('/api/google-auth', googleAuthRoute);
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRoutes);

// Connected to mongoDB
const connectDB = async () => {
	try {
		// acquire connection string from .env
		await mongoose.connect(process.env.DB_CONNECTION_STRING);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error('Error connecting to MongoDB:', err);
		// ending process
		process.exit(1);
	}
};

// Heroku build config
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('*', (req, res) => {
	res.sendFile(path.resolve(_dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
	connectDB();
	console.log(`Listening on port:${PORT}`);
});

module.exports = app;
