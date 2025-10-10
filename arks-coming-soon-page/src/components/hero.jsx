"use client";
import React, { useRef, useEffect } from "react";

// Tune these for feel
const CIRCLE_RADIUS = 200;
const TRAIL_SPEED = 0.18;   // Lower = slower/more lag
const ALPHA_ENTER = 1;      // Circle fully visible
const ALPHA_LEAVE = 0;      // Fade out

const Hero = ({ frontImg, bgImg, bgImgHover, children }) => {
  const containerRef = useRef(null);
  const hoverImgRef = useRef(null);

  // State (REF, not setState, SUPER FAST)
  const target = useRef({
  x: 0, // default safe values for SSR
  y: 0,
  active: false,
  radius: CIRCLE_RADIUS,
  alpha: ALPHA_LEAVE
});

useEffect(() => {
  target.current.x = window.innerWidth / 2;
  target.current.y = window.innerHeight / 2;
}, []);
  const current = useRef({ x: target.current.x, y: target.current.y, radius: CIRCLE_RADIUS, alpha: ALPHA_LEAVE });
  const animFrame = useRef(null);

  // Mouse tracking, updates target position
  const handleMove = e => {
    const rect = containerRef.current.getBoundingClientRect();
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
  };

  // Activate on enter
  const handleEnter = () => {
    target.current.active = true;
    target.current.alpha = ALPHA_ENTER;
  };

  // Fade out mask on leave
  const handleLeave = () => {
    target.current.active = false;
    target.current.alpha = ALPHA_LEAVE;
  };

  // Render update with interpolation
  function animateCircle() {
    // Slightly ease position and alpha toward target
    current.current.x += (target.current.x - current.current.x) * TRAIL_SPEED;
    current.current.y += (target.current.y - current.current.y) * TRAIL_SPEED;
    current.current.alpha += (target.current.alpha - current.current.alpha) * 0.1;
    current.current.radius += (target.current.radius - current.current.radius) * 0.1;

    // Update mask (only if exists)
    if (hoverImgRef.current) {
      hoverImgRef.current.style.WebkitMaskImage =
        hoverImgRef.current.style.maskImage =
        current.current.alpha > 0.01
          ? `radial-gradient(circle ${current.current.radius}px at ${current.current.x}px ${current.current.y}px, white 60%, transparent 100%)`
          : "none";
      hoverImgRef.current.style.opacity = current.current.alpha;
    }
    animFrame.current = requestAnimationFrame(animateCircle);
  }

  useEffect(() => {
    animFrame.current = requestAnimationFrame(animateCircle);
    return () => animFrame.current && cancelAnimationFrame(animFrame.current);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen flex items-center text-start justify-center overflow-hidden"
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ touchAction: "none" }}
    >
      <img
        src={bgImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-300"
        draggable={false}
      />
      {/* Hover Image with liquid trailing circular reveal */}
      <img
        ref={hoverImgRef}
        src={bgImgHover}
        alt="Background hover"
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        style={{
          opacity: 0,
          transition: 'opacity 0.32s',
        }}
        draggable={false}
      />
      <img
        src={frontImg}
        alt="Hero"
        className=" absolute left-1/2 bottom-0 translate-x-[-35%] max-w-lg h-[60vh] md:left-0 md:translate-x-0 md:h-full md:w-auto md:max-w-none z-10 pointer-events-none"
        draggable={false}
      />
      <div className="absolute top-[30px] left-0 w-full px-4 flex flex-col items-start text-left md:items-center md:text-center z-20">
        {children}
      </div>
    </div>
  );
};

export default Hero;
