import { createClient } from 'redis';
import { env } from '$env/dynamic/private';

const skipRedis = process.env.SKIP_REDIS_CONNECTION === 'true';
let client = null;

if (!skipRedis) {
  client = createClient({
    url: env.REDIS_URL,
    socket: {
      connectTimeout: 50_000, // 50 seconds
      keepAlive: 60_000,             // TCP keep-alive probe every 60 s
      reconnectStrategy: retries => {
        // Exponential back-off capped at 2 s
        return Math.min(retries * 50, 2000);
      }
    }
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

// Use an empty object as the target if client is null
const targetClient = client || {};

// Create a Proxy that wraps the client and intercepts method calls
const safeRedisClient = new Proxy(targetClient, {
  get(target, prop, receiver) {
    // If the real client isn't available or isn't open, return a dummy async function.
    if (!client || !client.isOpen) {
      return async (...args) => {
        console.warn(`Redis client is not connected; skipping method "${String(prop)}"`);
        return null;
      };
    }
    // Otherwise, retrieve the method from the client.
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
