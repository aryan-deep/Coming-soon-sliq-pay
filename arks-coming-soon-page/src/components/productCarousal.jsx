"use client";

import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Products from "./products";


gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    title: "Your passport to local payments",
    description: "Instantly pay like a local with UPI in India, WeChat in China, and more without local account or SIM. Skip ATM runs and cash hassle.",
    imageSrc: "image/productsAsset1.png",
    extras: [
      { icon: "/svg/Vector.svg", text: "Digital, ultra-simple, secure, compliant, 24×7 human support." },
      { icon: "/svg/Vector.svg", text: "Skip high fees and FX markups. Clear rates, no hidden charges." },
      { icon: "/svg/Vector.svg", text: "Scan any QR code, or pay anyone. No card declines, no cash hassle." },
    ],
  },
  {
    title: "The better route to home",
    description: "Transfer money instantly with low fees, bank-grade security, trusted compliance, and real human support when you need it.",
    imageSrc: "image/productsAsset2.png",
    extras: [
      { icon: "/svg/Vector.svg", text: "Money received instantly. No paperwork, no calls, no 3-day wait." },
      { icon: "/svg/Vector.svg", text: "Low fees, mid-market (Google) FX. No hidden fees or markups." },
      { icon: "/svg/Vector.svg", text: "Digital, ultra-simple, secure, compliant, 24×7 human support." },
    ],
  },
  {
    title: "Skip the portal. Keep the promise",
    description: "Pay global bills in seconds. Skip archaic portals or asking for favors. No local bank account or phone needed. Reliable, low fees, secure.",
    imageSrc: "image/productsAsset3.png",
    extras: [
      { icon: "/svg/Vector.svg", text: "Pay utility, rent, broadband, school, or credit-card bills in seconds. " },
      { icon: "/svg/Vector.svg", text: "Works where cards fail or OTPs don’t arrive. Instant confirmation." },
      { icon: "/svg/Vector.svg", text: "Live tracking, simple, secure, compliant, 24×7 human support." },
    ],
  },
  {
    title: "New country, new course, no stress",
    description: "Send money for study abroad without paperwork and branch visits. Transparent fees, robust compliance, and world-class security.",
    imageSrc: "image/productsAsset4.png",
    extras: [
      { icon: "/svg/Vector.svg", text: "Tap to send university tuition, housing, or visa fees in seconds." },
      { icon: "/svg/Vector.svg", text: "Save 3–4% with low fees and mid-market (Google) FX." },
      { icon: "/svg/Vector.svg", text: "RBI compliant, secure, 24×7 human support." },
    ],
  },
];

const ProductsCarousel = () => {
  const sectionRef = useRef(null);
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const swiperEl = swiperRef.current?.swiper;

    if (!section || !swiperEl) return;

    const productsCount = PRODUCTS.length;
    ScrollTrigger.create({
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${window.innerHeight * PRODUCTS.length}`,
      scrub: 1,
      onUpdate: (self) => {
        const slideIdx = Math.round(self.progress * (productsCount - 1));
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
        {PRODUCTS.map((props, i) => (
          <SwiperSlide key={i}>
            <Products
              {...props}
              active={activeSlide === i}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductsCarousel;
