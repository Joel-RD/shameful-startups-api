const dataService = require('../services/dataService');
const { AppError, asyncHandler } = require('../middleware/errorHandler');

const getAllIdeas = asyncHandler(async (req, res, next) => {
  const ideas = dataService.getIdeas();
  res.json(ideas);
});

const getIdeaById = asyncHandler(async (req, res, next) => {
  const id = parseInt(req.params.id);
  
  if (isNaN(id)) {
    throw new AppError('ID inválido', 400);
  }

  const ideas = dataService.getIdeas();
  const idea = ideas.find(i => i.id === id);

  if (!idea) {
    throw new AppError('Idea no encontrada', 404);
  }

  res.json(idea);
});

module.exports = {
  getAllIdeas,
  getIdeaById
};
