const Header = () => (
  <header className="w-full absolute top-0 left-0 z-50">
    <nav className="
      flex items-center justify-between
      px-[72px] pt-6 pb-2
      bg-transparent
      max-sm:px-4 max-sm:pt-3 max-sm:pb-1
      w-full
    ">
      <img
        src="/svg/sliqpay.svg"
        alt="Sliqpay Logo"
        className="h-[32px] w-[127px] md:h-[40px] md:w-[177px]"
      />
      <a
        href="#"
        className="
          flex items-center gap-2
          bg-opacity-70 text-white rounded-md
          backdrop-blur-md transition hover:brightness-110
        "
      >
        <img
          src="/svg/joinWaitlist.svg"
          alt="joinWaitlist"
          className="w-[174px] h-[52px] max-sm:w-[120px] max-sm:h-[38px]"
        />
      </a>
    </nav>
  </header>
);

export default Header;
