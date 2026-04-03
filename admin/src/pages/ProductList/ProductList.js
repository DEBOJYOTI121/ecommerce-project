import React, { useEffect, useState, useRef } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Chip from "@mui/material/Chip"; 
import HomeIcon from "@mui/icons-material/Home"; 
import { styled } from "@mui/material/styles"; 
import { Link } from "react-router-dom"; 
import { Chart } from "react-google-charts"; 
import DashboardBox from "./components/dashboardBox"; 
// Icons 
import  { FaUserAstronaut, FaCartPlus, FaRupeeSign, FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";  
import { RiShoppingBag4Fill } from "react-icons/ri"; 
import { GiStarsStack } from "react-icons/gi"; 
import { IoIosTimer } from "react-icons/io"; 
import { HiDotsVertical } from "react-icons/hi";  
// MUI 
import { Button, Menu, MenuItem,FormControl, Select} from "@mui/material"; 
import Pagination from "@mui/material/Pagination"; 
import { fetchDataFromApi } from "../utils/api";
import { deleteData } from "../utils/api";
import { editData } from "../utils/api";
import Checkbox from '@mui/material/Checkbox';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

/* ---------------- Scatter Chart Helpers ---------------- */ 
const getRandomNumber = () => Math.floor(Math.random() * 100) + 1; 
const getData = () => [ ["Age", "Weight"], ...Array.from({ length: 16 }, () => [getRandomNumber(), getRandomNumber()]), ]; 
const scatterChartOptions = 
{ 
  title: "Company Performance (Dynamic)", 
  legend: { position: "bottom" }, 
  animation: { duration: 1000, easing: "out" }, 
  vAxis: { viewWindow: { max: 100, min: 0 } }, 
  hAxis: { viewWindow: { max: 100, min: 0 } }, 
}; 
  /* ---------------- Styled Breadcrumb ---------------- */ 
  const StyledBreadcrumb = styled(Chip)(({ theme }) => 
    ({ backgroundColor: theme.palette.mode === "light" ? theme.palette.grey[100] : 
      theme.palette.grey[800], height: theme.spacing(3), color: 
      theme.palette.text.primary, fontWeight: 
      theme.typography.fontWeightRegular, "& .MuiChip-icon": { color: "#000" }, "&:hover, &:focus": 
      { backgroundColor: "#c2c2c2ff" }, })); 
      /* ===================== COMPONENT ===================== */
   const ProductList = () => { 
    const [anchorEl, setAnchorEl] = useState(null);
    const [showBy, setShowBy] = useState(""); 
    const [showBysetCatBy, setCatBy] = useState(""); 
    const [showBysetBrandBy, setBrandBy] = useState(""); 
    const [showBysetSearchBy, setSearchBy] = useState("");
    const [searchKey, setSearchKey] = useState(""); 
    const [selected, setSelected] = useState([]); 
    const [chartData, setChartData] = useState(getData()); 
    const [year, setYear] = useState(2018); 
    const sliderStartX = useRef(0); 
    const menuOpen = Boolean(anchorEl); 
    const ITEM_HEIGHT = 48; 
    const handleClick = (event) => { 
     setAnchorEl(event.currentTarget); 
     };
    const handleClose = () => {
      setAnchorEl(null);   // closes Menu
      setEditId(null);
    };
    const [prodData, setProdData] = useState({
      productList: [],
      totalPages: 1,
      page: 1,
    });
const ITEMS_PER_PAGE = 5;
const [isLoading, setIsLoading] = useState(false);

const loadProducts = async (page = 1) => {
  setIsLoading(true);
  const res = await fetchDataFromApi(`/api/products?page=${page}`);
  if (res) setProdData(res);
  setIsLoading(false);
};
// Dialog
const handleEditClose = () => {
  setOpenEdit(false);
  setEditId(null);
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
const [openEdit, setOpenEdit] = useState(false);
const [editId, setEditId] = useState(null);
const [editLoading, setEditLoading] = useState(false);
const [editFields, setEditFields] = useState({
  name: "",
  price: "",
  oldPrice: "",
  brand: "",
  countInStock: "",
  subCategory: "",
  rating:"",
  images:""
});
const openEditProduct = async (id) => {
  setOpenEdit(true);
  setEditId(id);

  const res = await fetchDataFromApi(`/api/products/${id}`);
  if (res) {
    setEditFields({
      name: res.name || "",
      price: res.price || "",
      oldPrice: res.oldPrice || "",
      brand: res.brand || "",
      countInStock: res.countInStock || "",
      rating:res.rating || "",
      subCategory:res.subCategory || "",
      images:res.images || ""
    });
  }
};
const updateProduct = async (e) => {
  e.preventDefault();
  setEditLoading(true);

  await editData(`/api/products/${editId}`, editFields);

  // update UI instantly
  setProdData((prev) => ({
    ...prev,
    productList: prev.productList.map((item) =>
      item._id === editId ? { ...item, ...editFields } : item
    ),
  }));

  setEditLoading(false);
  setOpenEdit(false);
};

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
    {/* ================= DASHBOARD ================= */} 
    <div className="right-content w-100"> 
    <div className="row dashboardBoxWrapperRow"> 
    <div className="col-md-8"> 
    <div className="dashboardBoxWrapper d-flex"> 
      <DashboardBox color={["#1da256", "#48d483"]} 
      icon={<FaUserAstronaut />} grow /> 
      <DashboardBox color={["#c012e2", "#eb64fe"]} 
      icon={<FaCartPlus />} /> 
      <DashboardBox color={["#2c78e5", "#60aff5"]} 
      icon={<RiShoppingBag4Fill />} /> 
      <DashboardBox color={["#e1950e", "#f3cd29"]} 
      icon={<GiStarsStack />} /> 
      </div> 
      </div> 
      {/* ================= GRAPH ================= */} 
      <div className="col-md-4 pl-0 topPart2"> 
      <div className="box graphBox"> 
      <div className="d-flex align-items-center"> 
      <h5 className="text-white mb-0">Total Sales</h5> 
        <Button className="ml-auto toggleIcon" onClick={handleClick}> 
        <HiDotsVertical/> </Button> 
      </div> 
        <Menu className="dropdown_menu" 
        anchorEl={anchorEl} 
        open={menuOpen} 
        onClose={handleClose} 
        slotProps={{ paper: { sx: { maxHeight: ITEM_HEIGHT * 4.5, width: "20ch", }, }, 
        list: { "aria-labelledby": "long-button", }, }} > 
        <MenuItem 
          onClick={handleClose}>
        <IoIosTimer/>Last Day</MenuItem> 
        <MenuItem onClick={handleClose}> 
        <IoIosTimer />Last Week</MenuItem> 
        <MenuItem onClick={handleClose}> 
        <IoIosTimer /> Last Month </MenuItem> 
        <MenuItem onClick={handleClose}>
        <IoIosTimer /> Last Year </MenuItem>
        </Menu> 
        <h3 className="text-white">
          <FaRupeeSign/>3,787,681.00 </h3> 
          <Chart 
            chartType="ScatterChart" width="100%" height="200px" 
            data={chartData} options={scatterChartOptions} /> 
          <div className="text-center text-white fw-bold mt-1"> 
            Year: {year} 
            </div> 
            </div>
            </div>
            </div> 
          {/* ================= PRODUCT LIST ================= */}
          <div className="product right-content w-100 newcustom-width"> 
          <div className="card shadow border-0 p-4 header-title-bar">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5 className="page-title m-0">Product List</h5>
            <Breadcrumbs> 
            <StyledBreadcrumb label="Dashboard" icon={<HomeIcon fontSize="small" />} /> 
            <StyledBreadcrumb label="Product Upload" /> 
            </Breadcrumbs> 
            </div>
            </div> 
            </div>
          {/* ================= SLIDER ================= */}
          <div className="productSlider" 
            onTouchStart={(e) => 
              (sliderStartX.current = e.touches[0].clientX)} onTouchEnd={(e) => 
                { const diff = e.changedTouches[0].clientX - sliderStartX.current; 
                  const track = document.querySelector(".sliderTrack"); 
                  if (!track) return; 
                  track.style.transform = diff > 50 ? "translateX(50px)" 
                  : diff < -50 ? "translateX(-50px)" 
                  : "translateX(0)"; }} > 
                <div className="sliderTrack"> 
              {[...Array(12)].map((_, i) => 
                  ( <Link key={i} to="/product/details" 
                  className="slide"> 
                    <img src="/images/inno.webp" 
                    alt="product" /> 
                    </Link> ))} 
                    </div> 
                  </div> 
          {/* ================= TABLE ================= */} 
          <div className="newSection"> 
            <div className="card shadow border-0 p-3 mt-3 list" style={{ width: "1560px" }}> 
            <h3 className="hd">Best Selling Products</h3> 
            <div className="row cardFilters mt-3"> 
              <div className="col-md-3">
              <h4>SHOW BY</h4> 
              <FormControl size="small" className="w-100"> 
              <Select value={showBy} 
                onChange={(e) => setShowBy(e.target.value)} 
                displayEmpty 
                inputProps={{ "aria-label": "Without label" }} 
                className="w-100" > 
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
              <Select value={showBysetCatBy} 
                onChange={(e) => setCatBy(e.target.value)} 
                displayEmpty 
                inputProps={{ "aria-label": "Without label" }} 
                className="w-100" > 
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
                <Select value={showBysetBrandBy} 
                onChange={(e) => setBrandBy(e.target.value)} 
                displayEmpty 
                inputProps={{ "aria-label": "Without label" }} 
                className="w-100" > 
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
                <Select value={showBysetSearchBy} 
                onChange={(e) => setSearchBy(e.target.value)} 
                displayEmpty inputProps={{ "aria-label": "Without label" }} 
                className="w-100" > 
                <MenuItem value=""> 
                <em>id/name/category/brand</em> 
                </MenuItem> 
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem> 
                <MenuItem value={30}>Thirty</MenuItem> 
                </Select> </FormControl> </div> 
                </div> 
    {/* ✅ Table Section */}
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
          className="btn-blue btn-sml"
        >
          Search
        </Button>
        <Button
        color="error"
        disabled={selected.length === 0}
        className={`btn-big btn-red ${
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
                            <Button className="secondary" color="secondary">
                              <FaEye />
                            </Button>
                          </Link>
                          <Button
                            className="success"
                            color="success"
                            onClick={() => openEditProduct(item._id)}
                          >
                            <FaPencilAlt />
                          </Button>
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
          <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
          <DialogTitle>Edit Product</DialogTitle>
          <form onSubmit={updateProduct}>
            <DialogContent>
              <div className="form-group mb-3">
              <TextField
                label="Product Name"
                name="name"
                value={editFields.name}
                onChange={(e) =>
                  setEditFields({ ...editFields, name: e.target.value })
                }
                fullWidth
                margin="dense"
                />
              </div>
              <div className="form-group mb-3">
              <TextField 
                label="Category Image URL"
                name="images"
                value={editFields.images}
                onChange={(e)=>
                setEditFields({...editFields, images: e.target.value})
                }
                fullWidth
                maargin="dense"
                />
              </div>
            <div className="form-group mb-3"> 
              <TextField
                label="Price"
                name="price"
                value={editFields.price}
                onChange={(e) =>
                  setEditFields({ ...editFields, price: e.target.value })
                }
                fullWidth
                margin="dense"
              />
              </div>
              <div className="form-group mb-3">
                <TextField
                label="Stock"
                name="countInStock"
                value={editFields.countInStock}
                onChange={(e) =>
                  setEditFields({ ...editFields, countInStock: e.target.value })
                }
                fullWidth
                margin="dense"
              />
              </div>
            <div className="form-group mb-3"> 
              <TextField
                label="Rating"
                name="rating"
                value={editFields.rating}
                onChange={(e)=>
                setEditFields({...editFields, rating: e.target.value })
                }
                fullWidth
                margin="dense"
                />
            </div>
            <div className="form-group mb-3">
              <TextField
                label="Brand"
                name="brand"
                value={editFields.brand}
                onChange={(e) =>
                  setEditFields({...editFields, brand: e.target.value })
                }
                fullWidth
                margin="dense"
              />
            </div>
            <div className="form-group mb-3">
              <TextField
                label="oldPrice"
                name="oldPrice"
                value={editFields.oldPrice}
                onChange={(e)=>
                  setEditFields({...editFields, oldPrice: e.target.value})
                }
                fullWidth
                margin="dense"
              />
            </div>
            <div className="form-group mb-3">
              <TextField
               label="SUB CATEGORY"
                name="subCategory"
                value={editFields.subCategory}
                onChange={(e)=>
                  setEditFields({...editFields, subCategory: e.target.value})
                }
                fullWidth
                margin="dense" 
              />
            </div>
            </DialogContent>
            <DialogActions> 
              <Button onClick={handleEditClose} variant="outlined">
                Cancel
              </Button>
              <Button type="submit" variant="contained" disabled={editLoading} > 
                {editLoading ? ( <> <span style={{ color: "#ffeb3b" }}>Updating...</span> 
            <CircularProgress size={16} color="inherit" className="ml-2" /> 
            </> ) : ( "Update" )} </Button> 
            </DialogActions>
          </form>
        </Dialog>
      </> 
      ); 
    }; 
    export default ProductList;