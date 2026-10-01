// Database Schema Model - Student Data Structure Definition
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Student email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['Computer Science', 'Electrical Eng', 'Business Admin', 'Physics', 'Mathematics', 'Arts & Design']
  }
}, {
  timestamps: true // Auto adds createdAt and updatedAt
});

module.exports = mongoose.model('Student', studentSchema);