import React, { useContext, useEffect } from "react";
import { MyContext } from "../../App";
import logo from '../../assets/images/logo.png';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaTwitter } from "react-icons/fa";
import { FaLine } from "react-icons/fa";
import { FaFacebookMessenger } from "react-icons/fa";

const SignIn = () => {
  const { setisHeaderFooterShow } = useContext(MyContext);

  useEffect(() => {
     setisHeaderFooterShow(false);
  }, [setisHeaderFooterShow]);

  return (
    <section className="section signInPage">
      {/* White curve at the bottom */}
      <div className="shape-bottom">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="M0,224 C480,400 960,50 1440,224 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
      {/* Page content */}
      <div className="container">
       <div className="box card p-3 shadow border-0">
         <div className='newlogo text-center'>
          <img src={logo} alt="logo"/>
         </div>
         <h2>Sign in</h2>
         <form>
           <div classNmae="form-group">
            <TextField id='standard-basic' label="Email" type="email" required 
            variant="standard" className="w-100"/>
           </div>
           <div classNmae="form-group">
            <TextField id='standard-basic' label="Password" type="password" required 
            variant="standard" className="w-100"/>
           </div>
            <Link to="/forgot-password" className="border-effect cursor txt">
                Forgot Password?
            </Link>
            <div className="d-flex justify-content-center align-items-center mb-3 mt-3">
              <Button className="btn-blue btn-lg btn-big mx-2">
                Sign In
              </Button>

              <Link to="/">
                <Button
                  className="btn-lg btn-big mx-2"
                  variant="outlined"
                  onClick={() => setisHeaderFooterShow(true)}
                >
                  Cancel
                </Button>
              </Link>
            </div>
             <p className="mt-3 ml-3 txt">Not Registered? 
             <Link to="/signUp" className="border-effect">Sign Up</Link>
            </p>
            <h6 className="mt-4 text-center font-weight-bold">Or continue with Social Account</h6>
            <ul className="list list-inline mt-3 mr-3 socials text-center">
              <li className="list-inline-item">
              <Link to="#"><FaTwitter/></Link>
              </li>
              <li className="list-inline-item">
              <Link to="#"><FaLine/></Link>
              </li>
              <li className="list-inline-item">
              <Link to="#"><FaFacebookMessenger/></Link>
              </li>
              <span></span>
            </ul>
            <br/>
            <span className="cursor">
            <img src="/images/googleimage.png" alt="googleimage" className="w-100 mb-3"/></span>
           </form>
        </div>  
      </div>
    </section>
  );
};
export default SignIn;
