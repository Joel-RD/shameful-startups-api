const express = require('express');
const router = express.Router();
const startupsController = require('../controllers/startupsController');

router.get('/random', startupsController.getRandomStartup);
router.get('/top/shame', startupsController.getTopShame);
router.get('/top/funding', startupsController.getTopFunding);
router.get('/search', startupsController.searchStartups);
router.post('/', startupsController.createStartup);
router.get('/', startupsController.getAllStartups);
router.get('/:id', startupsController.getStartupById);

module.exports = router;
