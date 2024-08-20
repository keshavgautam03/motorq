const express = require('express');
const mongoose = require('mongoose');
const rateLimiter = require('./middleware/rateLimiter'); // Corrected path
const vehicleRoutes = require('./controllers/vehicleController'); // Corrected path
const organizationRoutes = require('./controllers/orgController'); // Corrected path

const app = express();
app.use(express.json());

// Middleware for rate limiting
app.use(rateLimiter);

// API routes
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/orgs', organizationRoutes);

// MongoDB connection
mongoose.connect('mongodb+srv://keshavgautam0101:TMwE1m738Wm7AMDd@cluster0.enas9au.mongodb.net/IOT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
