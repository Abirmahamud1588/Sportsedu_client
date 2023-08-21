import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import img1 from "../../assets/resize-1692451774602258116headerOSA1scaled.jpg";
import img2 from "../../assets/resize-1692451793983138870Screenshot20230819192629.png";

const Banner = () => {
  return (
    <div className="">
      <Swiper
        rewind={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={img1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img2} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
