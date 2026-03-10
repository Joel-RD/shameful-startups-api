const fs = require('fs');
const path = require('path');
const config = require('../config');

class DataService {
  constructor() {
    this.cache = new Map();
    this.cacheExpiry = new Map();
    this.dataPath = path.join(__dirname, '../../data');
  }

  getCacheKey(collection) {
    return `data_${collection}`;
  }

  isCacheValid(key) {
    const expiry = this.cacheExpiry.get(key);
    return expiry && Date.now() < expiry;
  }

  getFromCache(key) {
    if (this.isCacheValid(key)) {
      return this.cache.get(key);
    }
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + config.dataCache.ttl);
  }

  invalidateCache(key) {
    this.cache.delete(key);
    this.cacheExpiry.delete(key);
  }

  loadJSONFile(filename) {
    const key = this.getCacheKey(filename);
    const cached = this.getFromCache(key);
    
    if (cached) {
      return cached;
    }

    const filePath = path.join(this.dataPath, `${filename}.json`);
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filename}`);
    }

    const data = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(data);
    
    this.setCache(key, parsed);
    return parsed;
  }

  saveJSONFile(filename, data) {
    const filePath = path.join(this.dataPath, `${filename}.json`);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    this.invalidateCache(this.getCacheKey(filename));
  }

  getStartups(forceRefresh = false) {
    if (forceRefresh) {
      this.invalidateCache(this.getCacheKey('startups'));
    }
    return this.loadJSONFile('startups');
  }

  getFounders(forceRefresh = false) {
    if (forceRefresh) {
      this.invalidateCache(this.getCacheKey('founders'));
    }
    return this.loadJSONFile('founders');
  }

  getIndustries(forceRefresh = false) {
    if (forceRefresh) {
      this.invalidateCache(this.getCacheKey('industries'));
    }
    return this.loadJSONFile('industries');
  }

  getIdeas(forceRefresh = false) {
    if (forceRefresh) {
      this.invalidateCache(this.getCacheKey('ideas'));
    }
    return this.loadJSONFile('ideas');
  }

  saveStartups(data) {
    this.saveJSONFile('startups', data);
  }
}

module.exports = new DataService();
