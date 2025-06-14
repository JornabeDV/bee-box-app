import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const userId = params.slug;
  try {
    const response = await fetch(`/bee-box/api/schedule`);
    const schedule = await response.json();

    return { schedule };
  } catch (err) {
    console.error('Error fetching community data:', err);
    throw error(500, 'An error occurred while fetching community data');
  }
}