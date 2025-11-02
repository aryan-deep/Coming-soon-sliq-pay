import React from "react";

export default function ImageBannerWithOverlay({
    backgroundImage,
    mainText,
    bottomIcon,
    iconWidth = 240, // wide badge for desktop
    iconHeight = 44, // standard height for badges
    mobileIconWidth = 335, // smaller on mobile
    mobileIconHeight = 133
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
            <div className=" absolute top-[12%] text-[#18191C] font-bold text-[32px] md:text-[56px] pt-[60px] md:pt-[80px] w-full pl-[20px] pr-[20px] md:pl-[80px] md:pr-[80px] z-20 text-center font-sans"
                style={{ fontFamily: "Malinton" }}
            >
                {mainText}
            </div>

            {/* Central bottom icon/badge, responsive for mobile */}
            {bottomIcon &&
                <img
                    src={bottomIcon}
                    alt="badge"
                    className="banner-badge"
                    style={{
                        position: "absolute",
                        left: "50%",
                        bottom: "30px",
                        transform: "translateX(-50%)",
                        width: `${iconWidth}px`,
                        height: `${iconHeight}px`,
                        zIndex: 3
                    }}
                />
            }
            <style>{`
        @media (max-width: 540px) {
          .banner-badge {
            width: ${mobileIconWidth}px !important;
            height: ${mobileIconHeight}px !important;
          }
        }
      `}</style>
        </div>
    );
}
