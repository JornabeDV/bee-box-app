import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
  const userId = params.slug;
  try {
    const response = await fetch(`/bee-box/api/users/${userId}`);
    const user = await response.json();
    
    return { user };
  } catch (err) {
    console.error('Error fetching community data:', err);
    throw error(500, 'An error occurred while fetching community data');
  }
}
