const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // User can apply for doctor role in UI
  isDoctor: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  // Will store notification data
  seenNotifications: {
    type: Array,
    default: [],
  },
  unseenNotifications: {
    type: Array,
    default: [],
  },

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
