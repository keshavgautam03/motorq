const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// GET /vehicles/:vin
router.get('/:vin', vehicleController.getVehicleDetails);

// POST /vehicles
router.post('/', vehicleController.addVehicle);

module.exports = router;
