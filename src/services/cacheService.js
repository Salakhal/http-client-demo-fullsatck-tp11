class CacheService {
  constructor(ttl = 60000) {
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    
    if (item && item.expiry > Date.now()) {
      console.log(`✅ Cache hit: ${key}`);
      return item.value;
    }
    
    if (item) {
      console.log(`⏰ Cache expired: ${key}`);
      this.cache.delete(key);
    } else {
      console.log(`❌ Cache miss: ${key}`);
    }
    
    return null;
  }

  set(key, value, customTtl) {
    const expiry = Date.now() + (customTtl || this.ttl);
    this.cache.set(key, { value, expiry });
    console.log(`💾 Cache set: ${key}, expires in ${(customTtl || this.ttl) / 1000}s`);
  }

  has(key) {
    const item = this.cache.get(key);
    return item && item.expiry > Date.now();
  }

  delete(key) {
    this.cache.delete(key);
    console.log(`🗑️ Cache delete: ${key}`);
  }

  clear() {
    this.cache.clear();
    console.log('🧹 Cache cleared');
  }

  cleanup() {
    const now = Date.now();
    let cleaned = 0;
    for (const [key, item] of this.cache.entries()) {
      if (item.expiry <= now) {
        this.cache.delete(key);
        cleaned++;
      }
    }
    if (cleaned > 0) {
      console.log(`🧹 Cache cleanup: removed ${cleaned} expired items`);
    }
  }

  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}

const cacheService = new CacheService();

setInterval(() => {
  cacheService.cleanup();
}, 300000);

export default cacheService;