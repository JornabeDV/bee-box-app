import dotenv from "dotenv";
import { createClient } from 'redis';
dotenv.config();

const shouldSkipConnection = process.env.SKIP_REDIS_CONNECTION === 'true';

let client = null;
let isConnected = false;

if (!shouldSkipConnection) {
  client = createClient({
    url: process.env.REDIS_URL,
    socket: {
      connectTimeout: 50000, // Increase the connection timeout to 50 seconds
    }
  });

  client.on('error', (err) => {
    console.log(`Redis Client Error for env ${process.env.ENV}, Redis URL is: ${process.env.REDIS_URL}`, err);
  });

  (async () => {
    try {
      await client.connect();
      isConnected = true;
      console.log('Connected to Redis');
    } catch (err) {
      console.error('Failed to connect to Redis:', err);
    }
  })();
} else {
  console.log('Skipping Redis connection (build environment).');
}

export const isClientConnected = () => isConnected;

// Ensure the Proxy always has an object as its target even if the client isn’t initialized.
const targetClient = client || {};

// Create a proxy that intercepts all property accesses on the Redis client.
const safeRedisClient = new Proxy(targetClient, {
  get(target, prop, receiver) {
    // If the client is not available or not open, return a dummy async function.
    if (!client || !client.isOpen) {
      return async (...args) => {
        console.warn(`Redis client is not connected; skipping method "${String(prop)}"`);
        return null;
      };
    }
    // Otherwise, get the actual property from the client.
    const orig = client[prop];
    if (typeof orig === 'function') {
      return async (...args) => {
        try {
          return await orig.apply(client, args);
        } catch (err) {
          console.error(`Error in redis client method "${String(prop)}":`, err);
          return null;
        }
      };
    }
    return orig;
  }
});

export default safeRedisClient;
