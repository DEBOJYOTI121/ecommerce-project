// Header.js
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import Button from "@mui/material/Button";
import { MdMenuOpen, MdOutlineLightMode, MdOutlineMailOutline } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import { IoShieldHalfSharp } from "react-icons/io5";
import Logout from "@mui/icons-material/Logout";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useState, useContext } from "react";
import SearchBox from "../SearchBox/SearchBox";
import {MyContext} from '../../App';

const Header = () => {
  // Account dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const openAcc = Boolean(anchorEl);
  const handleOpenMyAccDrop = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMyAccDrop = () => setAnchorEl(null);
  const context=useContext(MyContext)
  // Notification dropdown
  const [anchorBell, setAnchorBell] = useState(null);
  const openBell = Boolean(anchorBell);
  const handleOpenBellDrop = (event) => setAnchorBell(event.currentTarget);
  const handleCloseBellDrop = () => setAnchorBell(null);

  // Sample notifications (replace with real data later)
  const notifications = [
    {
      user: "Debojyoti",
      avatar: "/images/zenitsu.jpg",
      action: "added to his favourite list",
      item: "GeForce rtx 5050 8gb GDDR5",
      time: "few seconds ago",
    },
    {
      user: "Debojyoti",
      avatar: "/images/zenitsu.jpg",
      action: "added to his favourite list",
      item: "GeForce rtx 5050 8gb GDDR5",
      time: "few seconds ago",
    },
    {
      user: "Debojyoti",
      avatar: "/images/zenitsu.jpg",
      action: "added to his favourite list",
      item: "GeForce rtx 5050 8gb GDDR5",
      time: "few seconds ago",
    },
    {
      user: "Debojyoti",
      avatar: "/images/zenitsu.jpg",
      action: "added to his favourite list",
      item: "GeForce rtx 5050 8gb GDDR5",
      time: "few seconds ago",
    },
  ];
  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row align-items-center w-100">
            {/* Logo */}
            <div className="col-sm-3 d-flex align-items-center part1">
              <Link to="/" className="d-flex align-items-center logo">
                <img src={logo} alt="logo" className="logo" />
                  <span className="ml-2">COMPUTER<br/>COMPONENTS</span>  
                </Link>
            </div>
             {context.windowWidth > 992 && (
                <div className="col-sm-3 d-flex align-items-center part2 pl-4">
                  <Button
                    className="rounded-circle mr-3"
                    onClick={() =>
                      context.setIsToggleSidebar(!context.isToggleSidebar)
                    }
                  >
                    <MdMenuOpen />
                  </Button>
                  <SearchBox />
                </div>
              )}
            {/* Right Section */}
            <div className="col d-flex align-items-center justify-content-end part3">
              <Button className="rounded-circle">
                <MdOutlineLightMode onClick={()=>context.setThemeMode(!context.themeMode)}/>
              </Button>
              {
                  context.windowWidth <= 992 && (
                    <Button
                      className="rounded-circle mr-3"
                      onClick={() => context.openNav()}
                    >
                      <IoMenu />
                    </Button>
                  )
                }
                {
                  context.windowWidth > 992 && (
                    <>
                      <Button className="rounded-circle ml-2">
                        <FaCartArrowDown />
                      </Button>
                      <Button className="rounded-circle ml-2">
                        <MdOutlineMailOutline />
                      </Button>
                    </>
                  )
                }
              {/* 🔔 Notification Dropdown */}
                <div className="notificationWrapper">
                  <Button
                    className="rounded-circle ml-2"
                    onClick={handleOpenBellDrop}
                    aria-controls={openBell ? "notification-menu" : undefined}
                    aria-haspopup="true"
                  >
                    <FaRegBell />
                  </Button>
                    <Menu
                    anchorEl={anchorBell}
                    id="notification-menu"
                    open={openBell}
                    onClose={handleCloseBellDrop}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    slotProps={{
                      className: "notif-paper",
                    }}
                    disableScrollLock
                  >
                    {/* Header */}
                    <Box className="notif-header">
                      <Typography variant="subtitle2">Orders ({notifications.length})</Typography>
                    </Box>

                    {/* Notifications list */}
                    <div className="notif-list">
                      {notifications.map((notif, index) => (
                        <div className="notif-item" key={index}>
                          <Avatar src={notif.avatar} alt={notif.user} />
                          <div className="notif-text">
                            <span>
                              <strong>{notif.user}</strong> {notif.action}{" "}
                              <strong>{notif.item}</strong>
                            </span>
                            <Typography className="notif-time">{notif.time}</Typography>
                          </div>
                        </div>
                      ))}
                    </div>
                     {/* Footer */}
                      <Box className="notif-footer">
                        <button className="view-all-btn w-100 mb-1">View All Notifications</button>
                      </Box>
                  </Menu>
                </div>
                <>
                  <Link to={'/login'}>
                    <Button className="btn-blue btn-lg btn-round">Sign In</Button>
                  </Link>
                
                  <div className="myAccWrapper ml-2">
                    <Button
                      className="myAcc d-flex align-items-center"
                      onClick={handleOpenMyAccDrop}
                    >
                      <div className="userImg">
                        <span className="rounded-circle">
                          <img src="/images/zenitsu.jpg" alt="ZENITSU" />
                        </span>
                      </div>
                     {context.windowWidth >992 && (
                      <div className="userInfo res-hide">
                        <h4>Debojyoti Mitra</h4>
                        <p className="mb-0">@debojyotimitra</p>
                      </div>
                     )}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={openAcc}
                      onClose={handleCloseMyAccDrop}
                      onClick={handleCloseMyAccDrop}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                      disableScrollLock
                    >
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <Avatar className="profileAvatar" fontSize="small" /> Profile
                      </MenuItem>
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <Avatar className="profileAvatar" fontSize="small" /> My account
                      </MenuItem>
                      <Divider className="divider" />
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                      </MenuItem>
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <ListItemIcon>
                          <IoShieldHalfSharp />
                        </ListItemIcon>
                        Reset My Password
                      </MenuItem>
                      <MenuItem onClick={handleCloseMyAccDrop}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </div>
                </>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
