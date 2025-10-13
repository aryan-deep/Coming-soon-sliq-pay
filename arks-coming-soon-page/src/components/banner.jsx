const Banner = () => (
  <div
    className="relative w-full h-screen min-h-screen flex items-center justify-center overflow-hidden"
    style={{
      backgroundImage: "url('/image/banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    {/* 🔹 Top White Cloud Gradient (Dense & Doesn’t Push Content) */}
    <div
      className="absolute inset-x-0 top-0 pointer-events-none z-[5]"
      style={{
        height: "50vh", // visual coverage only (absolute element)
        background: `
          radial-gradient(circle at 50% 0%, 
            rgba(255,255,255,1) 0%, 
            rgba(255,255,255,0.95) 25%, 
            rgba(255,255,255,0.85) 45%, 
            rgba(255,255,255,0.5) 95%, 
            rgba(255,255,255,1) 0%)
        `,
        filter: "blur(90px)",
        opacity: 1,
        transform: "translateY(-10%)",
      }}
    />

    {/* 🔹 Bottom White Cloud Gradient (Soft Fade) */}
    <div
      className="absolute inset-x-0 bottom-0 pointer-events-none z-[2]"
      style={{
        height: "10vh",
        background: `
          radial-gradient(circle at 50% 100%, 
            rgba(255,255,255,0.95) 0%, 
            rgba(255,255,255,0.9) 35%, 
            rgba(255,255,255,0.5) 65%, 
            rgba(255,255,255,0) 85%)
        `,
        filter: "blur(60px)",
        opacity: 0.9,
        transform: "translateY(10%)",
      }}
    />

    {/* 🔹 Banner Content */}
    <div
      className="
        relative top-0 left-0 w-full z-10
        flex flex-col items-center
        pt-28 md:pt-40 px-[24px] md:px-[150px]
      "
      style={{
        top: "-300px",
        minHeight: "90vh",
        justifyContent: "center",
      }}
    >
      <h2
        className="tracking-normal leading-[1.19] text-[32px] md:text-[56px] text-start text-black mb-4 md:text-center min-w-[330px] max-w-[700px]"
        style={{
          fontWeight: 700,
          fontFamily: "Malinton",
        }}
      >
        Global payments can't be any faster or easier
      </h2>

      <p
        className="text-[16px] md:text-[18px] leading-[1.50] text-black text-start mb-6 text-center"
        style={{
          fontWeight: 500,
          fontFamily: "Nunito",
        }}
      >
        One click and your payment reaches instantly. It can't be faster than
        instant or easier than one click.
      </p>
    </div>
  </div>
);

export default Banner;
