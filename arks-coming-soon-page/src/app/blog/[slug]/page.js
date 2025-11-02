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
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) {
    notFound();
  }

  function getReadingTime(contentHtml) {
    const text = contentHtml.replace(/<[^>]*>/g, ' ').replace(/&[a-z;]+;/gi, ' ');
    const wordCount = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    return `${minutes} min read`;
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
          marginLeft: '112px', // Left aligned for desktop
          marginRight: '0px', // No right margin for desktop
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

        {/* Responsive Meta Section */}
        <div
          className="
            flex flex-col md:flex-row md:items-center
            text-[#3D444F]
            mb-[30px] pb-[18px]
            font-nunito font-medium text-[18px] md:text-[24px]
            md:gap-[15px]
            text-left
            w-full
          "
        >
          {/* First line: Author Name */}
          <div className="md:mr-auto">
            {post._embedded?.author?.[0] && (
              <>
                {/* By {post._embedded.author[0].name} */}
              </>
            )}
          </div>
          {/* Second line: Date and Reading Time (stacked on mobile, inline on desktop) */}
          <div className="flex w-full items-center mt-2 md:mt-0 md:gap-[15px]">
             <div className="flex-1 text-left">
      <span>• </span>
      <span>
        {new Date(post.date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })}
      </span>
    </div>
    {/* Right - Reading Time */}
    <div className="flex-1 text-right">
      <span>• </span>
      <span>{getReadingTime(post.content.rendered)}</span>
    </div>
  </div>
        </div>

        {/* Featured Image */}
        {/* {post._embedded?.['wp:featuredmedia']?.[0] && (
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
        )} */}

        {/* Content */}
        <div
          className="wp-post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        <>
          <div className='text-[18px] mt-[40px] md:mt-[100px] md:text-[24px] mb-[24px] font-medium text-[#000]' style={{ fontFamily: 'Malinton' }}>
            Like what you’re reading? Share this with your friends :
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
            font-family: 'Nunito';
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
          .article-responsive {
            margin-left: 20px !important;
            margin-right: 20px !important;
            padding: 0 !important;
          }
        }
        /* Custom WP Content Styling Starts */
        .wp-post-content {
          font-family: 'Nunito',sans-serif;
        }
        .wp-post-content p {
          font-family: 'Nunito',sans-serif;
          font-size: 24px;
          font-weight: 400;
          color: #3D444F;
          margin: 18px 0;
        }
        .wp-post-content h4 , .wp-post-content h2 {
          font-size: 32px;
          padding-top: 40px;
          color: #090F19;
          font-weight: 600;
        }  
        .wp-post-content h6, .wp-post-content h3 {
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
          .wp-post-content h4 , .wp-post-content h2 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}
