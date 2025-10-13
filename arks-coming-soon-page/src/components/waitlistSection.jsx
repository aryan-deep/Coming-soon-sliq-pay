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
      className="relative w-full min-h-[520px] flex flex-col items-center justify-center py-16"
      style={{
        backgroundImage: "url('/image/waitlistBg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h2
        className="text-[32px] md:text-[56px] px-[16px] tracking-[0px] text-start leading-[1.13] font-bold text-[#0C1523] md:text-center mb-10"
        style={{ fontFamily: "Malinton" }}
      >
        Be the early bird and set your money free
      </h2>

      <form
        className="bg-white rounded-2xl shadow-xl px-8 py-8 max-w-md w-full flex flex-col items-center gap-4"
        onSubmit={handleSubmit}
        style={{ fontFamily: "Nunito" }}
      >
        <div className="mb-4">
          <img
            src="/svg/logowithcircle.svg"
            alt="Sliqpay"
            className="w-[80pz] h-[93px] md:w-[88px] md:w-[103px] mx-auto"
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

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-b text-black border-gray-200 px-4 py-2 mb-4 outline-none focus:ring-2 focus:ring-indigo-300 transition placeholder:text-gray-400"
        />

        <button
          className="w-full flex items-center justify-center"
          type="submit"
        >
          <img
            src="/svg/joinWaitlist.svg"
            alt="joinWaitlist"
            className="w-[174px] h-[52px] max-sm:w-[120px] max-sm:h-[38px]"
          />
        </button>
        {status && <div className="mt-2 text-black">{status}</div>}
      </form>
    </section>
  );
};

export default WaitlistSection;
