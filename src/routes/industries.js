const express = require('express');
const router = express.Router();
const industriesController = require('../controllers/industriesController');

router.get('/', industriesController.getAllIndustries);

module.exports = router;
