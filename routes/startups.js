const express = require('express');
const router = express.Router();

const startupsData = require('../data/startups.json');

router.get('/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * startupsData.length);
  const startup = startupsData[randomIndex];
  
  res.json({
    message: "🎲 Aquí tienes tu startup al azar. Que la vergüenza te acompañe.",
    startup
  });
});

router.get('/top/shame', (req, res) => {
  let results = [...startupsData];
  
  if (req.query.min_shame) {
    const minShame = parseInt(req.query.min_shame);
    results = results.filter(s => s.shame_level >= minShame);
  }
  
  results.sort((a, b) => b.shame_level - a.shame_level);
  
  const limit = parseInt(req.query.limit) || 10;
  const topShame = results.slice(0, limit);
  
  res.json({
    message: "🏆 Las startups más vergonzosas. Vergüenza ajena asegurada.",
    count: topShame.length,
    results: topShame
  });
});

router.get('/top/funding', (req, res) => {
  let results = [...startupsData];
  
  results.sort((a, b) => b.funding - a.funding);
  
  const limit = parseInt(req.query.limit) || 10;
  const topFunding = results.slice(0, limit);
  
  const totalFunding = results.reduce((sum, s) => sum + s.funding, 0);
  
  res.json({
    message: "💰 Las startups con más funding. Spoiler: todo es falso.",
    total_funding: `$${totalFunding.toLocaleString()} (falso)`,
    count: topFunding.length,
    results: topFunding
  });
});

router.get('/search', (req, res) => {
  const query = req.query.q;
  
  if (!query) {
    return res.status(400).json({ 
      error: 'Parámetro de búsqueda requerido',
      example: '/api/startups/search?q=blockchain'
    });
  }
  
  const queryLower = query.toLowerCase();
  
  const results = startupsData.filter(s => {
    return (
      (s.name && s.name.toLowerCase().includes(queryLower)) ||
      (s.description && s.description.toLowerCase().includes(queryLower)) ||
      (s.idea_real && s.idea_real.toLowerCase().includes(queryLower))
    );
  }).map(s => {
    const highlighted = {
      ...s,
      highlight: {
        name: s.name ? s.name.replace(new RegExp(`(${query})`, 'gi'), '**$1**') : null,
        description: s.description ? s.description.replace(new RegExp(`(${query})`, 'gi'), '**$1**') : null
      }
    };
    return highlighted;
  });
  
  res.json({
    message: `🔍 Resultados para "${query}"`,
    query,
    count: results.length,
    results
  });
});

const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
  const { name, description, industry, funding, shame_level, founded, idea_real } = req.body;
  
  const errors = [];
  if (!name) errors.push('name es requerido');
  if (!description) errors.push('description es requerido');
  if (!industry) errors.push('industry es requerido');
  if (!shame_level) errors.push('shame_level es requerido');
  if (!founded) errors.push('founded es requerido');
  
  if (errors.length > 0) {
    return res.status(400).json({ 
      error: 'Campos requeridos faltantes',
      missing_fields: errors
    });
  }
  
  const goodWords = ['útil', 'exitoso', 'rentable', 'sostenible', 'innovador', 'revolucionario'];
  const hasGoodWords = goodWords.some(word => name.toLowerCase().includes(word) || description.toLowerCase().includes(word));
  
  if (hasGoodWords || shame_level < 5) {
    return res.status(422).json({
      error: 'Esta startup es demasiado buena para esta API',
      message: 'Lo sentimos, solo aceptamos ideas vergonzosas. Intenta con más cringe.',
      tip: 'Agrega más palabras como "blockchain", "AI", "metaverso", o "DAO"'
    });
  }
  
  const newId = Math.max(...startupsData.map(s => s.id)) + 1;
  const newStartup = {
    id: newId,
    name,
    description,
    industry,
    funding: funding || 0,
    shame_level,
    founded,
    idea_real: idea_real || description,
    founders: []
  };
  
  startupsData.push(newStartup);
  
  try {
    const dataPath = path.join(__dirname, '../data/startups.json');
    fs.writeFileSync(dataPath, JSON.stringify(startupsData, null, 2), 'utf8');
    
    res.status(201).json({
      message: "🎉 Nueva startup vergonzosa creada y guardada con éxito",
      startup: newStartup
    });
  } catch (err) {
    console.error('Error escribiendo en el archivo:', err);
    res.status(500).json({
      error: 'Error persistiendo los datos',
      message: 'La startup se creó en memoria pero no se pudo guardar en el archivo.'
    });
  }
});

router.get('/', (req, res) => {
  let results = [...startupsData];
  
  if (req.query.industry) {
    results = results.filter(s => s.industry === req.query.industry);
  }
  
  if (req.query.min_shame) {
    const minShame = parseInt(req.query.min_shame);
    results = results.filter(s => s.shame_level >= minShame);
  }
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedResults = results.slice(startIndex, endIndex);
  
  const response = {
    info: {
      count: results.length,
      pages: Math.ceil(results.length / limit),
      next: endIndex < results.length ? `/api/startups?page=${page + 1}` : null,
      prev: page > 1 ? `/api/startups?page=${page - 1}` : null
    },
    results: paginatedResults
  };
  
  res.json(response);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const startup = startupsData.find(s => s.id === id);
  
  if (!startup) {
    return res.status(404).json({ error: 'Startup no encontrada' });
  }
  
  res.json(startup);
});

module.exports = router;
