const dataService = require('../services/dataService');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

const getAllFounders = asyncHandler(async (req, res, next) => {
  const founders = dataService.getFounders();
  res.json(founders);
});

const getFounderById = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    throw new AppError('ID inválido', 400);
  }

  const founders = dataService.getFounders();
  const founder = founders.find(f => f.id === id);

  if (!founder) {
    throw new AppError('Fundador no encontrado', 404);
  }

  const startups = dataService.getStartups();
  const startup = startups.find(s => s.founders && s.founders.includes(id));

  res.json({
    ...founder,
    startup: startup || null,
    shame_contribution: startup ? startup.shame_level : 0
  });
});

module.exports = {
  getAllFounders,
  getFounderById
};
