import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import CountryDropdown from '../CountryDropdown';
import Button from '@mui/material/Button';
import { FaUserPlus } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BsFillCartPlusFill } from "react-icons/bs";
import SearchBox from './SearchBox';
import Navigation from './Navigation';
const Header =()=>{
 return(
   <div className="headerWrapper"> 
   <div className="top-strip bg-yellow">
   <div class="scroll-container">
    <p class="scroll-text">
    This is my <span class="highlight">Computer Components</span> shop for New Generation
    </p>
    </div>
   </div>
   <header className="header">
      <div className="container">
      <div className="row">
       <div className="logoWrapper d-flex-align-items-center col-sm-2">
       <Link to="/">
       <img src={logo} alt="logo" style={{ marginLeft: '-220px', marginTop: '-20px' }} />
       </Link>
       </div>
       <div className='col-sm-10 d-flex align-items-center part2'>
        <CountryDropdown/>
          <SearchBox/>
        <div className="part3 d-flex align-items-center ml-auto">
          <Link to="/signIn">
          <Button className='circle ml-0'><FaUserPlus />
          </Button></Link>
          <div className='ml-auto cartTab d-flex align-items-center'>
            <Button className='priceButton'><FaIndianRupeeSign />
            <span className='price'>65698.00</span></Button>
            <div className='position-relative ml-2'>
             <Link to="/cart">
              <Button className='circle'><BsFillCartPlusFill /></Button></Link>
              <span className='count d-flex align-items-center justify-content-center'>5</span>
            </div>
          </div>
        </div>
      </div>
      </div>    
      </div>
   </header>
  <Navigation/>
   </div>
 )
}
export default Header;