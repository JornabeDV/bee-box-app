import { error } from '@sveltejs/kit';

export async function load({ url, fetch }) {
  const date = url.searchParams.get('date');
  const time = url.searchParams.get('time');

  if (!date || !time) {
    throw error(400, 'Missing date or time query parameters');
  }

  try {
    const response = await fetch(`/bee-box/api/classes/${date}-${time}`);
    if (!response.ok) {
      throw error(response.status, 'Failed to fetch class data');
    }
    const classInfo = await response.json();

    return { classInfo };
  } catch (err) {
    console.error('Error fetching class data:', err);
    throw error(500, 'An error occurred while fetching class data');
  }
}
