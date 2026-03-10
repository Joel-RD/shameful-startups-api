const express = require('express');
const router = express.Router();

const industriesData = require('../data/industries.json');
const startupsData = require('../data/startups.json');

router.get('/', (req, res) => {
  const industryCounts = {};
  
  startupsData.forEach(startup => {
    industryCounts[startup.industry] = (industryCounts[startup.industry] || 0) + 1;
  });
  
  const industries = industriesData.map(ind => ({
    ...ind,
    startup_count: industryCounts[ind.name] || 0
  }));
  
  res.json(industries);
});

module.exports = router;
