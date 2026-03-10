const express = require('express');
const path = require('path');

const config = require('./src/config');
const { securityMiddleware, createRateLimitMiddleware } = require('./src/middleware/security');
const { errorHandler, notFoundHandler } = require('./src/middleware/errorHandler');
const statsController = require('./src/controllers/statsController');

const startupsRouter = require('./src/routes/startups');
const industriesRouter = require('./src/routes/industries');
const foundersRouter = require('./src/routes/founders');
const ideasRouter = require('./src/routes/ideas');

const app = express();

app.use(securityMiddleware);
app.use('/api', createRateLimitMiddleware());

app.use(express.json());
app.use(express.static('public'));

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/startups', startupsRouter);
app.use('/api/industries', industriesRouter);
app.use('/api/founders', foundersRouter);
app.use('/api/ideas', ideasRouter);

app.get('/api/stats', statsController.getStats);
app.get('/api/timeline', statsController.getTimeline);
app.get('/api/health', statsController.getHealth);
app.get('/api', statsController.getApiInfo);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Rate limiting: ${config.rateLimit.max} requests/${config.rateLimit.windowMs / 1000}s por IP`);
  console.log(`Entorno: ${config.nodeEnv}`);
});

module.exports = app;
