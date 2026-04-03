import Rating from '@mui/material/Rating';
import { FaIndianRupeeSign } from "react-icons/fa6";
import Button from "@mui/material/Button";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoIosHeartEmpty } from "react-icons/io";
import { useContext} from 'react';
import { MyContext } from '../../App';

const ProductItem = ({ product }) => {
  const context=useContext(MyContext);
  const viewProductDetails=(id)=>{
     context.setisOpenProductModel(true);
  }
  
  return (
    <>
    <div className="productBox">
      <img src={product.image} alt={product.name} className="img-fluid" />
      {product.discount > 0 && (
        <span className="badge badge-primary">-{product.discount}%</span>
      )}
      <div className="actions">
        <Button onClick={()=>viewProductDetails(1)}><SlSizeFullscreen/></Button>
        <Button><IoIosHeartEmpty/></Button>
      </div>
      <h4 className="mt-3">{product.name}</h4>
      <span
        className={
          product.stock === "IN STOCK"
            ? "text-success"
            : product.stock === "OUT OF STOCK"
            ? "text-danger"
            : "text-warning"
        }
      >
      {product.stock}
      </span>
      <Rating name="read-only" value={5} readOnly size="small" precision={0.5} />
      <div className="d-flex">
        <span className="oldPrice mt-2">
          <FaIndianRupeeSign />
          {product.oldPrice}
        </span>
        <span className="netPrice text-danger ml-2 mt-2">
          <FaIndianRupeeSign />
          {product.newPrice}
        </span>
      </div>
    </div>
   
  </>
  );
};
export default ProductItem;
 