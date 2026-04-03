import React, { useEffect,useState } from "react";
import { Chart } from "react-google-charts";
import DashboardBox from "./components/dashboardBox";

// Icons
import { FaUserAstronaut, FaCartPlus, FaRupeeSign } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { GiStarsStack } from "react-icons/gi";
import { IoIosTimer } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";
import { FaEye, FaRegTrashAlt,} from "react-icons/fa";
import Checkbox from '@mui/material/Checkbox';

// Material UI
import { Button, Menu, MenuItem, FormControl, Select } from "@mui/material";
import Pagination from '@mui/material/Pagination';
import { Link } from "react-router-dom";
import { deleteData } from "../utils/api";
import { fetchDataFromApi } from "../utils/api";
import TextField from "@mui/material/TextField";
// -------------------- Dynamic Scatter Chart Helpers --------------------
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function getData() {
  return [
    ["Age", "Weight"], // header row (Google Charts needs this)
    ...Array.from({ length: 16 }, () => [getRandomNumber(), getRandomNumber()]),
  ];
}
export const scatterChartOptions = {
  title: "Company Performance (Dynamic)",
  legend: { position: "bottom" },
  animation: { duration: 1000, easing: "out" },
  vAxis: { viewWindow: { max: 100, min: 0 } },
  hAxis: { viewWindow: { max: 100, min: 0 } },
};
const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setShowBy] = useState("");
  const [selected, setSelected] = useState([]);
  const [showBysetCatBy, setCatBy] = useState("");
  const [showBysetBrandBy, setBrandBy] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [showBysetSearchBy, setSearchBy] = useState("");
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const [prodData, setProdData] = useState({
        productList: [],
        totalPages: 1,
        page: 1,
      });
  const ITEMS_PER_PAGE = 5;
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // -------------------- Dynamic Scatter Chart State --------------------
    const [chartData, setChartData] = useState(() => getData());
  const [year, setYear] = useState(2018);
  const loadProducts = async (page = 1) => {
    setIsLoading(true);
    const res = await fetchDataFromApi(`/api/products?page=${page}`);
    if (res) setProdData(res);
    setIsLoading(false);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    loadProducts();
       const id = setInterval(() => { 
    setChartData(getData()); 
     setYear((y) => (y < 2025 ? y + 1 : 2018)); }, 1000); 
     return () => clearInterval(id); },[]);
  
     const handlePageChange = async (event, value) => {
    setIsLoading(true);
    const res = await fetchDataFromApi(`/api/products?page=${value}`);
    if (res) setProdData(res);
    setIsLoading(false);
   };
  console.log("Chart data:", chartData);
  
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
  
    await deleteData(`/api/products/${id}`);
  
    setProdData((prev) => ({
      ...prev,
      productList: prev.productList.filter((p) => p._id !== id),
    }));
    };
    return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUserAstronaut />}
                grow={true}
              />
              <DashboardBox color={["#c012e2", "#eb64fe"]} icon={<FaCartPlus />} />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<RiShoppingBag4Fill />}
              />
              <DashboardBox color={["#e1950e", "#f3cd29"]} icon={<GiStarsStack />} />
            </div>
          </div>

          <div className="col-md-4 pl-0 topPart2">
            <div className="box graphBox">
              <div className="d-flex align-items-center w-100 bottomEle">
                <h5 className="text-white mb-0 mt-0">Total Sales</h5>
                <div className="ml-auto">
                  <Button className="ml-auto toggleIcon" onClick={handleClick}>
                    <HiDotsVertical />
                  </Button>

                  {/* Dropdown Menu */}
                  <Menu
                    className="dropdown_menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        sx: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      },
                      list: {
                        "aria-labelledby": "long-button",
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            {/* Amount Section */}
              <h3 className="text-white font-weight-bold">
                <FaRupeeSign /> 3,787,681.00
              </h3>
              <p className="text-white">
                <FaRupeeSign /> 3,787,681.00 in last month
              </p>

              {/* ✅ Chart + Year Display Wrapped Properly */}
               <>
                {Array.isArray(chartData) && chartData.length > 1 ? (
                  <Chart
                    chartType="ScatterChart"
                    width="100%"
                    height="200px"
                    data={chartData}
                    options={scatterChartOptions}
                  />
                ) : (
                  <div style={{ color: "#fff", textAlign: "center" }}>Loading chart...</div>
                )}
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    color: "#fff",
                    marginTop: "5px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                 >
                  Year: {year}
                </div>
              </>
            </div>
          </div>
        </div>
      {/* ✅ Best Selling Products Section */}
        <div className="newSection">  
        <div
          className="card shadow border-0 p-3 mt-3 "
          style={{ width: "1547px" }}
        >
          <h3 className="hd">Best Selling Products</h3>
          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy}
                  onChange={(e) => setShowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <h4>CATEGORY BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBysetCatBy}
                  onChange={(e) => setCatBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <h4>BRAND BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBysetBrandBy}
                  onChange={(e) => setBrandBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <h4>SEARCH BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBysetSearchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>id/name/category/brand</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
         <div className="d-flex gap-2 mb-1 mt-2">
                 <TextField
                   size="small"
                   placeholder="Search product..."
                   value={searchKey}
                   onChange={(e) => setSearchKey(e.target.value)}
                 />
                 <Button
                   onClick={() =>
                     fetchDataFromApi(`/api/products?keyword=${searchKey}&page=1`)
                       .then((res) => setProdData(res))
                   }
                   className="btn-blue btn-sml dbutton"
                 >
                   Search
                 </Button>
                 <Button
                 disableRipple
                 disableElevation
                 color="error"
                 disabled={selected.length === 0}
                 className={`btn-big btn-red ddelete${
                   selected.length > 0 ? "btn-red-active" : ""
                 }`}
                 onClick={async () => {
                   if (!window.confirm("Delete selected products?")) return;
         
                   await Promise.all(
                     selected.map((id) => deleteData(`/api/products/${id}`))
                   );
         
                   setProdData((prev) => ({
                     ...prev,
                     productList: prev.productList.filter(
                       (p) => !selected.includes(p._id)
                     ),
                   }));
         
                   setSelected([]);
                 }}
               >
                 Delete Selected
               </Button>
               </div>
          {/* ✅ Table Section */}
         <div className="table-responsive mt-3"> 
               <table className="table table-bordered v-align"> 
                 <thead className="thead-dark">
                   <tr> 
                     <th>UID</th> 
                     <th style={{width:'300px'}}>PRODUCT</th> 
                     <th>CATEGORY</th>
                     <th>SUB CATEGORY</th> 
                     <th>BRAND</th> 
                     <th>PRICE</th> 
                     <th>STOCK</th> 
                     <th>RATING</th> 
                     <th>ACTION</th> 
                     </tr>
                       </thead>
                       <tbody>
                         {isLoading ? (
                           <tr>
                             <td colSpan="8" className="text-center">
                               Loading products...
                             </td>
                           </tr>
                         ) : prodData.productList.length === 0 ? (
                           <tr>
                             <td colSpan="8" className="text-center">
                               No Products Found
                             </td>
                           </tr>
                         ) : (
                           prodData.productList.map((item, index) => (
                             <tr key={item._id}>
                               <td>
                                 #{(prodData.page - 1) * ITEMS_PER_PAGE + index + 1}
                                 <Checkbox
                                 checked={selected.includes(item._id)}
                                 onChange={(e) => {
                                   if (e.target.checked) {
                                     setSelected([...selected, item._id]);
                                   } else {
                                     setSelected(selected.filter((id) => id !== item._id));
                                   }
                                 }}
                               />
                               </td>
                               <td>
                                 <div className="d-flex align-items-center productBox">
                                   <div className="imgWrapper">
                                     <div className="img">
                                       <img
                                       src={
                                         item.images?.[0]
                                           ? item.images[0].startsWith("http")
                                             ? item.images[0]
                                             : `http://localhost:5000${item.images[0]}`
                                           : "/images/inno.webp"
                                       }
                                       alt={item.name}
                                       width="60"
                                       />
                                     </div>
                                   </div>
                                   <div className="info pl-0">
                                     <h6>{item.name}</h6>
                                     <p>{item.description}</p>
                                   </div>
                                 </div>
                               </td>
                                <td>{item.category?.name}</td>
                                <td>{item.subCategory}</td>
                                <td>{item.brand}</td>
         
                               <td className="text-center">
                               <div className="mx-auto" style={{ width: "150px" }}>
                                 {item.oldPrice > 0 && (
                                   <del className="old">₹{item.price}</del>
                                 )}
                                 <span className="new text-danger">
                                   ₹{item.oldPrice}
                                 </span>
                               </div>
                             </td>
         
                               <td>{item.countInStock}</td>
                               <td>{item.rating}</td>
         
                               <td>
                                 <div className="actions d-flex align-items-center">
                                   <Link to={`/product/details/${item._id}`}>
                                     <Button className="secondary " color="secondary">
                                       <FaEye />
                                     </Button>
                                   </Link>
                                   <Button
                                   className="error"
                                   color="error"
                                   onClick={() => deleteProduct(item._id)}
                                   >
                                   <FaRegTrashAlt />
                                   </Button>  
                                 </div>
                               </td>
                             </tr>
                           ))
                         )}
                       </tbody>
                       </table> 
                       <div className="d-flex tableFooter"> 
                       <p>showing <b>5</b> of <b>30</b> results</p> 
                       <Pagination
                       count={prodData.totalPages}
                       page={prodData.page}
                       onChange={handlePageChange}
                       color="primary"
                       size="small"
                       showFirstButton
                       showLastButton
                       />
                      </div> 
                     </div> 
                </div>
                </div>
              </div>
            </>
          );
        };
        export default Dashboard;
