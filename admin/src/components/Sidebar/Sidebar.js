import Button from '@mui/material/Button';
import { MdSpaceDashboard } from "react-icons/md";
import { FaAngleRight, FaProductHunt } from "react-icons/fa6";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineMessage, MdOutlineNotificationsActive } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import useContext from 'react';
import { IoMdLogOut } from "react-icons/io";
// import {MyContext} from '../../App';

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(null);  // track active tab
  const [openSubmenu, setOpenSubmenu] = useState(null); // track open submenu
  const handleTabClick = (index) => {
  setActiveTab(index);
  setOpenSubmenu(openSubmenu === index ? null : index);
  };
  return(
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 0 ? 'active' : ''}`}
                onClick={() => handleTabClick(0)}
              >
                <span className="icon"><MdSpaceDashboard/></span>
                Dashboard
                <span className="arrow"><FaAngleRight/></span>
              </Button>
            </Link>
          </li>

          {/* Products with submenu */}
          {/* ===== MENU 1 ===== */}
            <li>
              <Button
                className={`w-100 ${activeTab === 1 && openSubmenu === 1 ? 'active' : ''}`}
                onClick={() => handleTabClick(1)}
              >
                <span className="icon"><FaProductHunt /></span>
                Products
                <span className={`arrow ${openSubmenu === 1 ? 'rotate' : ''}`}>
                  <FaAngleRight />
                </span>
              </Button>

              <div className={`submenuWrapper ${openSubmenu === 1 ? 'colapse' : 'colapsed'}`}>
                <ul className="submenu">
                  <li><Link to="/product/productlist">Product List</Link></li>
                  <li><Link to="/product/details">Product View</Link></li>
                  <li><Link to="/product/upload">Product Upload</Link></li>
                </ul>
              </div>
            </li>

            {/* ===== MENU 2 ===== */}
            <li>
              <Button
                className={`w-100 ${activeTab === 2 && openSubmenu === 2 ? 'active' : ''}`}
                onClick={() => handleTabClick(2)}
              >
                <span className="icon"><FaProductHunt /></span>
                Category
                <span className={`arrow ${openSubmenu === 2 ? 'rotate' : ''}`}>
                  <FaAngleRight />
                </span>
              </Button>

              <div className={`submenuWrapper ${openSubmenu === 2 ? 'colapse' : 'colapsed'}`}>
                <ul className="submenu">
                  <li><Link to="/category">Category List</Link></li>
                  <li><Link to="/category/add">Add a Category</Link></li>
                  <li><Link to="/category/edit/:id">Category Edit</Link></li>
                </ul>
              </div>
            </li>

          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 2 ? 'active' : ''}`}
                onClick={() => handleTabClick(2)}
              >
                <span className="icon"><BsCartPlus /></span>
                Orders
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
         <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 3 ? 'active' : ''}`}
                onClick={() => handleTabClick(3)}
              >
                <span className="icon"><MdOutlineMessage /></span>
                Message
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
           <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 4 ? 'active' : ''}`}
                onClick={() => handleTabClick(4)}
              >
                <span className="icon"><MdOutlineNotificationsActive /></span>
                Notification
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
           <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 5 ? 'active' : ''}`}
                onClick={() => handleTabClick(5)}
              >
                <span className="icon"><IoSettingsSharp /></span>
                Setting
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 6 ? 'active' : ''}`}
                onClick={() => handleTabClick(6)}
              >
                <span className="icon"><MdOutlineNotificationsActive /></span>
                Notification
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
           <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 7 ? 'active' : ''}`}
                onClick={() => handleTabClick(7)}
              >
                <span className="icon"><IoSettingsSharp /></span>
                Setting
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 8 ? 'active' : ''}`}
                onClick={() => handleTabClick(8)}
              >
                <span className="icon"><MdOutlineNotificationsActive /></span>
                Notification
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
           <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 9 ? 'active' : ''}`}
                onClick={() => handleTabClick(9)}
              >
                <span className="icon"><IoSettingsSharp /></span>
                Setting
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 10 ? 'active' : ''}`}
                onClick={() => handleTabClick(10)}
              >
                <span className="icon"><MdOutlineNotificationsActive /></span>
                Notification
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 11 ? 'active' : ''}`}
                onClick={() => handleTabClick(11)}
              >
                <span className="icon"><IoSettingsSharp /></span>
                Setting
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 12 ? 'active' : ''}`}
                onClick={() => handleTabClick(12)}
              >
                <span className="icon"><MdOutlineNotificationsActive /></span>
                Notification
                <span className="arrow"><FaAngleRight /></span>
              </Button>
            </Link>
          </li>
          <br />
            <div className="logoutWrapper">
            <div className="logoutBox">
               <Button variant="contained" className="logoutBtn">
                  <IoMdLogOut/>LogOut
               </Button>
            </div>
            </div>
        </ul>
      </div>
    </>
  );
};
export default Sidebar;
