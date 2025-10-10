//Not using his code
"use client"

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Products = ({ title, description, imageSrc, active }) => {
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
    <div className="flex flex-col md:flex-row items-center gap-6 w-full">
      <div ref={textRef} className="w-full md:w-1/2 ml-[80px] my-[240px]">
        <h2 className="text-[56px] text-[#0C1523] font-bold mb-2" style={{ fontFamily: 'Malinton' }}>{title}</h2>
        <p className="text-[18px] text-[#3D444F] text-gray-700" style={{ fontFamily: 'Nunito' }}>{description}</p>
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          ref={imgRef}
          src={imageSrc}
          alt={title}
          className=" w-full h-auto mx-auto block"
          style={{
            pointerEvents: "none",
            transition: "all 0.35s cubic-bezier(.64,.12,.17,.51)",
          }}
        />
      </div>
    </div>
  );
};

export default Products;
