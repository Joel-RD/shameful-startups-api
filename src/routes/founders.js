const express = require('express');
const router = express.Router();
const foundersController = require('../controllers/foundersController');

router.get('/', foundersController.getAllFounders);
router.get('/:id', foundersController.getFounderById);

module.exports = router;
