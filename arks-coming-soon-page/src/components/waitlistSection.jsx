"use client"

import { useState } from "react";

const WaitlistSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        timestamp: new Date().toISOString(),
      }),
    });
    const result = await response.json();
    setStatus(result.message || result.error || "");
    if (response.ok) setFormData({ name: "", email: "" });
  };

  return (
    <section
     id="waitlist" 
      className="relative w-full px-[20px] flex flex-col items-center justify-start min-h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/image/waitlistBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* --- Header text: always stays on top --- */}
      <h3
        className="relative z-20 order-1 text-[32px] md:text-[56px] px-[16px] tracking-[0px] text-start leading-[1.13] font-bold text-[#0C1523] md:text-center mt-10 mb-20"
        style={{ fontFamily: "Malinton" }}
      >
        Be the early bird and set your money free
      </h3>

      {/* --- Form --- */}
      <form
        onSubmit={handleSubmit}
        className="relative z-20 order-2 bg-white rounded-2xl border-t-1 border-l-1 border-r-4 border-b-4 md:border-t-0 md:border-l-0 border-black shadow-xl px-3 py-6 max-w-md w-full flex flex-col items-center gap-4"
        style={{ fontFamily: "Nunito" }}
      >
        <div className="mb-4">
          <img
            src="/svg/logowithcircle.svg"
            alt="Sliqpay"
            className="w-[80px] h-[93px] md:w-[103px] mx-auto"
          />
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full text-[18px] text-black border-b border-gray-200 px-4 py-2 mb-2 outline-none focus:ring-2 focus:ring-indigo-300 transition placeholder:text-gray-400"
        />

        <div className="w-full flex items-center bg-white rounded-lg overflow-hidden border-b border-black border-gray-200 flex items-center mb-4">
          <img
            src="/image/iconBox.png"   // (replace with your actual icon path)
            alt="Email Icon"
            className="w-6 h-6 mr-[2px]"
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="flex-1 px-2 py-2 outline-none focus:ring-2 focus:ring-indigo-300 transition placeholder:text-gray-400"
          />
        </div>

        <button
          className="w-full flex items-center justify-center"
          type="submit"
        >
          <img
            src="/svg/joinWaitlist.svg"
            alt="joinWaitlist"
            className="w-[158px] h-[48px] md:w-[174px] md:h-[52px]"
          />
        </button>

        {status && <div className="mt-2 text-black">{status}</div>}
      </form>
      <div className="hidden md:block h-24" />
    </section>
  );
};

export default WaitlistSection;
