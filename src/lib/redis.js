import { createClient } from 'redis';
import { env } from '$env/dynamic/private';

const skipRedis = env.SKIP_REDIS_CONNECTION === 'true';
let client = null;

if (!skipRedis) {
  client = createClient({
    url: env.REDIS_URL,
    socket: {
      connectTimeout: 50_000,
      keepAlive: 60_000,
      reconnectStrategy: retries => Math.min(retries * 50, 2000),
    },
  });

  client.on('error', (err) => {
    console.error(`Redis Client Error: ${err.code}`, err);
  });

  (async () => {
    try {
      await client.connect();
      console.log('Connected to Redis');
    } catch (err) {
      console.error('Failed to connect to Redis:', err);
    }
  })();
} else {
  console.log('Skipping Redis connection due to SKIP_REDIS_CONNECTION flag');
}

const targetClient = client || {};

const safeRedisClient = new Proxy(targetClient, {
  get(target, prop, receiver) {
    if (!client || !client.isOpen) {
      return async (...args) => {
        console.warn(`Redis client is not connected; skipping method "${String(prop)}"`);
        return null;
      };
    }
    const origMethod = client[prop];
    if (typeof origMethod === 'function') {
      return async (...args) => {
        try {
          return await origMethod.apply(client, args);
        } catch (err) {
          console.error(`Error in redis client method "${String(prop)}":`, err);
          return null;
        }
      };
    }
    return origMethod;
  }
});

export default safeRedisClient;