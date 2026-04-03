import React from "react";
import { styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdBrandingWatermark } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import { IoMdColorFill } from "react-icons/io";
import { BsTextareaResize } from "react-icons/bs";
import { RiPriceTagLine } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaCubesStacked } from "react-icons/fa6";
import { VscCodeReview } from "react-icons/vsc";
import { MdPublishedWithChanges } from "react-icons/md";
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";
import { FaReply } from "react-icons/fa6";
import { useRef } from "react";



const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
   return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,

    "& .MuiChip-icon": {
       color: "#000",
    },

    "&:hover, &:focus": {
      backgroundColor: "#c2c2c2ff",
    },

    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: "#f0f0f0",
    },
  };
});

const ProductDetails = () => {
   const productSliderBig = useRef();
   const productSliderSml = useRef();
  const productSliderOptions = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  const productSliderSmlOptions = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const goToSlide=(index)=>{
    productSliderBig.current.slickGoTo(index);
    productSliderSml.current.slickGoTo(index);
  }

  return (
    <div className="product right-content w-100 custom-width">
      {/* Header Section */}
      <div className="card shadow border-0 w-100 p-4 header-title-bar res-col">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <h5 className="page-title m-0">Product View</h5>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Products" component="a" href="#" />
            <StyledBreadcrumb label="Product View" />
          </Breadcrumbs>
        </div>
      </div>

      {/* Product Image Section */}
      <div className="card productDetailsSection mt-3 p-3">
         <div className="row">
          <div className="col-md-5">
            {/* Main Image Slider */}
            <div className="main-slider pt-1 pb-1 pl-2 pr-2">
              <h5 className="mb-4">Product Gallery</h5>
              <Slider {...productSliderOptions} ref={productSliderBig} className="sliderBig mb-2">
                <div className="item">
                  <img
                    src="/images/gaming-main.jpg"
                    alt="graphic card"
                    className="img-fluid rounded"
                    style={{ width: "529px", height: "auto" }}
                  />
                </div>
                <div className="item">
                  <img
                    src="/images/gaming-main1.jpg"
                    alt="graphic card"
                    className="img-fluid rounded"
                    style={{ width: "529px", height: "auto"}}
                  />
                </div>
                <div className="item">
                  <img
                    src="/images/gaming-main2.jpg"
                    alt="graphic card"
                    className="img-fluid rounded"
                    style={{ width: "529px", height: "auto"}}
                  />
                </div>
                <div className="item">
                  <img
                    src="/images/gaming-main3.jpg"
                    alt="graphic card"
                    className="img-fluid rounded"
                    style={{ width: "529px", height: "auto"}}
                  />
                </div>
                <div className="item">
                  <img
                    src="/images/gaming-main4.jpg"
                    alt="graphic card"
                    className="img-fluid rounded"
                    style={{ width: "529px", height: "auto"}}
                  />
                </div>
              </Slider>
            </div>

            {/* Thumbnail Slider */}
            <div className="thumb-slider mt-3">
              <Slider {...productSliderSmlOptions} ref={productSliderSml} className="sliderSml">
              <div className="thumb-item px-1 gap-0" onClick={()=>goToSlide(0)}>
                <img
                  src="/images/gaming-main.jpg"
                  alt="graphic card"
                  className="img-fluid rounded border"
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                    width: "90px"
                  }}
                />
              </div>
              <div className="thumb-item px-1 gap-0" onClick={()=>goToSlide(1)}>
                <img
                  src="/images/gaming-main1.jpg"
                  alt="graphic card"
                  className="img-fluid rounded border"
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                    width: "90px"
                  }}
                />
              </div>
              <div className="thumb-item px-1 gap-0" onClick={()=>goToSlide(2)}>
                <img
                  src="/images/gaming-main2.jpg"
                  alt="graphic card"
                  className="img-fluid rounded border"
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                    width: "90px"
                  }}
                />
              </div>
            <div className="thumb-item px-1 gap-0" onClick={()=>goToSlide(3)}>
                <img
                  src="/images/gaming-main3.jpg"
                  alt="graphic card"
                  className="img-fluid rounded border"
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                    width: "90px"
                  }}
                />
              </div>
              <div className="thumb-item px-1 gap-0" onClick={()=>goToSlide(4)}>
                <img
                  src="/images/gaming-main4.jpg"
                  alt="graphic card"
                  className="img-fluid rounded border"
                  style={{
                    cursor: "pointer",
                    transition: "0.3s",
                    width: "90px"
                  }}
                />
              </div>  
            </Slider>
          </div>
          </div>
        <div className="col-md-7">
          <div className="pt-1 pb-1 pl-2 pr-2">
           <h5 className="mb-3">Product Details</h5>
           <h3>Gigabyte RX 7600 Gaming OC 8GB Graphics Card</h3>
            <div className="productInfo mt-3">
              <div className="row">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><MdBrandingWatermark/></span>
                  <span className="name">Brand</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <span className="name">Gigabyte</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><BiSolidCategory /></span>
                  <span className="name">Category</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <span className="name">Graphic Card</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><IoMdPricetags/></span>
                  <span className="name">Tags</span>
                </div>

                <div className="col-sm-7 d-flex align-items-start">
                  <span className="colon">:</span>

                  <ul class="tags">
                  <li><span class="tag-item">RX-7600</span></li>
                  <li><span class="tag-item">Radeon-GPU</span></li>
                  <li><span class="tag-item">Triple-Fan-GPU</span></li>
                  <li><span class="tag-item">8GB-Graphic</span></li>
                </ul>
              </div>
              </div>  
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><IoMdColorFill/></span>
                  <span className="name">Color</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <span className="name">Black</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><BsTextareaResize/></span>
                  <span className="name">Size</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <span className="name">Large</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><RiPriceTagLine/></span>
                  <span className="name">Price</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <h2 class="special-price"><FaIndianRupeeSign/>24,110</h2>
                  <span
                    className="discount-percentage"
                    id="discount-percentage-sec-floating-widget"
                    style={{}}
                  >(74% off)</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><FaCubesStacked/></span>
                  <span className="name">Stock</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <span className="name">IN STOCK</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><VscCodeReview/></span>
                  <span className="name">Review</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <span className="name">(28)Review</span>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-sm-3 d-flex align-items-center">
                  <span className="icon"><MdPublishedWithChanges /></span>
                  <span className="name">Published</span>
                </div>
                <div className="col-sm-7">
                  <span className="colon">:</span>
                  <span className="name">10th Jan 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
        <h4 className="mt-4">Product Description</h4>
        <div className="mt-3 product-description">
        <p><strong style={{ fontSize: "18px" }}>Features:</strong></p>
          <ul>
          <li>Powered by Radeon RX 7600</li>
          <li>Integrated with 8GB GDDR6 128-bit memory interface</li>
          <li>WINDFORCE cooling system</li>
          <li>RGB Fusion</li>
          <li>Protection metal back plate</li>
        </ul>

        <p><strong>CORE CLOCK</strong></p>
        <p>
          Boost Clock*: up to 2755 MHz (Reference card: 2655 MHz)<br />
          Game Clock*: up to 2355 MHz (Reference card: 2250 MHz)
        </p>

        <p><strong>WINDFORCE COOLING SYSTEM</strong></p>
        <p>
          The WINDFORCE cooling system features three 80mm unique blade fans,
          alternate spinning, 5 composite copper heat pipes directly touching the GPU,
          3D active fan and Screen Cooling for efficient heat dissipation.
        </p>

        <p><strong>ALTERNATE SPINNING</strong></p>
        <p>Reduce the turbulence of adjacent fans and increase airflow pressure.</p>

        <p><strong>3D ACTIVE FAN</strong></p>
        <p>
          The 3D Active Fan provides semi-passive cooling — the fans stay off during
          low load or low power gaming.
        </p>

        <p><strong>UNIQUE BLADE FAN</strong></p>
        <p>
          The airflow is split by the triangular fan edge and smoothly guided through
          the 3D stripe curve on the fan surface.
        </p>

        <p><strong>HEAT PIPES DIRECT TOUCH</strong></p>
        <p>
          Pure copper heat pipes maximize contact with the GPU. The heat pipe also cools
          the VRAM using a large metal plate.
        </p>

        <p><strong>SCREEN COOLING</strong></p>
        <p>Extended heatsink allows air to pass through for better heat dissipation.</p>
      </div>
     <h6 className="mt-4 mb-4">Rating Analytics</h6>
       <div className="ratingSection">
            <div className="ratingrow d-flex align-items-center">
              <span className="col1">
                5 Star
              </span>
              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{width:'70%'}}></div>
                </div>
              </div>
              <span className="col3">
                (22)
              </span>
            </div>
            <div className="ratingrow d-flex align-items-center">
              <span className="col1">
                4 Star
              </span>
              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{width:'40%'}}></div>
                </div>
              </div>
              <span className="col3">
                (10)
              </span>
            </div>
            <div className="ratingrow d-flex align-items-center">
              <span className="col1">
                3 Star
              </span>
              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{width:'30%'}}></div>
                </div>
              </div>
              <span className="col3">
                (5)
              </span>
            </div>
            <div className="ratingrow d-flex align-items-center">
              <span className="col1">
                2 Star
              </span>
              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{width:'15%'}}></div>
                </div>
              </div>
              <span className="col3">
                (4)
              </span>
            </div>
            <div className="ratingrow d-flex align-items-center">
              <span className="col1">
                1 Star
              </span>
              <div className="col2">
                <div className="progress">
                  <div className="progress-bar" style={{width:'10%'}}></div>
                </div>
              </div>
              <span className="col3">
                (2)
              </span>
            </div>
          </div>
          <br/>
          <h6 className="mt-4 mb-4">Customer Reviews</h6>
      <div className="reviewSection">
        <div className="reviewsRow">
          <div className="reviewTop d-flex justify-content-between align-items-start">

          <div className="leftInfo d-flex">
            <img src="/images/zenitsu.jpg" alt="ZENITSU" className="reviewImg rounded-circle" />
          <div className="reviewinfo pl-3 d-flex flex-column">
            <h5>Debojyoti Mitra</h5>
            <span>25 minutes ago!</span>
            <Rating className="ratingStars" name="read-only" value={4.5} precision={1.5} readOnly />
          </div>
          </div>

          <Button className="btn-blue btn-lg reviewBtn">Reply<FaReply/></Button>
        </div>
        <p className="reviewLine">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      </div>
      <div className="reviewSection reply">
        <div className="reviewsRow">
          <div className="reviewTop d-flex justify-content-between align-items-start">

          <div className="leftInfo d-flex">
            <img src="/images/zenitsu.jpg" alt="ZENITSU" className="reviewImg rounded-circle" />
          <div className="reviewinfo pl-3 d-flex flex-column">
            <h5>Debojyoti Mitra</h5>
            <span>25 minutes ago!</span>
            <Rating className="ratingStars" name="read-only" value={4.5} precision={1.5} readOnly />
          </div>
          </div>

          <Button className="btn-blue btn-lg reviewBtn">Reply<FaReply/></Button>
        </div>
        <p className="reviewLine">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      </div>
      <div className="reviewSection reply">
        <div className="reviewsRow">
          <div className="reviewTop d-flex justify-content-between align-items-start">

          <div className="leftInfo d-flex">
            <img src="/images/zenitsu.jpg" alt="ZENITSU" className="reviewImg rounded-circle" />
          <div className="reviewinfo pl-3 d-flex flex-column">
            <h5>Debojyoti Mitra</h5>
            <span>25 minutes ago!</span>
            <Rating className="ratingStars" name="read-only" value={4.5} precision={1.5} readOnly />
          </div>
          </div>

          <Button className="btn-blue btn-lg reviewBtn">Reply<FaReply/></Button>
        </div>
        <p className="reviewLine">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      </div>
      <div className="reviewSection">
        <div className="reviewsRow">
          <div className="reviewTop d-flex justify-content-between align-items-start">

          <div className="leftInfo d-flex">
            <img src="/images/zenitsu.jpg" alt="ZENITSU" className="reviewImg rounded-circle" />
          <div className="reviewinfo pl-3 d-flex flex-column">
            <h5>Debojyoti Mitra</h5>
            <span>25 minutes ago!</span>
            <Rating className="ratingStars" name="read-only" value={4.5} precision={1.5} readOnly />
          </div>
          </div>

          <Button className="btn-blue btn-lg reviewBtn">Reply<FaReply/></Button>
        </div>
        <p className="reviewLine">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>
      </div>
      <br/>
      <h6 className="mt-4 mb-4">Review Reply From</h6>
      <form className="reviewForm">
        <textarea placeholder="WRITE HERE">
        </textarea>
        <Button className="btn-blue btn-big btn-lg w-100 mt-4">DROP YOUR REPLIES</Button>
      </form>
     </div>
    </div>
  );
};
export default ProductDetails;
