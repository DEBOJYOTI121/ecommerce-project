import React, { useRef } from 'react';
import Slider from "react-slick";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
const ProductZoom = ()=>{
    const zoomSliderBig = useRef();
    const zoomSlider = useRef();
    const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true
  };

  const settings2 = {
    dots: false,
    infinite: false,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };
   const goto = (index) => {
      zoomSlider.current.slickGoTo(index);
      zoomSliderBig.current.slickGoTo(index);
    };
  
    const images = [
      "rtx 5050.jpeg",
      "rtx 5050 1.jpg",
      "rtx 5050 2.jpg",
      "rtx 5050 3.jpg",
      "rtx 5050 4.jpg"
    ];
   return(
      <div className="productZoom">
        <div className="productZoom position-relative">
            <div className='badge badge-primary'>-31%</div>
            <Slider {...settings2} className="zoomSliderBig" ref={zoomSliderBig}>
              {images.map((img, idx) => (
                <div className="item" key={idx}>
                  <InnerImageZoom
                    src={`/images/rtx 5050/${img}`}
                    alt={`RTx ${idx}`}
                    zoomType="hover"
                    zoomScale={1.5}
                    hasSpacer={false}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "contain",
                      backgroundColor: "#fff"
                    }}
                  />
                </div>
              ))}
            </Slider>
          </div>
            <Slider {...settings} className="zoomSlider" ref={zoomSlider}>
            {images.map((img, idx) => (
              <div className="item" key={idx}>
                <img
                  src={`/images/rtx 5050/${img}`}
                  alt={`RTx ${idx}`}
                  style={{
                    width: "100%",
                    height: "80px",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    cursor: "pointer"
                  }}
                  onClick={() => goto(idx)} // ✅ now sends correct index
                />
              </div>
            ))}
          </Slider>
      </div>
   )
     
}
export default ProductZoom;