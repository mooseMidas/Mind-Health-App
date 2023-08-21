const mongoose = require('mongoose');

const { Schema } = mongoose;

const doctorSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  feePerConsult: {
    type: Number,
    required: true,
  },
  consultHours: {
    type: Array,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },

}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
