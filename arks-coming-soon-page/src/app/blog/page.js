import { getAllPosts } from '../../lib/wordpress';
import Link from 'next/link';
import ImageBannerWithOverlay from '@/components/imageBannerOverlay';
import TopBanner from '@/components/blogTopBanner';

export const metadata = {
  title: 'Blog | Sliq Pay',
  description: 'Latest updates and insights about US-India payments',
};

// Helper: extract first image src from HTML string
function getFirstImgSrc(html) {
  if (!html) return null;
  const match = html.match(/<img [^>]*src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <TopBanner />
      <div style={{ padding: '10px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        {/* <h1 style={{ fontSize: '48px', marginBottom: '10px', textAlign: 'center' }}>Blog</h1> */}
        {/* <p style={{ marginBottom: '40px', color: '#666', textAlign: 'center' }}>
          Latest news and insights about cross-border payments
        </p> */}

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
            {posts.map((post) => {
              const featured = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              const contentImg = getFirstImgSrc(post.content?.rendered);
              return (
                <Link
                  href={`/blog/${post.slug}`}
                  key={post.id}
                  style={{
                    
                    borderRadius: '1px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease'
                  }}
                  className="blog-card"
                >
                  {/* Thumbnail: Featured or first content image or fallback */}
                  {featured ? (
                    <img
                      src={featured}
                      alt={post.title.rendered}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                  ) : contentImg ? (
                    <img
                      src={contentImg}
                      alt={post.title.rendered}
                      style={{
                        width: '100%',
                        height: '200px',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '200px',
                      background: '#f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{ color: '#aaa', fontSize: '16px' }}>No Image Available</span>
                    </div>
                  )}

                  {/* Content */}
                  <div style={{ paddingTop: '30px', flex: 1 }}>
                    <h2
                      style={{ fontSize: '24px', marginBottom: '10px', fontWeight: '700',color:'#181A2A'  , fontFamily: "Malinton"}}
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        <ImageBannerWithOverlay
          backgroundImage="\image\blogpagesubfooterImage.png"
          mainText="Scan Now To Set Your Money Free"
          bottomIcon="image\socialLinks.png"
          iconWidth={1440} // wide badge
          iconHeight={800}
          mobileIconWidth={335}
          mobileIconHeight={135}
        />

      </div>
    </>
  );
}
