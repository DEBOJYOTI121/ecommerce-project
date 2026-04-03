// src/Pages/Home/Home.jsx
import React from "react";
import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { LuIndianRupee } from "react-icons/lu";
import { IoIosMail } from "react-icons/io";
import { FcCustomerSupport } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ProductItem from "../../Components/ProductItem/ProductItem";
import HomeCat from "../../Components/HomeCat/HomeCat";
import NewItem from "../../Components/NewItem/NewItem";
import { CiBank } from "react-icons/ci";
import { FaPaypal } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
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
  ];
  const brandNewProducts = [
    {
      name: "MSI RTX 5080 Ventus 3X OC Plus 16GB GDDR7 Graphics Card",
      image: "/images/3fan.webp",
      oldPrice: 219999,
      newPrice: 166580,
      stock: "IN STOCK",
      discount: 24,
    },
    {
      name: "ASUS ROG Astral RTX 5080 OC 16GB GDDR7 Graphics Card",
      image: "/images/asus3fan.webp",
      oldPrice: 265000,
      newPrice: 175000,
      stock: "LIMITED STOCK",
      discount: 34,
    },
    {
      name: "MSI RTX 5080 Gaming Trio OC 16GB GDDR7 Graphics Card",
      image: "/images/msi3fan.webp",
      oldPrice: 176900,
      newPrice: 176300,
      stock: "IN STOCK",
      discount: 0,
    },
    {
      name: "MSI RTX 5080 Vanguard SOC Launch Edition 16GB Graphics Card",
      image: "/images/vanguard3fan.webp",
      oldPrice: 239999,
      newPrice: 176300,
      stock: "IN STOCK",
      discount: 27,
    },
    {
      name: "Sigma VI Blizzard Gaming Bundle Motherboard Including Processor",
      image: "/images/sigma.webp",
      oldPrice: 23045,
      newPrice: 19099,
      stock: "IN STOCK",
      discount: 17,
    },
    {
      name: "Super Giant V Gaming Bundle Motherboard Including Processor",
      image: "/images/super.webp",
      oldPrice: 20000,
      newPrice: 13699,
      stock: "IN STOCK",
      discount: 32,
    },
    {
      name: "Super Giant V Gaming Bundle Motherboard Including Processor",
      image: "/images/super.webp",
      oldPrice: 20000,
      newPrice: 13699,
      stock: "IN STOCK",
      discount: 32,
    },
  ];
  return (
    <>
      <HomeBanner />
      <HomeCat />
      <section className="homeproducts">
        <div className="wholeProduct">
          <div className="container">
            <div className="row">
              {/* LEFT IMAGE */}
              <div className="col-md-4">
                <div className="banner">
                  <img
                    src="/images/anime.png"
                    alt="anime"
                    className="cursor img-fluid"
                  />
                </div>
                <div className="banner1">
                  <img
                    src="/images/anime2.png"
                    alt="anime"
                    className="cursor img-fluid"
                  />
                </div>
              </div>
              {/* RIGHT TEXT & SLIDER */}
              <div className="col-md-8">
                <div className="productRow">
                  <div className="info">
                    <h3 className="mb-2 hd">BEST SELLERS</h3>
                    <p className="text-dark text-sml mb-2">
                      DO NOT MISS THE CURRENT OFFERS
                    </p>
                    <Button className="viewallbtn">
                      VIEW ALL <FaLongArrowAltRight />
                    </Button>
                  </div>
                  {/* Swiper Slider */}
                  <Swiper
                    className="customSwiper"
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={4}
                    direction="horizontal"
                  >
                    {products.map((product, index) => (
                      <SwiperSlide key={index}>
                        <Link to="/product/1">
                          <ProductItem product={product} />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="info">
                    <h3 className="mb-2 hd">BRAND NEW PRODUCTS</h3>
                    <p className="text-dark text-sml mb-2">
                      NEW PRODUCTS WITH UPDATED STOCKS
                    </p>
                    <Button className="viewallbtn">
                      VIEW ALL <FaLongArrowAltRight />
                    </Button>
                  </div>
                  {/* Swiper Slider */}
                  <Swiper
                    className="customSwiper"
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={10}
                    slidesPerView={4}
                    direction="horizontal"
                  >
                    {brandNewProducts.map((product, index) => (
                      <SwiperSlide key={index}>
                        <Link to="/product/1">
                          <ProductItem product={product} />
                        </Link>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
              <div className="banner2">
                <img
                  src="/images/anime3.png"
                  alt="anime"
                  className="cursor img-fluid"
                />
                <NewItem />
              </div>
              <div className="banner3">
                <img
                  src="/images/discountdesktop.webp"
                  alt="desktop"
                  className="cursor img-fluid"
                />
                <img
                  src="/images/offerdesktop.webp"
                  alt="offer"
                  className="cursor img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="newsLetterSection mt-3 mb-3 d-flex align-items-center">
        <div className="wholeItems">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="text-white">
                  <LuIndianRupee />
                  20% discount on your first order
                </p>
                <h4 className="text-white">Join our Newsletter and get...</h4>
                <p className="text-light">
                  Join our email subscription now to get updates on
                  <br />
                  promotions and coupons.
                </p>
                <form>
                  <IoIosMail />
                  <input type="text" placeholder="Your Email Address" />
                  <Button>Subscribe</Button>
                </form>
              </div>
              <div className="new col-md-6">
                <p className="text-white text-center">
                  <FcCustomerSupport />
                  <br />
                  Expert Is Here to Help
                </p>
              </div>
              <div className="new1 col-md-6">
                <p className="text-white text-center">
                  Our Social Links
                  <br />
                  <FaFacebookSquare />
                  <FaSquareInstagram />
                  <IoLogoWhatsapp />
                  <FaYoutube />
                </p>
              </div>
              <div className="new2 col-md-6">
                <p className="text-white text-center">
                  Our Payment Gateway
                  <br />
                  <CiBank />
                  <FaPaypal />
                  <FaCcVisa />
                  <FaGooglePay />
                </p>
              </div>
              <div className="col-md-6">
                <img src="/images/fairy tail.jpg" alt="anime"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
