const express = require('express');
const router = express.Router();

const foundersData = require('../data/founders.json');
const startupsData = require('../data/startups.json');

router.get('/', (req, res) => {
  res.json(foundersData);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const founder = foundersData.find(f => f.id === id);
  
  if (!founder) {
    return res.status(404).json({ error: 'Fundador no encontrado' });
  }
  
  const startup = startupsData.find(s => s.founders && s.founders.includes(id));
  
  res.json({
    ...founder,
    startup: startup || null,
    shame_contribution: startup ? startup.shame_level : 0
  });
});

module.exports = router;
