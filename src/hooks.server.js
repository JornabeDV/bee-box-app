import { validateSessionToken } from '$lib/server/auth.ts';
import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
  const sessionToken = event.cookies.get("auth_session");

  if (sessionToken) {
    const { session, user } = await validateSessionToken(sessionToken);
    if (session && user) {
      event.locals.user = user;
      event.locals.session = session;
    } else {
      event.cookies.delete("auth_session", { path: '/' });
      event.locals.user = null;
      event.locals.session = null;
    }
  } else {
    event.locals.user = null;
    event.locals.session = null;
  }

  if (event.url.pathname.startsWith('/admin')) {
    if (!event.locals.user || event.locals.user.role !== 'admin') {
      throw redirect(303, '/login');
    }
  }

  return resolve(event);
}