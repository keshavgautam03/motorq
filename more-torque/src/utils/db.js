const mongoose = require('mongoose');
const { mongodbUri } = require('../config');

const connectDB = async () => {
  try {
    await mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
