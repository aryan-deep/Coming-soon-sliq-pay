"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGotoWaitlist = useCallback((e) => {
    e.preventDefault();
    const el = document.getElementById("waitlist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#waitlist");
    } else {
      window.location.href = "/#waitlist";
    }
    setMenuOpen(false); // close menu if on mobile
  }, []);

  const handleHamburger = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full absolute top-0 left-0 z-50">
      <nav
        className={`
          flex items-center justify-between
          px-[72px] pt-6 pb-2
          bg-transparent
          max-sm:px-4 max-sm:pt-3 max-sm:pb-1
          w-full
        `}
      >
        {/* Logo */}
        <img
          src="/svg/sliqpay.svg"
          alt="Sliqpay Logo"
          className="h-[32px] w-[127px] md:h-[40px] md:w-[177px]"
        />

        {/* Navigation Links (Desktop) */}
        <div className="flex items-center gap-8 max-sm:hidden" style={{ fontFamily: 'Nunito' }}>
          {/* <Link href="/products" className="text-[#0C1523] font-bold leading-[27px] px-[16px] text-[18px]  hover:text-primary transition">
            Products
          </Link>
          <Link href="/security" className="text-[#0C1523] font-bold leading-[27px] px-[16px] text-[18px]  hover:text-primary transition">
            Security
          </Link>
          <Link href="/features" className="text-[#0C1523] font-bold leading-[27px] px-[16px] text-[18px]  hover:text-primary transition">
            Features
          </Link> */}
          <Link href="/" className="text-[#0C1523] font-bold leading-[27px] px-[16px] text-[18px]  hover:text-primary transition">
            Home
          </Link>
          <Link href="/blog" className="text-[#0C1523] font-bold leading-[27px] px-[16px] text-[18px]  hover:text-primary transition">
            Blogs
          </Link>
        </div>
        {/* Desktop Join Waitlist Button */}
        <a
          href="#waitlist"
          onClick={handleGotoWaitlist}
          className="hidden sm:flex items-center gap-2 bg-opacity-70 text-black rounded-md backdrop-blur-md transition hover:brightness-110"
        >
          <img
            src="/svg/joinWaitlist.svg"
            alt="joinWaitlist"
            className="w-[174px] h-[52px]"
          />
        </a>

        {/* Hamburger Icon */}
        <button
          type="button"
          className="sm:hidden flex flex-col gap-1 z-50"
          onClick={handleHamburger}
          aria-label="Toggle navigation menu"
        >
          {/* Top Bar */}
          <span className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
          {/* Bottom Bar */}
          <span className={`block w-7 h-1 bg-black rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
        </button>
      </nav>

      {/* Mobile Fullscreen Overlay Menu */}
      {menuOpen && (
  <div
    className="fixed inset-0 bg-white bg-opacity-95 z-40 flex flex-col"
    onClick={() => setMenuOpen(false)}
  >
    {/* Nav links: top left */}
    <div
      className="flex flex-col gap-[20px] pl-[20px] pt-16 items-start grow"
      onClick={e => e.stopPropagation()}
      style={{ fontFamily: 'Nunito' }}
    >
      {/* <Link href="/products" className="text-[#0C1523] text-[16px] hover:text-primary transition" onClick={() => setMenuOpen(false)}>
        Products
      </Link>
      <Link href="/security" className="text-[#0C1523] text-[16px] hover:text-primary transition" onClick={() => setMenuOpen(false)}>
        Security
      </Link>
      <Link href="/features" className="text-[#0C1523] text-[16px] hover:text-primary transition" onClick={() => setMenuOpen(false)}>
        Features
      </Link> */}
      <Link href="/blog" className="text-[#0C1523] text-[16px] hover:text-primary transition" onClick={() => setMenuOpen(false)}>
        Blogs
      </Link>
    </div>
    {/* Join Waitlist: bottom center */}
    <div className="flex justify-center pb-10">
      <a
        href="#waitlist"
        onClick={handleGotoWaitlist}
        className="flex"
      >
        <img src="/svg/joinWaitlist.svg" alt="Join Waitlist" className="w-[288px] h-[48px]" />
      </a>
    </div>
  </div>
)}

    </header>
  );
};

export default Header;
