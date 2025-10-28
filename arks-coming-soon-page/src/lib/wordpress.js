const WORDPRESS_SITE = process.env.NEXT_PUBLIC_WORDPRESS_SITE || 'sliqpay.wordpress.com';
const WORDPRESS_API = `https://public-api.wordpress.com/wp/v2/sites/${WORDPRESS_SITE}`;

export async function getAllPosts() {
  try {
    const response = await fetch(
      `${WORDPRESS_API}/posts?_embed&per_page=100&orderby=date&order=desc`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug) {
  try {
    const response = await fetch(`${WORDPRESS_API}/posts?slug=${slug}&_embed`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status}`);
    }

    const posts = await response.json();
    return posts[0] || null;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
