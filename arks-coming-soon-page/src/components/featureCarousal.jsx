"use client";
import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Feature from "./features";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Products from "./products";

gsap.registerPlugin(ScrollTrigger);

const FEATURE = [
  {
    title: "Pay Anywhere, Instantly & Easily",
    description:
      "Pay merchants, split bills with friends, or send money to family. Simply scan QR code, enter a phone number or email, or select a bank account. Anywhere in the world.",
    imageSrc: "image/featureAsset1.png",
  },
  {
    title: "What You See Is What You Pay",
    description:
      "No hidden charges. Mid-market (Google) exchange rates. Lowest cost. 100% transparency. No subscription charges. Discounts for larger transactions.",
    imageSrc: "image/featureAsset2.png",
  },
  {
    title: "Your Money. Our Protection.",
    description:
      "Your data is encrypted and money is held at world-leading banks. We’re regulated and certified. Compliance, privacy, and security are our first priorities.",
    imageSrc: "image/featureAsset3.png",
  },
];

const FeatureCarousel = () => {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const swiperEl = swiperRef.current?.swiper;

    if (!section || !swiperEl) return;

    const featuresCount = FEATURE.length;
    ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${window.innerHeight * featuresCount}`,
      scrub: 1,
      onUpdate: (self) => {
        const slideIdx = Math.round(self.progress * (featuresCount - 1));
        swiperEl.slideTo(slideIdx);
      },
    });

    // Sync Swiper index on scroll or swipe
    swiperEl.on("slideChange", () => {
      setActiveSlide(swiperEl.activeIndex);
    });

    setActiveSlide(swiperEl.activeIndex || 0); // initial load

    return () => {
      ScrollTrigger.killAll();
      swiperEl && swiperEl.off("slideChange");
    };
  }, []);

  return (
    <section ref={sectionRef} className="sticky top-0 w-full h-screen bg-white z-30">
      <Swiper
        ref={swiperRef}
        modules={[Mousewheel]}
        slidesPerView={1}
        allowTouchMove={false}
        mousewheel={false}
        style={{ height: "100vh", width: "100vw" }}
      >
        {FEATURE.map((props, i) => (
          <SwiperSlide key={i}>
            {/* <Products
              {...props}
              active={activeSlide === i}
            /> */}
            <Feature {...props}
              active={activeSlide === i}
            /> 
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeatureCarousel;


