import React from "react";

export default function ImageBannerWithOverlay({
  backgroundImage,
  mainText,
  bottomIcon,
  iconWidth = 240, // desktop badge width (for reference, not used directly here)
  iconHeight = 44, // desktop badge height
  mobileIconWidth = 335, // mobile width 
  mobileIconHeight = 133  // mobile height
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        overflow: "hidden",
        paddingTop: "80px"
      }}
    >
      <img
        src={backgroundImage}
        alt="banner"
        style={{
          width: "100vw",
          height: "800px",
          display: "block",
          objectFit: "cover"
        }}
      />

      {/* Overlay main text */}
      <div
        className="absolute top-[12%] text-[#18191C] font-bold text-[32px] md:text-[56px] pt-[60px] md:pt-[80px] w-full pl-[20px] pr-[20px] md:pl-[80px] md:pr-[80px] z-20 text-center font-sans"
        style={{ fontFamily: "Malinton" }}
      >
        {mainText}
      </div>

      {/* Central bottom icon/badge, responsive for mobile */}
      {bottomIcon && (
        <img
          src={bottomIcon}
          alt="badge"
          className="
            absolute
            left-1/2
            bottom-[30px]
            -translate-x-1/2
            z-30
            md:w-[440px] md:h-[75px]
            w-[335] h-[75px]
          "
        />
      )}
    </div>
  );
}
