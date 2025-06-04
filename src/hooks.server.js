import { validateSessionToken } from '$lib/server/auth.ts';

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

  return resolve(event);
}
