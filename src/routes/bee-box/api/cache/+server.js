import { json } from '@sveltejs/kit';
import redisClient from '$lib/redis';

export async function GET({ url}) {
  try {
    // Get the 'invalidate' query parameter
    const invalidate = url.searchParams.get('invalidate');
    const invalidateSpecific = url.searchParams.get('invalidate-specific');
    //maps:train:681,552-702,399
    if (invalidateSpecific) {
      await redisClient.del(invalidateSpecific);
      return json({ message: 'OK'});
    }

    // Define the valid prefixes
    const prefixes = ['league', 'team', 'top', 'tournament', 'transfer', 'session', 'matches', 'user', 'equipment', 'ladder', 'tactic', 'player', 'community', 'game-settings', 'challenge', 'loadouts', 'talent-trees', 'underwork', 'newsList', 'maps', 'transfers', 'visibility', 'flagged-transfers', 'picture-requests', 'username-requests', 'last-bid', 'ticket', 'tickets-messages', 'tickets', 'tactic-stats'];

    // Store keys to be deleted
    let keys = [];

    if (invalidate) {
      // If the invalidate value is not a valid prefix, return an error
      if (!prefixes.includes(invalidate.trim())) {
        return json({ error: `Invalid invalidate value: ${invalidate}` }, { status: 400 });
      }

      // Purge keys for the specific invalidate prefix
      const pattern = `${invalidate.trim()}*`;
      keys = await redisClient.keys(pattern);
    } else {
      // If no invalidate parameter is provided, purge all keys with the specified prefixes
      for (const prefix of prefixes) {
        const pattern = `${prefix.trim()}*`;
        const foundKeys = await redisClient.keys(pattern);
        keys = keys.concat(foundKeys); // Add found keys to the keys array
      }
    }

    if (keys.length > 0) {
      // Delete all matched keys
      await redisClient.del(keys);
      console.log(`Deleted ${keys.length} keys.`);
    } else {
      console.log(`No keys found to delete.`);
    }

    return json({ message: 'OK'});
  } catch (error) {
    console.error(error);
    return json({ error: 'Error clearing cache' }, { status: 500 });
  }
}