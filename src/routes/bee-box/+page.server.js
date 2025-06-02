import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  try {
    const [plansRes, newsRes] = await Promise.all([
      fetch('/bee-box/api/plans'),
      fetch('/bee-box/api/news')
    ]);

    if (!plansRes.ok || !newsRes.ok) {
      throw new Error('Failed to fetch one or more endpoints');
    }

    const [plans, news] = await Promise.all([
      plansRes.json(),
      newsRes.json()
    ]);

    return { plans, news };
  } catch (err) {
    console.error('Error fetching community data:', err);
    throw error(500, 'An error occurred while fetching community data');
  }
}