import logo from "../../assets/images/logo.png";
import { useContext, useEffect,useState } from "react";
import { MyContext } from "../../App";
import {MdEmail} from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import {IoMdEye} from "react-icons/io";
import {IoMdEyeOff} from "react-icons/io";
import  Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const SignUp=()=>{
const [inputIndex, setInputIndex]=useState(null);
  const [isShowPassword,setisShowPassword]=useState(false);
  const [isShowConfirmPassword,setisShowConfirmPassword]=useState(false);
  const context = useContext(MyContext);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
    return () => context.setIsHideSidebarAndHeader(false);
  }, [context]);
  const focusInput=(index)=>{
    setInputIndex(index);
  }
  return (
    <section className="loginSection signUpSection">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="bg-video"
      >
      <source src="/videos/luffy.mp4" type="video/mp4" />
      </video>
      <div className='row'>
          <div className='col-md-8 pr-0'>
            <div className="loginBox">
            <div className="logo">
              <img src={logo} alt="logo" />
            </div>
            <h5 className="fw-bold text-white">Register to a New Account</h5>
            <div className="wrapper mt-3 card border border-dark">
            <form>
              <div className={`form-group position-relative ${inputIndex === 0 ? 'focus' : ''}`}>
                <span className="icon"><FaUser/></span>
                <input type='text' className='form-control' placeholder='enter your name' onFocus={()=>focusInput(0)}
                onBlur={()=>setInputIndex(null)} autoFocus/>
              </div>
              <div className={`form-group position-relative ${inputIndex === 1 ? 'focus' : ''}`}>
                <span className="icon"><MdEmail/></span>
                <input type='text' className='form-control' placeholder='enter your email' onFocus={()=>focusInput(1)}
                onBlur={()=>setInputIndex(null)}/>
              </div>
              <div className={`form-group position-relative ${inputIndex === 2 ? 'focus' : ''}`}>
                <span className="icon"><RiLockPasswordFill/></span>
                <input type={`${isShowPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='enter your password' onFocus={()=>focusInput(2)}
                onBlur={()=>setInputIndex(null)}/>
                <span className='toggleShowPassword' onClick={()=>setisShowPassword(!isShowPassword)}>
                  {
                    isShowPassword===true ? <IoMdEyeOff/> : <IoMdEye/>
                  }
                </span>
                </div>
                <div className={`form-group position-relative ${inputIndex === 3 ? 'focus' : ''}`}>
                <span className="icon"><IoShieldCheckmark/></span>
                <input type={`${isShowConfirmPassword===true ? 'text' : 'password'}`} className='form-control' placeholder='confirm your password' onFocus={()=>focusInput(3)}
                onBlur={()=>setInputIndex(null)}/>
                <span className='toggleShowPassword' onClick={()=>setisShowConfirmPassword(!isShowConfirmPassword)}>
                  {
                    isShowConfirmPassword===true ? <IoMdEyeOff/> : <IoMdEye/>
                  }
                </span>
                </div>
                <FormControlLabel control={<Checkbox sx={{
                color: "white", // unchecked color
                        "&.Mui-checked": {
                          color: "#0858f7", // checked color
                        },
                      }}
                    />
                  }
                  label="I agree to the all Terms & Conditions"
                  style={{ color: "white" }}
                />
                <div className='form-group'>
                  <Button className="btn-blue btn-lg w-100 btn-big">SIGN UP</Button>
                </div>
                <div className='form-group text-center mb-0'>
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
              <span className='text-center d-block mt-2' style={{color:'white'}}>
              Don't have an account?
              <Link to={'/login'} className='link color ml-2'>Sign In</Link>
              </span>
            </div>
         </div>
        </div>
      </div>
    </section>
  );
};
export default SignUp;