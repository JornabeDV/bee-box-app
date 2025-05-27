export async function load({ url, data = {}, params }) {
  const { pathname } = url;
  const { user } = data;

  return {
    pathname,
    user,
    slug: params.slug
  };
}
