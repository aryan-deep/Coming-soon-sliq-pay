const Footer = () => (
  <footer className="bg-black text-[#B4B6BB] py-[40px] md:py-[80px] px-6 md:px-[72px]">
    <div className="flex flex-col md:flex-row justify-between gap-[40px] md:gap-[100px]" style={{ fontFamily: 'nunito' }}>

      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center mb-2">
            <img
              src="/svg/footerlogo.svg"
              alt="Sliqpay Logo"
              className="w-32 h-auto"
            />
          </div>
          <p className="text-sm leading-relaxed mt-1 text-left">
            Sliq pay sets your money free. Secure. Light. Inexpensive. Quick.
          </p>
        </div>
        {/* Social icons for desktop */}
        <div className="hidden md:flex items-center gap-4 mt-6">
          <a href="#" aria-label="Facebook" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/fb.svg" alt="Facebook" className="w-[40px] h-[40px]" />
          </a>
          <a href="#" aria-label="Instagram" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/ig.svg" alt="Instagram" className="w-[40px] h-[40px]" />
          </a>
          <a href="#" aria-label="TikTok" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/tiktok.svg" alt="TikTok" className="w-[40px] h-[40px]" />
          </a>
          <a href="#" aria-label="LinkedIn" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/linkedin.svg" alt="LinkedIn" className="w-[40px] h-[40px]" />
          </a>
          <span className="ml-8 text-xs opacity-70 whitespace-nowrap">
            &copy; 2025 Sliq pay by ARKS Ventures LLC. All rights reserved.
          </span>
        </div>
      </div>

      {/* Middle and Right Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end flex-1 w-full">

        <div className="flex flex-col justify-between h-full w-full md:w-auto">
          <div>
            <h3 className="font-semibold text-[24px] text-[#FFFFFF] mb-2 text-left">Contact Us</h3>
            <p className="text-sm text-[16px] break-words text-left">support@arksventures.ai</p>
          </div>
          <div>
            <h3 className="font-semibold text-[24px] text-[#FFFFFF] mt-[50px] mb-2 text-left">Location</h3>
            <p className="text-[16px] text-left">ARKS Ventures LLC</p>
            <p className="text-[16px] text-left">765 W Middlefield Rd, Unit 2203</p>
            <p className="text-[16px] text-left">Mountain View, CA 94043 US</p>
            <p className="mt-[50px] text-[16px] text-left">NMLS ID: 2714589<br />MSB Registration Number: 31000298221871</p>
          </div>
        </div>

        <div className="w-full md:w-auto mt-8 md:mt-0 md:ml-auto md:pr-[20px]">
          <h3 className="font-semibold text-[16px] text-[#FFFFFF] mb-2 text-left">Legal</h3>
          <ul className="text-[16px] space-y-[19px] text-left">
            <li>
              <a
                href="https://www.sliq-pay.com/legal/terms-of-use"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition"
              >
                Terms of Use
              </a>
            </li>
            <li>
              <a
                href="https://www.sliq-pay.com/legal/consumer-privacy-notice"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition"
              >
                Consumer Privacy Notice
              </a>
            </li>
            <li>
              <a
                href="https://www.sliq-pay.com/legal/acceptable-use-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition"
              >
                Acceptable Use Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.sliq-pay.com/legal/electronic-communication-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition"
              >
                Electronic Communication Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social icons for mobile */}
      <div className="flex md:hidden flex-col items-center mt-10 gap-3">
        <div className="flex items-center gap-4">
          <a href="#" aria-label="Facebook" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/fb.svg" alt="Facebook" className="w-6 h-6" />
          </a>
          <a href="#" aria-label="Instagram" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/ig.svg" alt="Instagram" className="w-6 h-6" />
          </a>
          <a href="#" aria-label="TikTok" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/tiktok.svg" alt="TikTok" className="w-6 h-6" />
          </a>
          <a href="#" aria-label="LinkedIn" className="transition-transform hover:scale-110 hover:brightness-125">
            <img src="/svg/linkedin.svg" alt="LinkedIn" className="w-6 h-6" />
          </a>
        </div>
        <span className="text-xs opacity-70 text-center mt-2">
          &copy; 2025 Sliq pay by ARKS Ventures LLC. All rights reserved.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
