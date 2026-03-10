const dataService = require('../services/dataService');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

const GOOD_WORDS = ['útil', 'exitoso', 'rentable', 'sostenible', 'innovador', 'revolucionario'];
const SHAME_MIN = 5;

const validateStartup = (data) => {
  const errors = [];
  if (!data.name) errors.push('name es requerido');
  if (!data.description) errors.push('description es requerido');
  if (!data.industry) errors.push('industry es requerido');
  if (data.shame_level === undefined || data.shame_level === null) errors.push('shame_level es requerido');
  if (!data.founded) errors.push('founded es requerido');
  return errors;
};

const validateShameLevel = (name, description, shameLevel) => {
  const text = `${name || ''} ${description || ''}`.toLowerCase();
  const hasGoodWords = GOOD_WORDS.some(word => text.includes(word));
  
  if (hasGoodWords || shameLevel < SHAME_MIN) {
    return 'Esta startup es demasiado buena para esta API. Solo aceptamos ideas vergonzosas.';
  }
  return null;
};

const getAllStartups = asyncHandler(async (req, res, next) => {
  let results = dataService.getStartups();

  if (req.query.industry) {
    results = results.filter(s => s.industry === req.query.industry);
  }

  if (req.query.min_shame) {
    const minShame = parseInt(req.query.min_shame);
    if (isNaN(minShame)) {
      throw new AppError('min_shame debe ser un número válido', 400);
    }
    results = results.filter(s => s.shame_level >= minShame);
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResults = results.slice(startIndex, endIndex);

  res.json({
    info: {
      count: results.length,
      pages: Math.ceil(results.length / limit),
      next: endIndex < results.length ? `/api/startups?page=${page + 1}` : null,
      prev: page > 1 ? `/api/startups?page=${page - 1}` : null
    },
    results: paginatedResults
  });
});

const getStartupById = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    throw new AppError('ID inválido', 400);
  }

  const startups = dataService.getStartups();
  const startup = startups.find(s => s.id === id);

  if (!startup) {
    throw new AppError('Startup no encontrada', 404);
  }

  res.json(startup);
});

const getRandomStartup = asyncHandler(async (req, res, next) => {
  const startups = dataService.getStartups();
  const randomIndex = Math.floor(Math.random() * startups.length);
  const startup = startups[randomIndex];

  res.json({
    message: "Aquí tienes tu startup al azar. Que la vergüenza te acompañe.",
    startup
  });
});

const getTopShame = asyncHandler(async (req, res, next) => {
  let results = [...dataService.getStartups()];

  if (req.query.min_shame) {
    const minShame = parseInt(req.query.min_shame);
    if (isNaN(minShame)) {
      throw new AppError('min_shame debe ser un número válido', 400);
    }
    results = results.filter(s => s.shame_level >= minShame);
  }

  results.sort((a, b) => b.shame_level - a.shame_level);

  const limit = parseInt(req.query.limit) || 10;
  const topShame = results.slice(0, limit);

  res.json({
    message: "Las startups más vergonzosas. Vergüenza ajena asegurada.",
    count: topShame.length,
    results: topShame
  });
});

const getTopFunding = asyncHandler(async (req, res, next) => {
  let results = [...dataService.getStartups()];
  results.sort((a, b) => b.funding - a.funding);

  const limit = parseInt(req.query.limit) || 10;
  const topFunding = results.slice(0, limit);

  const totalFunding = results.reduce((sum, s) => sum + s.funding, 0);

  res.json({
    message: "Las startups con más funding. Spoiler: todo es falso.",
    total_funding: `$${totalFunding.toLocaleString()} (falso)`,
    count: topFunding.length,
    results: topFunding
  });
});

const searchStartups = asyncHandler(async (req, res, next) => {
  const { q } = req.query;

  if (!q) {
    throw new AppError('Parámetro de búsqueda requerido. Ejemplo: /api/startups/search?q=blockchain', 400);
  }

  const startups = dataService.getStartups();
  const queryLower = q.toLowerCase();

  const results = startups.filter(s => {
    return (
      (s.name && s.name.toLowerCase().includes(queryLower)) ||
      (s.description && s.description.toLowerCase().includes(queryLower)) ||
      (s.idea_real && s.idea_real.toLowerCase().includes(queryLower))
    );
  }).map(s => ({
    ...s,
    highlight: {
      name: s.name ? s.name.replace(new RegExp(`(${q})`, 'gi'), '**$1**') : null,
      description: s.description ? s.description.replace(new RegExp(`(${q})`, 'gi'), '**$1**') : null
    }
  }));

  res.json({
    message: `Resultados para "${q}"`,
    query: q,
    count: results.length,
    results
  });
});

const createStartup = asyncHandler(async (req, res, next) => {
  const { name, description, industry, funding, shame_level, founded, idea_real } = req.body;

  const errors = validateStartup(req.body);
  if (errors.length > 0) {
    throw new AppError(`Campos requeridos faltantes: ${errors.join(', ')}`, 400);
  }

  const shameError = validateShameLevel(name, description, shame_level);
  if (shameError) {
    throw new AppError(shameError, 422);
  }

  const startups = dataService.getStartups();
  const newId = Math.max(...startups.map(s => s.id), 0) + 1;

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

  startups.push(newStartup);
  dataService.saveStartups(startups);

  res.status(201).json({
    message: "Nueva startup vergonzosa creada y guardada con éxito",
    startup: newStartup
  });
});

module.exports = {
  getAllStartups,
  getStartupById,
  getRandomStartup,
  getTopShame,
  getTopFunding,
  searchStartups,
  createStartup
};
