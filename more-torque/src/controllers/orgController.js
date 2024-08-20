const express = require('express');
const router = express.Router();

// In-memory store for organizations (for demonstration)
const organizations = new Set();

// Function to validate organization input
const validateOrgInput = (org) => {
  if (typeof org.name !== 'string') return 'Invalid name';
  if (typeof org.account !== 'string') return 'Invalid account';
  if (typeof org.website !== 'string') return 'Invalid website';
  if (org.fuelReimbursementPolicy !== undefined && typeof org.fuelReimbursementPolicy !== 'string') return 'Invalid fuelReimbursementPolicy';
  if (typeof org.speedLimitPolicy !== 'string') return 'Invalid speedLimitPolicy';
  return null;
};

// Route to add an organization
router.post('/', (req, res) => {
  const { name, account, website, fuelReimbursementPolicy, speedLimitPolicy } = req.body;

  const validationError = validateOrgInput(req.body);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  const orgFuelReimbursementPolicy = fuelReimbursementPolicy || '1000';

  if (organizations.has(account)) {
    return res.status(400).json({ message: 'Organization with this account already exists' });
  }

  const newOrg = {
    name,
    account,
    website,
    fuelReimbursementPolicy: orgFuelReimbursementPolicy,
    speedLimitPolicy
  };

  organizations.add(account);
  res.status(201).json(newOrg);
});

module.exports = router;
