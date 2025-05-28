import { json } from '@sveltejs/kit';
import { invalidateSession } from "$lib/server/auth.ts";

export const POST = async ({ locals, cookies }) => {
  if (!locals.session) {
    return json({ error: "Unauthorized access" }, { status: 403 });
  }

  // Invalidate the current session
  await invalidateSession(locals.session.id);

  // Remove the session cookie
  cookies.delete("auth_session", { path: "/" });
  locals.user = null;

  return json({ success: true }, { status: 200 });
}