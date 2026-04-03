import { Link } from "react-router-dom";
import Rating from '@mui/material/Rating';
import { LuIndianRupee } from "react-icons/lu";
import Button from '@mui/material/Button';
import { MdDeleteForever } from "react-icons/md";
import QuantityBox from "../../Components/QuantityBox/QuantityBox";
import { FaCartArrowDown } from "react-icons/fa";
const Cart=()=>{
   return(
       <>
        <section className="section cartPage">
         <div className="wholeitem">
          <div className="container">
            <h2 className="hd">Your Cart</h2>
            <p>There are <b className='text-red'>5</b> Products in Your Cart</p>
           <div className="row">
              <div className="col-md-9">
                 <div className="table-responsive cartPage">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <Link to="/product/1">
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img src="images/monitor1.webp" alt="product" className="w-100" />
                              </div>
                              <div className="info px-3">
                                <h6>Gigabyte GS27QA 27 Inch Gaming Monitor</h6>
                                <Rating 
                                  name="read-only" 
                                  value={4.5} 
                                  readOnly 
                                  precision={0.5} 
                                  size="small" 
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td><LuIndianRupee />15140</td>
                        <td>
                          <QuantityBox/>
                        </td>
                        <td className="fw-bold text-success"><LuIndianRupee />15140</td>
                        <td><span className="remove"><MdDeleteForever /></span></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>
                          <Link to="/product/1">
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img src="images/amd5.jpg" alt="product" className="w-100" />
                              </div>
                              <div className="info px-3">
                                <h6>AMD Ryzen 5 9600X Processor with Radeon Graphics</h6>
                                <Rating 
                                  name="read-only" 
                                  value={4.5} 
                                  readOnly 
                                  precision={0.5} 
                                  size="small" 
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td><LuIndianRupee />21800</td>
                        <td>
                          <QuantityBox/>
                        </td>
                        <td className="fw-bold text-success"><LuIndianRupee />21800</td>
                        <td><span className="remove"><MdDeleteForever /></span></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>
                          <Link to="/product/1">
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img src="images/sandisk.jpg" alt="product" className="w-100" />
                              </div>
                              <div className="info px-3">
                                <h6>SanDisk E30 1TB Portable SSD</h6>
                                <Rating 
                                  name="read-only" 
                                  value={4.5} 
                                  readOnly 
                                  precision={0.5} 
                                  size="small" 
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td><LuIndianRupee />6939</td>
                        <td>
                          <QuantityBox/>
                        </td>
                        <td className="fw-bold text-success"><LuIndianRupee />6939</td>
                        <td><span className="remove"><MdDeleteForever /></span></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>
                          <Link to="/product/1">
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img src="images/chair.webp" alt="product" className="w-100" />
                              </div>
                              <div className="info px-3">
                                <h6>Ant Esports 9077 Ergonomic Black and Red Gaming Chair</h6>
                                <Rating 
                                  name="read-only" 
                                  value={4.5} 
                                  readOnly 
                                  precision={0.5} 
                                  size="small" 
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td><LuIndianRupee />11140</td>
                        <td>
                          <QuantityBox/>
                        </td>
                        <td className="fw-bold text-success"><LuIndianRupee />11140</td>
                        <td><span className="remove"><MdDeleteForever /></span></td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr>
                        <td>
                          <Link to="/product/1">
                            <div className="d-flex align-items-center cartItemimgWrapper">
                              <div className="imgWrapper">
                                <img src="images/benq.jpg" alt="product" className="w-100" />
                              </div>
                              <div className="info px-3">
                                <h6>BenQ GW2490T 24 Inch Professional Monitor (Black)</h6>
                                <Rating 
                                  name="read-only" 
                                  value={4.5} 
                                  readOnly 
                                  precision={0.5} 
                                  size="small" 
                                />
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td><LuIndianRupee />10679</td>
                        <td>
                          <QuantityBox/>
                        </td>
                        <td className="fw-bold text-success"><LuIndianRupee />10679</td>
                        <td><span className="remove"><MdDeleteForever /></span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              <div className="col-md-3">
                <div className="card border p-3 cardDetails">
                  <h4>CART TOTALS</h4>
                <div className="d-flex align-items-center mb-3">
                   <span>Subtotal</span>
                   <span className="ml-auto text-red font-weight-bold"><LuIndianRupee/>65698</span>
                </div>
                <div className="d-flex align-items-center mb-3">
                   <span>Shipping</span>
                   <span className="ml-auto"><b>Free</b></span>
                </div>
                <div className="d-flex align-items-center mb-3">
                   <span>Estimate for</span>
                   <span className="ml-auto"><b>SONARPUR</b></span>
                </div>
                <div className="d-flex align-items-center">
                   <span>Total</span>
                   <span className="ml-auto text-red"><LuIndianRupee/>65698</span>
                </div>
                <br/>
                <Button className='btn-blue bg-red btn-lg btn-big mr-4'><FaCartArrowDown />
                Add to Cart</Button>
                </div>
             </div>
            </div>
          </div>
        </div>
        </section>
       </>   
   )
}
export default Cart;