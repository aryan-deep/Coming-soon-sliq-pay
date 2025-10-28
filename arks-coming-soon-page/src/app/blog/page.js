import { getAllPosts } from '../../lib/wordpress';
import Link from 'next/link';

export const metadata = {
  title: 'Blog | Sliq Pay',
  description: 'Latest updates and insights about US-India payments',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div style={{ padding: '50px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '10px', textAlign: 'center' }}>Blog</h1>
      <p style={{ marginBottom: '40px', color: '#666', textAlign: 'center' }}>
        Latest news and insights about cross-border payments
      </p>

      {posts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p style={{ fontSize: '18px', color: '#666' }}>
            No posts available yet. Create posts in WordPress!
          </p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '30px' 
        }}>
          {posts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              style={{ 
                border: '1px solid #e0e0e0', 
                borderRadius: '12px', 
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease'
              }}
              className="blog-card"
            >
              {/* Featured Image */}
              {post._embedded?.['wp:featuredmedia']?.[0] && (
                <img
                  src={post._embedded['wp:featuredmedia'][0].source_url}
                  alt={post.title.rendered}
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover' 
                  }}
                />
              )}

              {/* Content */}
              <div style={{ padding: '20px', flex: 1 }}>
                <h2 
                  style={{ fontSize: '20px', marginBottom: '10px', fontWeight: '600' }}
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                />
                <div 
                  style={{ 
                    color: '#666', 
                    fontSize: '14px', 
                    lineHeight: '1.6',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} 
                />
                <p style={{ 
                  marginTop: '15px', 
                  color: '#0070f3', 
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  Read more →
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
