import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  try {
    const response = await fetch('/bee-box/api/plans');
    const plans = await response.json();
    
    return { plans };
  } catch (err) {
    console.error('Error fetching community data:', err);
    throw error(500, 'An error occurred while fetching community data');
  }
}
