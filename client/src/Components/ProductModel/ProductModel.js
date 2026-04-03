
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaIndianRupeeSign } from "react-icons/fa6";
import QuantityBox from '../QuantityBox/QuantityBox';
import { FaRegHeart } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { useContext } from 'react';
import { MyContext } from '../../App';
import ProductZoom from "../ProductZoom/ProductZoom";

const ProductModel = (props) => {
const context= useContext(MyContext);
return (
    <Dialog open={true} className="ProductModel" onClose={()=>context.setisOpenProductModel(false)} maxWidth="lg">
      <Button className="close_" onClick={()=>context.setisOpenProductModel(false)}>
        <IoMdClose />
      </Button>
      <h4 className="mb-2 font-weight-bold">Zotac RTX 5050 Twin Edge 8GB GDDR6 Graphics Card</h4>
      <div className="d-flex align-items-center">
        <div className="d-flex align-items-center mr-4">
          <span>Brands:</span>
          <span className="ml-2"><b>ZOTAC</b></span>
        </div>
        <Rating name="read-only" value={5} readOnly size="small" precision={0.5} />
      </div>
      <hr />
      <div className="row mt-2 productDetailModel">
        <div className="col-md-5">
          <ProductZoom/>
        </div>
        <div className="col-md-7">
          <div className='d-flex info1 align-items-center mb-4'>
            <span className='oldPrice lg mr-3'><FaIndianRupeeSign/>41450</span>
            <span className='netPrice text-danger lg'><FaIndianRupeeSign/>28450</span>
          </div>
          <span className="badge bg-success">IN STOCK</span>
          <p className='mt-2'>The ZOTAC GAMING GeForce RTX 5050 Twin Edge OC 
          is a compact graphics card powered by NVIDIA‘s cutting edge Blackwell 
          Architecture, DLSS4 and 8GB of GDDR6 memory.
          With a factory OC, the Twin Edge OC is ready to take on games with smooth framerates and performance.</p>
        <div className='d-flex align-items-center'>
          <QuantityBox/>
          <Button className='btn-blue btn-lg btn-big btn-round ml-3'>Add to Cart</Button>
        </div>
        <div className='d-flex align-items-center mt-5 actions'>
          <Button className='btn-round btn-sml' variant="outlined"><FaRegHeart/> &nbsp;
          ADD TO WISHLIST</Button>
          <Button className='btn-round btn-sml ml-3' variant="outlined"><MdCompareArrows/> &nbsp; 
          COMPARE</Button>
        </div>
        </div>
      </div>
    </Dialog>
  );
};
export default ProductModel;
