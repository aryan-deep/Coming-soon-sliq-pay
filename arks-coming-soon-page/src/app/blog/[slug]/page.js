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
  const resolvedParams = await params; // Await params!
  const post = await getPostBySlug(resolvedParams.slug);
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
  const resolvedParams = await params; // Await params!
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    notFound();
  }

  const titleText = post.title.rendered.replace(/<[^>]*>/g, '');

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: 'Nunito, sans-serif',
        background: '#fff',
      }}
    >
      <article
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px 20px',
          marginLeft: '112px',        // Left aligned for desktop
          marginRight: '0px',         // No right margin for desktop
        }}
        className="article-responsive"
      >
        {/* Breadcrumb */}
        <div style={{ marginBottom: 18, marginTop: 64 }}>
          <Link
            href="/blog"
            style={{
              display: 'inline-block',
              padding: '4px 16px',
              fontWeight: 700,
              fontSize: '18px',
              color: '#222',
              textDecoration: 'none',
              letterSpacing: '0.03em'
            }}
          >
            Blogs &gt;
          </Link>
          <span style={{
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 700,
            color: '#222',
            fontSize: '18px',
            verticalAlign: 'middle'
          }}>
            {resolvedParams.slug}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            marginTop: "32px",
            fontSize: '40px',
            fontWeight: 700,
            marginBottom: '18px',
            lineHeight: '50px',
            color: '#141426',
            fontFamily: 'Malinton'
          }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* <h4
          style={{
            marginTop:"32px",
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '18px',
            lineHeight: '50px',
            color: '#141426',
            fontFamily: 'Malinton'
          }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        /> */}

        {/* Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            color: '#8C8C99',
            marginBottom: '30px',
            paddingBottom: '18px',
            borderBottom: '1px solid #e7e7ef',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '16px',
            fontWeight: 500,
            lineHeight: '24px'
          }}
        >
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
            alt={titleText}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              marginBottom: '30px'
            }}
          />
        )}

        {/* Content (custom styling for headings/body) */}
        <div
          className="wp-post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <>
          <div className='text-[18px] mt-[40px] md:mt-[100px] md:text-[24px] mb-[24px] font-medium text-[#000]' style={{ fontFamily: 'Malinton' }}>Like what you’re reading? Share this with your friends :

            <div className='mt-[16px]'>
              <img src="/image/socialblog.png" alt="Description" />
            </div>

          </div>
        </>

      </article>
      {/* Responsive and content block styles */}
      <style>{`
       @media (max-width: 1440px) {
          .article-responsive {
            width: 800px
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        @media (max-width: 767px) {
          .article-responsive {
            margin-left: 0 !important;
            margin-right: 0 !important;
          }
        }
        @media (max-width: 540px) {
        margin-left: 20px !important;
        margin-right: 20px !important;
        padding: 0 !important;
         
        }
        /* Custom WP Content Styling Starts */
        .wp-post-content {
          font-family: 'Nunito',sans-serif;
        }
        // .wp-post-content h2, .wp-post-content h3 {
        //   font-family: 'Nunito',sans-serif;
        //   font-size: 24px;
        //   font-weight: 700;
        //   color: #090F19;
        //   margin: 42px 0 18px 0;
        // }
        .wp-post-content p {
          font-family: 'Nunito',sans-serif;
          font-size: 24px;
          font-weight: 400;
          color: #3D444F;
          margin: 18px 0;
        }
        .wp-post-content h4 {
        font-family: 'Malinton';
        font-size: 32px;
        padding-top: 40px;
        color: #090F19;
        }  

        .wp-post-content h6 {
        font-family: 'Nunito';
        font-size: 24px;
         font-weight: 700;
        padding-top: 40px;
        color: #090F19;
        } 

        @media (max-width: 540px) {
          .wp-post-content h2, .wp-post-content h3,
          .wp-post-content h4, .wp-post-content h5, .wp-post-content h6,
          .wp-post-content p, .wp-post-content ul, .wp-post-content ol {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
}
