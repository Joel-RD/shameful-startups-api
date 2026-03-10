const dataService = require('../services/dataService');
const { asyncHandler } = require('../middleware/errorHandler');

const getStats = asyncHandler(async (req, res, next) => {
  const startupsData = dataService.getStartups();

  const totalStartups = startupsData.length;
  const totalFunding = startupsData.reduce((sum, s) => sum + s.funding, 0);
  const avgShame = (startupsData.reduce((sum, s) => sum + s.shame_level, 0) / totalStartups).toFixed(1);

  const industryCount = {};
  startupsData.forEach(s => {
    industryCount[s.industry] = (industryCount[s.industry] || 0) + 1;
  });

  const industryShame = {};
  startupsData.forEach(s => {
    if (!industryShame[s.industry]) {
      industryShame[s.industry] = { total: 0, count: 0 };
    }
    industryShame[s.industry].total += s.shame_level;
    industryShame[s.industry].count += 1;
  });

  let maxShameIndustry = 'crypto';
  let maxAvgShame = 0;
  Object.keys(industryShame).forEach(ind => {
    const avg = industryShame[ind].total / industryShame[ind].count;
    if (avg > maxAvgShame) {
      maxAvgShame = avg;
      maxShameIndustry = ind;
    }
  });

  const frasesComunes = ['disrumpir', 'blockchain', 'AI', 'metaverso', 'DAO', 'IA', 'cloud', 'scalable'];
  const textAll = startupsData.map(s => (s.name + ' ' + s.description).toLowerCase()).join(' ');
  let fraseMasComun = 'disrumpir';
  let maxCount = 0;
  frasesComunes.forEach(frase => {
    const count = (textAll.match(new RegExp(frase, 'g')) || []).length;
    if (count > maxCount) {
      maxCount = count;
      fraseMasComun = frase;
    }
  });

  const stillTrying = startupsData.filter(s => s.founded >= 2024).length;
  const failedStartups = totalStartups - stillTrying;

  const years = startupsData.map(s => 2025 - s.founded);
  const avgYears = (years.reduce((a, b) => a + b, 0) / totalStartups).toFixed(1);

  res.json({
    message: "Estadísticas vergonzosas de nuestra API",
    total_startups: totalStartups,
    total_funding: `$${totalFunding.toLocaleString()} (falso)`,
    avg_shame_level: parseFloat(avgShame),
    failed_startups: failedStartups,
    still_trying: stillTrying,
    industria_mas_vergonzosa: maxShameIndustry,
    frase_mas_comun: fraseMasComun,
    años_promedio_de_vida: `${avgYears} meses`,
    top_industries: Object.entries(industryCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([ind, count]) => ({ industry: ind, count }))
  });
});

const getTimeline = asyncHandler(async (req, res, next) => {
  const startupsData = dataService.getStartups();

  const timeline = [];

  for (let year = 2010; year <= 2025; year++) {
    const startupsYear = startupsData.filter(s => s.founded === year);

    if (startupsYear.length > 0) {
      timeline.push({
        year,
        failures_count: startupsYear.length,
        epic_fail: startupsYear.sort((a, b) => b.shame_level - a.shame_level)[0].name,
        shame_avg: (startupsYear.reduce((sum, s) => sum + s.shame_level, 0) / startupsYear.length).toFixed(1),
        startups: startupsYear.map(s => ({
          id: s.id,
          name: s.name,
          shame_level: s.shame_level
        }))
      });
    } else if (year >= 2020) {
      timeline.push({
        year,
        failures_count: 0,
        epic_fail: "El año del 'esperamos que mejore'",
        shame_avg: "0.0",
        startups: []
      });
    }
  }

  timeline.sort((a, b) => b.year - a.year);

  res.json({
    message: "La línea del tiempo del fracaso startupil",
    start_year: 2010,
    end_year: 2025,
    total_years_with_failures: timeline.length,
    timeline: timeline.slice(0, 16)
  });
});

const getHealth = asyncHandler(async (req, res, next) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'La API está viva y generando vergüenza'
  });
});

const getApiInfo = asyncHandler(async (req, res, next) => {
  res.json({
    message: 'Shameful Startups API funcionando',
    new_endpoints: [
      'GET /api/startups/random',
      'GET /api/startups/top/shame',
      'GET /api/startups/top/funding',
      'GET /api/startups/search',
      'GET /api/stats',
      'GET /api/timeline',
      'GET /api/founders/:id',
      'POST /api/startups',
      'GET /api/health',
      'GET /api-docs (Swagger UI)'
    ]
  });
});

module.exports = {
  getStats,
  getTimeline,
  getHealth,
  getApiInfo
};
