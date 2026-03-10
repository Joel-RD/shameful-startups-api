const request = require('supertest');
const app = require('../server');

describe('API Endpoints', () => {
  describe('GET /api', () => {
    it('should return API info', async () => {
      const res = await request(app).get('/api');
      expect(res.status).toBe(200);
      expect(res.body.message).toContain('Shameful Startups API');
    });
  });

  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('OK');
    });
  });

  describe('GET /api/startups', () => {
    it('should return startups list', async () => {
      const res = await request(app).get('/api/startups');
      expect(res.status).toBe(200);
      expect(res.body.results).toBeDefined();
    });
  });

  describe('GET /api/startups/random', () => {
    it('should return a random startup', async () => {
      const res = await request(app).get('/api/startups/random');
      expect(res.status).toBe(200);
      expect(res.body.startup).toBeDefined();
    });
  });

  describe('GET /api/startups/top/shame', () => {
    it('should return top shame startups', async () => {
      const res = await request(app).get('/api/startups/top/shame?limit=5');
      expect(res.status).toBe(200);
      expect(res.body.results).toBeDefined();
      expect(res.body.results.length).toBeLessThanOrEqual(5);
    });
  });

  describe('GET /api/startups/search', () => {
    it('should return search results', async () => {
      const res = await request(app).get('/api/startups/search?q=blockchain');
      expect(res.status).toBe(200);
      expect(res.body.results).toBeDefined();
    });

    it('should return 400 if query is missing', async () => {
      const res = await request(app).get('/api/startups/search');
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/startups/:id', () => {
    it('should return startup by id', async () => {
      const res = await request(app).get('/api/startups/1');
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(1);
    });

    it('should return 404 for non-existent id', async () => {
      const res = await request(app).get('/api/startups/99999');
      expect(res.status).toBe(404);
    });
  });

  describe('POST /api/startups', () => {
    it('should create a new startup', async () => {
      const newStartup = {
        name: 'Test Startup',
        description: 'Test description with blockchain',
        industry: 'Tech',
        shame_level: 8,
        founded: 2024
      };
      const res = await request(app)
        .post('/api/startups')
        .send(newStartup);
      expect(res.status).toBe(201);
      expect(res.body.startup.name).toBe('Test Startup');
    });

    it('should return 400 for missing fields', async () => {
      const res = await request(app)
        .post('/api/startups')
        .send({ name: 'Test' });
      expect(res.status).toBe(400);
    });

    it('should return 422 for low shame level', async () => {
      const res = await request(app)
        .post('/api/startups')
        .send({
          name: 'Good Startup',
          description: 'A very useful startup',
          industry: 'Tech',
          shame_level: 3,
          founded: 2024
        });
      expect(res.status).toBe(422);
    });
  });

  describe('GET /api/founders', () => {
    it('should return founders list', async () => {
      const res = await request(app).get('/api/founders');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/industries', () => {
    it('should return industries list', async () => {
      const res = await request(app).get('/api/industries');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/ideas', () => {
    it('should return ideas list', async () => {
      const res = await request(app).get('/api/ideas');
      expect(res.status).toBe(200);
    });
  });

  describe('GET /api/stats', () => {
    it('should return statistics', async () => {
      const res = await request(app).get('/api/stats');
      expect(res.status).toBe(200);
      expect(res.body.total_startups).toBeDefined();
    });
  });

  describe('GET /api/timeline', () => {
    it('should return timeline', async () => {
      const res = await request(app).get('/api/timeline');
      expect(res.status).toBe(200);
      expect(res.body.timeline).toBeDefined();
    });
  });
});
