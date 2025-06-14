import { error } from '@sveltejs/kit';

export async function load({ url, locals, fetch, params }) {
  const user = locals.user;
  const scheduleId = params.slug;

  const response = await fetch(`/bee-box/api/schedule/${scheduleId}`);
  const classInfo = await response.json();

  if (!response.ok) {
    throw error(response.status, `Failed to fetch class data: ${await res.text()}`);
  }

  return {
    classInfo
  };
}