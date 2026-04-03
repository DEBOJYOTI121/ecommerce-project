import { LuMenu } from "react-icons/lu";
import { CgMenuGridR } from "react-icons/cg";
import { PiDotsSixBold } from "react-icons/pi";
import { HiViewGrid } from "react-icons/hi";
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Sidebar from "../../Components/Sidebar/Sidebar";
import NewItem from "../../Components/NewItem/NewItem";
import Pagination from '@mui/material/Pagination';

const Listing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [productView, setProductView] = useState("four"); // default layout

  const openDropDown = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className="product_Listing_Page">
      <div className="container">
        <div className="productListing d-flex">
          <Sidebar />
          <div className="content_right">
            <img src="/images/naruto.jpeg" alt="naruto" className="anime3" />

            {/* View Switch Buttons */}
            <div className="showBy mt-3 mb-3 d-flex align-items-center">
              <div className="d-flex align-items-center btnWrapper">
                <Button className={productView==='one' && 'act'}onClick={() => setProductView("one")}>
                  <LuMenu />
                </Button>
                <Button className={productView==='two' && 'act'} onClick={() => setProductView("two")}>
                  <CgMenuGridR />
                </Button>
                <Button className={productView==='three' && 'act'} onClick={() => setProductView("three")}>
                  <PiDotsSixBold />
                </Button>
                <Button className={productView==='four' && 'act'} onClick={() => setProductView("four")}>
                  <HiViewGrid />
                </Button>
              </div>

              {/* Show per page dropdown */}
              <div className="ml-auto showByFilter">
                <Button onClick={handleClick}>
                  Show 9 <FaAngleDown />
                </Button>
                <Menu
                  className="w-100 showPerPageDropdown"
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openDropDown}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={handleClose}>10</MenuItem>
                  <MenuItem onClick={handleClose}>20</MenuItem>
                  <MenuItem onClick={handleClose}>30</MenuItem>
                  <MenuItem onClick={handleClose}>40</MenuItem>
                  <MenuItem onClick={handleClose}>50</MenuItem>
                  <MenuItem onClick={handleClose}>60</MenuItem>
                </Menu>
              </div>
            </div>
              <NewItem itemView={productView} />
              <div className='d-flex justify-content-center w-100'>
                <Pagination count={10} color="primary"/>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Listing;
