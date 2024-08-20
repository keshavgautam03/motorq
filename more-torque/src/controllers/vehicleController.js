const express = require('express');
const router = express.Router();
const cache = require('../utils/cache');
const { decodeVin } = require('../services/nhtsaService');

// In-memory store for vehicles and organizations (for demonstration)
const vehicles = [];
const organizations = new Set();

// Initialize organizations (for testing)
const initializeOrganizations = () => {
  organizations.add('yyyyyy');  // Add some valid organization IDs for testing
};

initializeOrganizations();

// Mock function to simulate checking if an organization exists
const isOrgValid = (org) => organizations.has(org);

// Function to validate VIN format
const validateVin = (vin) => /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);

// Route to get vehicle details by VIN
router.get('/:vin', async (req, res) => {
  const { vin } = req.params;

  if (!validateVin(vin)) {
    return res.status(400).json({ message: 'Invalid VIN format' });
  }

  // Check if the vehicle exists in the in-memory store
  const vehicle = vehicles.find(v => v.vin === vin);
  if (!vehicle) {
    return res.status(404).json({ message: 'Vehicle not found' });
  }

  res.status(200).json(vehicle);
});

// Route to add a vehicle
router.post('/', async (req, res) => {
  const { vin, org } = req.body;

  console.log('Received VIN:', vin);  // Log the VIN for debugging

  // Validate VIN
  if (!validateVin(vin)) {
    return res.status(400).json({ message: 'Invalid VIN format' });
  }

  // Validate Organization
  if (!isOrgValid(org)) {
    return res.status(400).json({ message: 'Invalid organization ID' });
  }

  try {
    // Check cache first
    const cachedData = cache.get(vin);
    if (cachedData) {
      return res.status(201).json(cachedData);
    }

    const vehicleData = await decodeVin(vin);
    const newVehicle = { vin, org, ...vehicleData };
    vehicles.push(newVehicle);  // Store the vehicle in memory
    cache.set(vin, newVehicle); // Cache the vehicle data
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
