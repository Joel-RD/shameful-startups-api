const express = require('express');
const router = express.Router();
const ideasController = require('../controllers/ideasController');

router.get('/', ideasController.getAllIdeas);
router.get('/:id', ideasController.getIdeaById);

module.exports = router;
