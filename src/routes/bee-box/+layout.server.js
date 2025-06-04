
export async function load ({ locals, params, url, fetch }) {

  if (locals.user) {
    // Fetch user data and notifications in parallel to reduce load time
    const [userResponse] = await Promise.all([
      fetch(`/bee-box/api/users/${locals.user.id}`),
    ]);

    // Extract user data
    const user = await userResponse.json();

    return {
      user,
    }
  }
}