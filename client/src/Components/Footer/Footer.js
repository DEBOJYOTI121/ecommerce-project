import { FiCpu } from "react-icons/fi";
import { LuIndianRupee } from "react-icons/lu";
import { GrDeliver } from "react-icons/gr";
import { RiDiscountPercentLine } from "react-icons/ri";
import { MdOutlinePriceChange } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaTwitter } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="topInfo">
          <div className="col">
            <span className="icon"><FiCpu /></span>
            <div className="text">Everyday Updated<br/>Products</div>
          </div>
          <div className="col">
            <span className="icon"><GrDeliver /></span>
            <div className="text">
              Free Delivery for every<br/>order above <LuIndianRupee />500
            </div>
          </div>
          <div className="col">
            <span className="icon"><RiDiscountPercentLine /></span>
            <div className="text">Daily Mega Discount</div>
          </div>
          <div className="col">
            <span className="icon"><MdOutlinePriceChange /></span>
            <div className="text">Best Price On The<br/>Market</div>
          </div>
          </div>
          <div className="row mt-4 linksWrap">
            <div className="col">
               <h5>ABOUT</h5>
               <ul>
                  <li><Link to="#">ABOUT US</Link></li>
                  <li><Link to="#">BANK DETAILS</Link></li>
                  <li><Link to="#">CONTACT US</Link></li>
                  <li><Link to="#">OUR PREFERENCE</Link></li>
               </ul>
            </div>
            <div className="col">
               <h5>INFORMATION</h5>
               <ul>
                  <li><Link to="#">OFFER ZONE</Link></li>
                  <li><Link to="#">BRANDS</Link></li>
                  <li><Link to="#">FAQ</Link></li>
                  <li><Link to="#">GIFT CARDS</Link></li>
               </ul>
            </div>
            <div className="col">
               <h5>ACCOUNT</h5>
               <ul>
                  <li><Link to="#">MY ACCOUNT</Link></li>
                  <li><Link to="#">ORDER HISTORY</Link></li>
                  <li><Link to="#">TRACK ORDER</Link></li>
                  <li><Link to="#">WISH LIST</Link></li>
               </ul>
            </div>
            <div className="col">
               <h5>POLICY</h5>
               <ul>
                  <li><Link to="#">PRIVACY POLICY</Link></li>
                  <li><Link to="#">REFUND POLICY</Link></li>
                  <li><Link to="#">SHIPPING POLICY</Link></li>
                  <li><Link to="#">TERMS AND CONDITIONS</Link></li>
               </ul>
            </div>
          </div>
          <div className="copyright mt-3 pt-3 pb-3 d-flex">
            <p className="mb-0">Copyright 2024.All rights reserved</p>
            <ul className="list list-inline ml-auto mb-0 socials">
             <li className="list-inline-item">
              <Link to="#"><FaTwitter/></Link>
             </li>
             <li className="list-inline-item">
              <Link to="#"><FaLine/></Link>
             </li>
             <li className="list-inline-item">
              <Link to="#"><FaFacebookMessenger/></Link>
             </li>
            </ul>
          </div>
           <div className="banner4">
           <img src="/images/location.jpg"
            alt="anime"></img>
          </div>
          <section className="location-link mt-0 mb-4 text-center" aria-label="Google Maps Location">
          <a
          href="https://maps.app.goo.gl/dkG77rcqp4neooRp6"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-location">
          📍 Find Us on Google Maps
          </a>
          </section>
          </div>
    </footer>
  );
};
export default Footer;
