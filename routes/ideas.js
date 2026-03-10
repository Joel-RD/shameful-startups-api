const express = require('express');
const router = express.Router();

const ideasData = require('../data/ideas.json');

router.get('/', (req, res) => {
  res.json(ideasData);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const idea = ideasData.find(i => i.id === id);
  
  if (!idea) {
    return res.status(404).json({ error: 'Idea no encontrada' });
  }
  
  res.json(idea);
});

module.exports = router;
