export default function BlogTopBanner() {
  return (
    <div style={{
      marginTop: '100px',
      position: 'relative',
      textAlign: 'center',
      color: '#fff',
      marginBottom: '40px'
    }}>
      <img
        src="/image/blogTopBanner.png" // Use forward slashes for paths
        alt="Banner"
        style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          padding: '0 20px',
          boxSizing: 'border-box'
        }}
      >
        <div
          className="text-[40px] md:text-[56px] text-[#0C1523] font-bold mb-2.5 text-left md:text-center"
          style={{ fontFamily: "Malinton" }}
        >
          Insights That Move With You
        </div>
        <p
          className="text-[16px] pt-[12px] md:text-[18px] md:pt-[16px] text-[#3D444f] mb-2.5 text-left md:text-center"
          style={{ fontFamily: "Nunito" }}
        >
          Discover stories, tips, and ideas shaping the future of effortless travel payments with Sliq pay
        </p>
      </div>

    </div>
  );
}
