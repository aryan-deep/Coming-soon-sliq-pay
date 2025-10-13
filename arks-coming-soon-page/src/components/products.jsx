"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Products = ({ title, description, imageSrc, active, extras }) => {
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (active) {
      gsap.to(textRef.current, {
        y: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "expo.out", overwrite: true,
      });
      gsap.to(imgRef.current, {
        y: 0, scale: 1, autoAlpha: 1, duration: 0.6, ease: "expo.out", overwrite: true,
      });
    } else {
      gsap.to(textRef.current, {
        y: 40, autoAlpha: 0, scale: 0.98, duration: 0.6, ease: "power2.in", overwrite: true,
      });
      gsap.to(imgRef.current, {
        y: 40, scale: 0.98, autoAlpha: 0, duration: 0.5, ease: "expo.in", overwrite: true,
      });
    }
  }, [active]);

  return (
    <div className="flex flex-col md:flex-row w-full md:justify-center gap-2">
      {/* Text always at top and left on mobile, left on desktop */}
      <div
        ref={textRef}
        className="w-full px-[16px] md:w-1/2 pt-[50px] md:pt[0] md:ml-[80px] md:my-[200px] mb-4 md:mb-0 flex flex-col"
      >
        <h2 className="text-[32px] leading-[1.19] md:text-[56px] text-[#0C1523] font-bold mb-2" style={{ fontFamily: 'Malinton' }}>
          {title}
        </h2>
        <p className="text-[16px] md:text-[18px] leading-[1.50] text-[#3D444F] text-gray-700" style={{ fontFamily: 'Nunito' }}>
          {description}
        </p>
        {extras && extras.length > 0 && (
          <div className="mt-4 flex flex-col gap-3">
            {extras.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <img src={item.icon} alt="" className="w-6 h-6" />
                <span className="text-[16px] leading-[1.50] md:text-[18px] text-[#3D444F]" style={{ fontFamily: 'Nunito' }}>{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Image just below text in mobile, right in desktop */}
      <div className="w-full md:w-1/2 flex justify-center items-center relative mb-[80px]">
        <img
          ref={imgRef}
          src={imageSrc}
          alt={title}
          className=" w-full h-auto mx-auto block"
          style={{
            pointerEvents: "none",
            transition: "all 0.35s cubic-bezier(.64,.12,.17,.51)"
          }}
        />
      </div>
    </div>
  );
};

export default Products;
