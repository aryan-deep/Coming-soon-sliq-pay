import { getPostBySlug, getAllPosts } from '../../../lib/wordpress';
import { notFound } from 'next/navigation';
import Link from 'next/link';

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title.rendered} | Sliq Pay`,
    description: post.excerpt.rendered.replace(/<[^>]*>/g, '').substring(0, 160),
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Back Button */}
        <Link
          href="/blog"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            color: '#0070f3',
            textDecoration: 'none',
            marginBottom: '30px',
            fontSize: '16px'
          }}
        >
          ← Back to Blog
        </Link>

        {/* Title */}
        <h1
          style={{ fontSize: '42px', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.2' }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Meta */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          color: '#666',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid #e0e0e0'
        }}>
          <time>
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>
          {post._embedded?.author?.[0] && (
            <>
              <span>•</span>
              <span>By {post._embedded.author[0].name}</span>
            </>
          )}
        </div>

        {/* Featured Image */}
        {post._embedded?.['wp:featuredmedia']?.[0] && (
          <img
            src={post._embedded['wp:featuredmedia'][0].source_url}
            alt={post.title.rendered}
            style={{ 
              width: '100%', 
              height: 'auto', 
              borderRadius: '12px',
              marginBottom: '30px'
            }}
          />
        )}

        {/* Content */}
        <div
          style={{ 
            fontSize: '18px', 
            lineHeight: '1.8',
            color: '#333'
          }}
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>
    </div>
  );
}
