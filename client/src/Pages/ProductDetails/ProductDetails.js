import ProductZoom from "../../Components/ProductZoom/ProductZoom";
import Rating from '@mui/material/Rating';
import { FaIndianRupeeSign } from "react-icons/fa6";
import QuantityBox from "../../Components/QuantityBox/QuantityBox";
import Button from '@mui/material/Button';
import { TiShoppingCart } from "react-icons/ti";
import { useState } from "react";
import { RiDiscountPercentLine } from "react-icons/ri";
import Tooltip from '@mui/material/Tooltip';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa";
import ProductDescription from "../../Components/ProductDescription/ProductDescription";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import { Link } from "react-router-dom";

const ProductDetails =()=>{
   const [activeSize, setActiveSize]=useState(null);

   const handleActiveSize = (index) => {
        setActiveSize(index);
   }

  return(
       <>
         <section className="productdetails section">
          <div className="container">
            <div className="row">
              <div className="display1 col-md-4 pl-5">
                 <ProductZoom/>
              </div>
            <div className="col-md-7 pl-5 pr-5">
             <div className="display"> 
              <h4 className="hd text-capitalize">Zotac RTX 5050 Twin Edge 8GB GDDR6 Graphics Card</h4>
              <ul className="list list-inline d-flex align-items-center">
              <li className="list-inline-item">
             <div className="d-flex align-items-center">
                  <span className="text-dark mr-2">Brands:-</span>
                  <span>Zotac</span>
                </div>
              </li>
               <li className="list-inline-item">
                 <div className="d-flex align-items-center">
                 <Rating name="read-only" value={5} precision={0.5} readOnly size="small"/>
                 <span className="text-dark cursor ml-2">1 Review</span>
                 </div>
               </li>
              </ul>
               <div className='d-flex info'>
               <span className='oldPrice lg mr-3'><FaIndianRupeeSign/>41450</span>
               <span className='netPrice text-danger lg'><FaIndianRupeeSign/>28450</span>
              </div>
              <span className="badge badge-success">IN STOCK</span>
              <p className="mt-3">The ZOTAC GAMING GeForce RTX 5050 Twin Edge OC 
              is a compact graphics card powered by NVIDIA's cutting edge Blackwell 
              Architecture, DLSS4 and 8GB of GDDR6 memory.
              With a factory OC, the Twin Edge OC is ready to take on games with smooth framerates and 
              performance.</p>
            </div>
              <div className="d-flex align-items-cetner mt-3">
                <QuantityBox/>
                <Link to="/cart">
                <Button className="btn-blue btn-lg btn-big btn-round cart">
                <TiShoppingCart/>&nbsp; ADD TO CART</Button>
                </Link>
                <Tooltip title="Add to Wishlist" placement="top">
                 <Button className="btn-blue btn-lg btn-big btn-circle ml-4 heart">
                    <IoIosHeartEmpty/>
                  </Button>
                </Tooltip>
                <Tooltip title="Add to Compare" placement="top">
                 <Button className="btn-blue btn-lg btn-big btn-circle ml-4 compare">
                     <IoGitCompareOutline/>
                  </Button>
                </Tooltip>
                 <Tooltip title="Share" placement="top">
                 <Button className="btn-blue btn-lg btn-big btn-circle ml-4 compare">
                     <FaShareAlt/>
                  </Button>
                </Tooltip>
              </div>
              <div className='productSize d-flex align-items-center'>
                <span className="offer"><RiDiscountPercentLine/>OFFERS</span>
                  <ul className="list list-inline mb-0 pl-4">
                  <li>
                    <button 
                      className={activeSize === 0 ? "active" : ""} 
                      onClick={() => handleActiveSize(0)}
                     >
                      <span className="offer-title">Cashback</span>
                      <span className="offer-desc">Upto ₹1,062 cashback as Amazon Pay Balance</span>
                      <span className="offer-link">3 offers ›</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      className={activeSize === 1 ? "active" : ""} 
                      onClick={() => handleActiveSize(1)}
                    >
                      <span className="offer-title">Bank Offer</span>
                      <span className="offer-desc">Upto ₹50 discount on SBI,BOI,InsusLand Bank, 
                       Debit Cards</span>
                      <span className="offer-link">1 offer ›</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      className={activeSize === 2 ? "active" : ""} 
                      onClick={() => handleActiveSize(2)}
                    >
                      <span className="offer-title">No Cost EMI</span>
                      <span className="offer-desc">Upto ₹1,594 EMI interest savings on ICICI</span>
                      <span className="offer-link">2 offers ›</span>
                    </button>
                  </li>
                  <li>
                    <button 
                      className={activeSize === 3 ? "active" : ""} 
                      onClick={() => handleActiveSize(3)}
                    >
                      <span className="offer-title">Partner Offers</span>
                      <span className="offer-desc">Get GST invoice & save up to 28% on business purchases</span>
                      <span className="offer-link">1 offer ›</span>
                    </button>
                  </li>
                </ul>
              </div>
              </div>
            </div>
            <div>
              <ProductDescription/>
            </div>
            <br/>
            <RelatedProducts/>
            </div>   
         </section>
       </>
   )
}
export default ProductDetails;
