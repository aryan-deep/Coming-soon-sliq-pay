import Banner from "@/components/banner";
import WaitlistSection from "@/components/waitlistSection";
import Hero from "@/components/hero";
import ProductCarousel from '@/components/productCarousal';
import FeaturesCarousel from '@/components/featureCarousal';

export default function Home() {
  return (
    <>
      <Hero
        frontImg="/image/heroFrontImage.png"
        bgImg="/image/backgroundLayer.png"
        bgImgHover="/image/heroHoverBackgroundlayer.png"
      >
        <div className="absolute top-[120px] left-0 w-full px-4 flex flex-col items-start text-left md:items-center md:text-center z-20">
          {/* DESKTOP: single-line (visible md+) */}
          <h1
            className="hidden md:flex leading-[1.20] text-[40px] md:text-[88px] text-[#0C1523] mb-2 md:mb-4 font-bold items-center justify-center"
            style={{ fontFamily: "Malinton" }}
          >
            <span>Money,</span>
            <span className="flex items-center gap-2 md:ml-3">
              set free
              <img
                src="/svg/Stars.png"
                alt="stars"
                className="w-[32px] h-[34px] md:w-[90px] md:h-[90px]"
              />
            </span>
          </h1>
          {/* MOBILE: two-line (visible <md) */}
          <div
            className="flex md:hidden flex-col leading-[1.20] text-[40px] text-[#0C1523] mb-2 font-bold items-start"
            style={{ fontFamily: "Malinton" }}
          >
            <span>Money,</span>
            <span className="flex items-center gap-2 mt-1">
              set free
              <img
                src="/svg/Stars.png"
                alt="stars"
                className="w-[32px] h-[34px]"
              />
            </span>
          </div>
          <p
            className="relative text-left md:left-[350px] md:top-[-35px] text-base text-[16px] h-[48px] text-[#3D444F] w-[270px] md:w-[206px]"
            style={{ fontFamily: 'Nunito' }}
          >
            Pay anyone in the world instantly, with a click.
          </p>
        </div>
      </Hero>
      <FeaturesCarousel />
      <Banner />
      <ProductCarousel />
      <WaitlistSection />
    </>
  );
}
