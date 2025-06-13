import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const planId = params.slug;

  try {
    const response = await fetch(`/bee-box/api/plans/${planId}`);
    const plan = await response.json();
    
    return { plan };
  } catch (err) {
    console.error('Error fetching community data:', err);
    throw error(500, 'An error occurred while fetching community data');
  }
}
