import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const HomeCat=()=>{
    return(
    <section className="homeCat">
    <div className="container">
        <h3 class="hd">Featured Categories</h3>
            <Swiper
            className="customSwiper"
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={9}
            slidesPerGroup={1}
            slidesPerView={4}
            direction="horizontal">
        <SwiperSlide>
         <div className="item text-center">
          <img src="/images/processor.webp"
              alt="PROCESSOR"/>
        <h6>INTEL PROCESSOR</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center">
          <img src="/images/motherboard.webp"
              alt="MOTHERBOARD"/>
        <h6>MOTHERBOARD</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/custom cooling.webp"
              alt="CUSTOM COOOLING"/>
        <h6>CUSTOM COOLING</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/cooling system.webp"
              alt="COOLING SYSTEM"/>
        <h6>COOLING SYSTEM</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/graphics card.webp"
              alt="GRAPHIC CARD"/>
        <h6>GRAPHIC CARD</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/memory.webp"
              alt="MEMORY"/>
        <h6>MEMORY</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/storage.webp"
              alt="STORAGE"/>
        <h6>STORAGE</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/cabinet.webp"
              alt="CABINET"/>
        <h6>CABINET</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/monitor.webp"
              alt="MONITOR"/>
        <h6>MONITOR</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/power supply.webp"
              alt="POWER SUPPLY"/>
        <h6>POWER SUPPLY</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/keyboard.webp"
              alt="KEYBOARD"/>
        <h6>GAMING KEYBOARD</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/mouse.webp"
              alt="MOUSE"/>
        <h6>GAMING MOUSE</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/headset.webp"
              alt="HEADSET"/>
        <h6>HEADSET</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/gamingchair.webp"
              alt="GAMING CHAIR"/>
        <h6>GAMING CHAIR</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/mousepad.webp"
              alt="MOUSEPAD"/>
        <h6>MOUSEPAD</h6>
        </div>
        </SwiperSlide>
        <SwiperSlide>
         <div className="item text-center cursor">
          <img src="/images/gamecontroller.webp"
              alt="GAMECONTROLLER"/>
        <h6>GAME CONTROLLER</h6>
        </div>
        </SwiperSlide>        
        </Swiper>
        </div>
      </section>
)
}
export default HomeCat;