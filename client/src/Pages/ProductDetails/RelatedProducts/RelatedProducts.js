import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductItem from "../../../Components/ProductItem/ProductItem";

const RelatedProducts=()=>{
    const products = [
    {
      name: "Zotac RTX 5050 Twin Edge 8GB GDDR6 Graphics Card",
      image: "/images/rtx 5050/rtx 5050.jpeg",
      oldPrice: 41450,
      newPrice: 28450,
      stock: "IN STOCK",
      discount: 31,
    },
    {
      name: "MSI RTX 5060 Gaming OC 8GB GDDR7 Graphics Card",
      image: "/images/rtx 5060.webp",
      oldPrice: 64999,
      newPrice: 35500,
      stock: "OUT OF STOCK",
      discount: 45,
    },
    {
      name: "Gigabyte RTX 5060 Windforce 8GB GDDR7 Graphics Card",
      image: "/images/gigabyte.webp",
      oldPrice: 125000,
      newPrice: 32100,
      stock: "LIMITED STOCK",
      discount: 74,
    },
    {
      name: "MSI RTX 5060 Ventus 2X OC White 8GB GDDR7 Graphics Card",
      image: "/images/ventus.webp",
      oldPrice: 61999,
      newPrice: 33200,
      stock: "IN STOCK",
      discount: 46,
    },
    {
      name: "Gigabyte RTX 5060 Eagle OC 8GB GDDR7 Graphics Card",
      image: "/images/dual fan.webp",
      oldPrice: 127750,
      newPrice: 32495,
      stock: "IN STOCK",
      discount: 74,
    },
    {
      name: "ZOTAC RTX 5060 Solo 8GB GDDR7 Graphics Card for Gaming",
      image: "/images/solo.webp",
      oldPrice: 49210,
      newPrice: 31600,
      stock: "IN STOCK",
      discount: 36,
    },
    {
      name: "Gigabyte RTX 5060 Eagle OC 8GB GDDR7 Graphics Card",
      image: "/images/dual fan.webp",
      oldPrice: 127750,
      newPrice: 32495,
      stock: "IN STOCK",
      discount: 74,
    },
    {
      name: "ZOTAC RTX 5060 Solo 8GB GDDR7 Graphics Card for Gaming",
      image: "/images/solo.webp",
      oldPrice: 49210,
      newPrice: 31600,
      stock: "IN STOCK",
      discount: 36,
    },
  ];
    return(
        <>
         <div className="new">
         <div className="info">
         <h3 className="mb-2 hd">RELATED PRODUCTS</h3>
         </div>
         </div>
            {/* Swiper Slider */}
            <div className="relatedproduct">
            <Swiper
                className="customSwiper"
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={5}
                direction="horizontal"
            >
                {products.map((product, index) => (
                <SwiperSlide key={index}>
                    <ProductItem product={product} />
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </>
    )
}
export default RelatedProducts;