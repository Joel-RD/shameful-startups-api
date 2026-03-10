const helmet = require('helmet');
const cors = require('cors');
const config = require('../config');

const securityMiddleware = [
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:"],
      },
    },
    crossOriginEmbedderPolicy: false,
  }),
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
];

const skipRateLimitPaths = ['/api-docs', '/health', '/api/health'];

const createRateLimitMiddleware = () => {
  const rateLimit = require('express-rate-limit');
  
  return rateLimit({
    windowMs: config.rateLimit.windowMs,
    max: config.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      error: 'Too Many Requests',
      message: 'Has excedido el límite de solicitudes. Por favor, espera un momento.',
      retryAfter: Math.ceil(config.rateLimit.windowMs / 50)
    },
    skip: (req) => {
      return skipRateLimitPaths.includes(req.path);
    }
  });
};

module.exports = {
  securityMiddleware,
  createRateLimitMiddleware,
  skipRateLimitPaths
};
