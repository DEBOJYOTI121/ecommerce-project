import logo from "../../assets/images/logo.png";
import { useContext, useEffect,useState } from "react";
import { MyContext } from "../../App";
import {MdEmail} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import  Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Login = () => {
  const [inputIndex, setInputIndex]=useState(null);
  const [isShowPassword,setisShowPassword]=useState(false);
  const context = useContext(MyContext);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
    return () => context.setIsHideSidebarAndHeader(false);
  }, [context]);
  const focusInput=(index)=>{
    setInputIndex(index);
  }
  return (
    <section className="loginSection">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="bg-video"
      >
      <source src="/videos/zenitsu.mp4" type="video/mp4" />
      </video>
      <div className="loginBox">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <h5 className="fw-bold text-white">Login to COMPUTER COMPONENTS</h5>
        <div className="wrapper mt-3 card border border-dark">
         <form>
          <div className={`form-group position-relative ${inputIndex === 0 ? 'focus' : ''}`}>
            <span className="icon"><MdEmail/></span>
            <input type='text' className='form-control' placeholder='enter your email' onFocus={()=>focusInput(0)}
            onBlur={()=>setInputIndex(null)} autoFocus/>
          </div>
          <div className={`form-group position-relative ${inputIndex === 1 ? 'focus' : ''}`}>
            <span className="icon"><RiLockPasswordFill/></span>
            <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='enter your password' onFocus={()=>focusInput(1)}
            onBlur={()=>setInputIndex(null)}/>
            <span className='toggleShowPassword' onClick={()=>setisShowPassword(!isShowPassword)}>
              {
                isShowPassword===true ? <IoMdEyeOff/> : <IoMdEye/>
              }
            </span>
            </div>
            <div className='form-group'>
              <Button className="btn-blue btn-lg w-100 btn-big">Sign In</Button>
             </div>
            <div className='form-group text-center mb-0'>
              <Link to={'/forgot-password'} className="link">FORGOT PASSWORD</Link>
              <div className='d-flex align-items-center justify-content-center or mt-3 mb-3'>
               <span className='line'></span>
               <span className='txt' style={{ color: 'white' }}>OR</span>
               <span className='line'></span>
              </div> 
              <Button variant="outlined" className='w-100 btn-lg btn-big loginWithGoogle'>
              <img src="/images/google.png" alt="google" className="Google"/>&nbsp; Sign in With Google
              </Button>
            </div> 
         </form>
        </div>
        <div className='wrapper mt-1 card border footer p-3'>
         <span className='text-center' style={{color:'white'}}>
          Don't have an account?
          <Link to={'/signup'} className='link color ml-2'>Register</Link>
         </span>
        </div>
      </div>
    </section>
  );
};
export default Login;
