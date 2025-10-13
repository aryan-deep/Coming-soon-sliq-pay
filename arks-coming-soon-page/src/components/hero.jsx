"use client";
import React, { useRef, useEffect, useCallback } from "react";

// Configurable constants
const CIRCLE_RADIUS = 200;
const TRAIL_SPEED = 0.18; // Lower => slower/laggier trail
const ALPHA_ENTER = 1;
const ALPHA_LEAVE = 0;

const Hero = ({ frontImg, bgImg, bgImgHover, children }) => {
  const containerRef = useRef(null);
  const hoverImgRef = useRef(null);

  // Target (updated on mouse / touch)
  const target = useRef({
    x: 0,
    y: 0,
    radius: CIRCLE_RADIUS,
    alpha: ALPHA_LEAVE,
    active: false,
  });

  // Current interpolated state
  const current = useRef({
    x: 0,
    y: 0,
    radius: CIRCLE_RADIUS,
    alpha: ALPHA_LEAVE,
  });

  // Previous values (for minimizing DOM writes)
  const prev = useRef({
    alpha: current.current.alpha,
    x: Math.round(current.current.x),
    y: Math.round(current.current.y),
    r: Math.round(current.current.radius),
  });

  const animFrame = useRef(null);
  const loopRunning = useRef(false);

  // Initialize mask center for SSR safety
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.current.x = cx;
      target.current.y = cy;
      current.current.x = cx;
      current.current.y = cy;
      if (hoverImgRef.current) {
        hoverImgRef.current.style.setProperty("--mask-x", `${Math.round(cx)}px`);
        hoverImgRef.current.style.setProperty("--mask-y", `${Math.round(cy)}px`);
        hoverImgRef.current.style.setProperty("--mask-r", `${CIRCLE_RADIUS}px`);
        hoverImgRef.current.style.opacity = String(current.current.alpha);
      }
    }
  }, []);

  // Animation tick (uses refs only)
  const loopTick = useCallback(() => {
    current.current.x += (target.current.x - current.current.x) * TRAIL_SPEED;
    current.current.y += (target.current.y - current.current.y) * TRAIL_SPEED;
    current.current.alpha += (target.current.alpha - current.current.alpha) * 0.12;
    current.current.radius += (target.current.radius - current.current.radius) * 0.12;

    const img = hoverImgRef.current;
    if (img) {
      const alpha = Math.max(0, Math.min(1, current.current.alpha));

      // update opacity if changed significantly
      if (Math.abs(alpha - prev.current.alpha) > 0.005) {
        img.style.opacity = String(alpha);
        prev.current.alpha = alpha;
      }

      // update mask variables when mask is visible
      if (alpha > 0.01) {
        const rx = Math.round(current.current.x);
        const ry = Math.round(current.current.y);
        const rr = Math.round(current.current.radius);

        if (rx !== prev.current.x) {
          img.style.setProperty("--mask-x", `${rx}px`);
          prev.current.x = rx;
        }
        if (ry !== prev.current.y) {
          img.style.setProperty("--mask-y", `${ry}px`);
          prev.current.y = ry;
        }
        if (rr !== prev.current.r) {
          img.style.setProperty("--mask-r", `${rr}px`);
          prev.current.r = rr;
        }
      }
    }

    // stop the loop when alpha reached target and is near zero
    const shouldStop =
      Math.abs(current.current.alpha - target.current.alpha) < 0.005 &&
      current.current.alpha <= 0.01 &&
      target.current.alpha <= 0.01;

    if (shouldStop) {
      loopRunning.current = false;
      animFrame.current = null;
      return;
    }

    animFrame.current = requestAnimationFrame(loopTick);
  }, []);

  const startLoop = useCallback(() => {
    if (!loopRunning.current) {
      loopRunning.current = true;
      animFrame.current = requestAnimationFrame(loopTick);
    }
  }, [loopTick]);

  const applyImmediateReveal = (x, y, r, alpha) => {
    const img = hoverImgRef.current;
    if (!img) return;
    img.style.setProperty("--mask-x", `${Math.round(x)}px`);
    img.style.setProperty("--mask-y", `${Math.round(y)}px`);
    img.style.setProperty("--mask-r", `${Math.round(r)}px`);
    img.style.opacity = String(alpha);
    prev.current.x = Math.round(x);
    prev.current.y = Math.round(y);
    prev.current.r = Math.round(r);
    prev.current.alpha = alpha;
  };

  const handleMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current.x = e.clientX - rect.left;
    target.current.y = e.clientY - rect.top;
  };

  const startReveal = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e?.clientX ? e.clientX - rect.left : rect.width / 2;
    const y = e?.clientY ? e.clientY - rect.top : rect.height / 2;

    target.current.x = x;
    target.current.y = y;
    target.current.alpha = ALPHA_ENTER;
    target.current.active = true;

    // immediate apply so users see the effect right away
    applyImmediateReveal(x, y, target.current.radius, target.current.alpha);
    startLoop();
  };

  const stopReveal = () => {
    target.current.alpha = ALPHA_LEAVE;
    target.current.active = false;
  };

  const handleTouchStart = (e) => {
    const touch = e.touches && e.touches[0];
    if (!touch) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    target.current.x = x;
    target.current.y = y;
    target.current.alpha = ALPHA_ENTER;
    target.current.active = true;
    applyImmediateReveal(x, y, target.current.radius, target.current.alpha);
    startLoop();
  };

  const handleTouchMove = (e) => {
    const touch = e.touches && e.touches[0];
    if (!touch) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    target.current.x = touch.clientX - rect.left;
    target.current.y = touch.clientY - rect.top;
  };

  // Start animation loop on mount so first interaction is smooth
  useEffect(() => {
    if (!loopRunning.current) {
      loopRunning.current = true;
      animFrame.current = requestAnimationFrame(loopTick);
    }
    return () => {
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
      loopRunning.current = false;
    };
  }, [loopTick]);

  // JSX Layout
  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMove}
      onMouseEnter={startReveal}
      onMouseLeave={stopReveal}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={stopReveal}
      style={{
        // keep a faint bright base so overlay blends nicely
        backgroundColor: "#fff",
      }}
    >
      {/* Base Background */}
      <img
        src={bgImg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        draggable={false}
      />

      {/* Top white overlay — pure white up to 40%, then fades to transparent */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-full z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 20%, rgba(255,255,255,0) 40%)",
          // use lighten/screen depending on your image; try 'lighten' first
          mixBlendMode: "lighten",
          pointerEvents: "none",
          transform: "translateZ(0)",
        }}
      />

      {/* Hover Image (masked reveal) — keep above top overlay so reveal shows hover image */}
      <img
        ref={hoverImgRef}
        src={bgImgHover}
        alt="Background hover"
        className="absolute inset-0 w-full h-full object-cover z-20 pointer-events-none"
        style={{
          opacity: 0,
          willChange: "mask-image, -webkit-mask-image, opacity",
          WebkitMaskImage:
            "radial-gradient(circle var(--mask-r, 0px) at var(--mask-x, 0px) var(--mask-y, 0px), white 60%, transparent 100%)",
          maskImage:
            "radial-gradient(circle var(--mask-r, 0px) at var(--mask-x, 0px) var(--mask-y, 0px), white 60%, transparent 100%)",
        }}
        draggable={false}
      />

      {/* Bottom cloud overlay — covers ~25% of height (25vh) with soft blurred blobs */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 bottom-0 h-[15vh] z-35 pointer-events-none"
        style={{
          background:
            `radial-gradient(circle at 10% 80%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.9) 18%, rgba(255,255,255,0) 45%),
             radial-gradient(circle at 50% 95%, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.92) 16%, rgba(255,255,255,0) 46%),
             radial-gradient(circle at 85% 82%, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0) 48%)`,
          filter: "blur(100px)",
          transform: "translateY(6%)",
          opacity: 0.98,
          pointerEvents: "none",
        }}
      />

      {/* Foreground Hero Image (responsive, proportional and left-anchored) */}
      <img
        src={frontImg}
        alt="Hero"
        className=" absolute left-0 bottom-0 translate-x-0 max-w-xl h-[80vh] md:w-[100vw] md:h-auto md:max-w-none z-30 pointer-events-none"
        draggable={false}
      />

      {/* Overlay content */}
      <div className="absolute top-[30px] left-0 w-full px-4 flex flex-col items-start text-left md:items-center md:text-center z-29">
        {children}
      </div>
    </div>
  );
};

export default Hero;
