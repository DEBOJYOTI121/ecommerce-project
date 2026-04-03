import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const HomeBanner = () => {
  return (
    <div className="container">
      <div className="homeBannerSection">
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={55}
          slidesPerView={1}
          navigation
          autoplay={{ delay: 3000 }}
          loop={false}
          className="homeBannerSwiper"
        >
          <SwiperSlide className="item">
            <img
              src="/images/graphic card.jpg"
              alt="NVIDIA GeForce RTX 40 Series GPUs Banner"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <img
              src="/images/cpu.jpg"
              alt="INTEL i9 Series CPUs Banner"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <img
              src="/images/amd.jpg"
              alt="AMD Ryzen Series"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <img
              src="/images/laptop.jpg"
              alt="Gaming Laptops"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <img
              src="/images/batmobile.jpg"
              alt="Gaming Laptops"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <img
              src="/images/gore.jpg"
              alt="Gaming Laptops"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
          <SwiperSlide className="item">
            <img
              src="/images/cyberpunk.jpg"
              alt="Gaming Laptops"
              className="w-full h-[500px] object-cover"
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeBanner;
