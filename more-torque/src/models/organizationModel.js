const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  account: { type: String, required: true, unique: true },
  website: String,
  fuelReimbursementPolicy: { type: String, default: '1000' },
  speedLimitPolicy: String,
});

module.exports = mongoose.model('Organization', organizationSchema);
