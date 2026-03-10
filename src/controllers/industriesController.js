const dataService = require('../services/dataService');
const { asyncHandler } = require('../middleware/errorHandler');

const getAllIndustries = asyncHandler(async (req, res, next) => {
  const industries = dataService.getIndustries();
  res.json(industries);
});

module.exports = {
  getAllIndustries
};
