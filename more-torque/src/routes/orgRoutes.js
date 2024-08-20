const express = require('express');
const router = express.Router();
const orgController = require('../controllers/orgController');

// POST /orgs
router.post('/', orgController.addOrganization);

module.exports = router;
