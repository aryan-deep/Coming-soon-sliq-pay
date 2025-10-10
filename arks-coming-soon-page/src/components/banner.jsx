const Banner = () => (
  <div
    className="relative w-full h-screen min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: "url('/image/banner.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}
  >
    <div
      className="
        absolute top-0 left-0 w-full z-10
        flex flex-col items-center
        pt-28 md:pt-40 px-[24px] md:px-[150px]
      "
      style={{
        top: "-236px",
        minHeight: "90vh",
        justifyContent: "center"
      }}
    >
      <h2
        className="tracking-normal leading-[1.19] text-[32px] md:text-[56px] text-start text-black mb-4 md:text-center min-w-[330px] max-w-[700px]"
        style={{
          fontWeight: 700,
          fontFamily: 'Malinton'
        }}
      >
        Global payments can't be any faster or easier
      </h2>
      <p
        className="text-[16px] md:text-[18px] leading-[1.50] text-black text-start mb-6 text-center"
        style={{
          fontWeight: 500,
          fontFamily: 'Nunito'
        }}
      >
        One click and your payment reaches instantly. It can't be faster than instant or easier than one click.
      </p>
    </div>
  </div>
);

export default Banner;
