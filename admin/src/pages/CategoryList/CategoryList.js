import { useEffect, useRef, useState, useContext} from "react"; 
import Breadcrumbs from "@mui/material/Breadcrumbs"; 
import Chip from "@mui/material/Chip"; 
import HomeIcon from "@mui/icons-material/Home"; 
import { styled } from "@mui/material/styles"; 
import { Link } from "react-router-dom"; 
import Checkbox from "@mui/material/Checkbox"; 
import Pagination from "@mui/material/Pagination"; 
import { Button } from "@mui/material";  
import { deleteData } from "../utils/api";  
// Icons 
import { FaEye, FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";  
// API 
import { fetchDataFromApi } from "../utils/api"; 
import { MyContext } from "../../App"; 
/* ---------------- Styled Breadcrumb ---------------- */ 
const StyledBreadcrumb = styled(Chip)(({ theme }) => 
({ 
    backgroundColor: theme.palette.mode === "light" ? 
    theme.palette.grey[100] : theme.palette.grey[800], 
    height: theme.spacing(3), 
    color: theme.palette.text.primary, 
    fontWeight: theme.typography.fontWeightRegular, "& .MuiChip-icon": { color: "#000" }, "&:hover": 
    { backgroundColor: "#c2c2c2" }, 
   })); 
/* ===================== COMPONENT ===================== */ 
const Category = () => {  
const [catData, setCatData] = useState
({ 
   categoryList: [], 
   totalPages: 1, 
   page: 1, 
  }); 
const ITEMS_PER_PAGE = 4;  
const sliderRef = useRef(null); 
const sliderStartX = useRef(0); 
/* ---------- Fetch Categories ---------- */ 
const loadCategories = async () => 
 { const res = await fetchDataFromApi("/api/category?page=1"); 
   if (res) 
     { setCatData(res); } }; 
   const { setProgress } = useContext(MyContext); 
   useEffect(() => { 
    window.scrollTo(0, 0); 
    setProgress(20); 
    loadCategories() 
    .then(() => setProgress(100)) 
    .catch(() => setProgress(100));
     },[setProgress]); 
    /* ---------- Slider Touch ---------- */ 
    const handleTouchStart = (e) => 
    { sliderStartX.current = e.touches[0].clientX; }; 
    const handleTouchEnd = (e) => 
    { const diff = e.changedTouches[0].clientX - sliderStartX.current; 
      if (!sliderRef.current) 
      return; 
      if (diff > 50) 
      sliderRef.current.scrollLeft -= 200; 
      if (diff < -50) 
      sliderRef.current.scrollLeft += 200; }; 
/* ---------- UPDATE CATEGORY (FIXED & WORKING) ---------- */  
const deleteCategory = async (id) => { 
 const confirmDelete = window.confirm("Are you sure?"); 
  if (!confirmDelete) 
   return; 
  await deleteData(`/api/category/${id}`); 
  // ✅ remove from UI immediately 
  setCatData((prev) =>({ 
    ...prev, 
  categoryList: prev.categoryList.filter((item) => item._id !== id), 
  })); 
  }; 
const handlePageChange = async (event, value) => { 
 try { 
    setProgress(25); 
    const res = await fetchDataFromApi(`/api/category?page=${value}`); 
    setProgress(75); 
    setCatData(res); 
    } 
     catch (error) 
  { 
    console.error(error); 
   } 
 finally 
 { 
  setProgress(100); 
  } 
 }; 
 return( 
  <> 
  <div className="right-content w-100"> 
  {/* ================= HEADER ================= */} 
  <div className="card shadow border-0 p-4 header-title-bar cat"> 
  <div className="d-flex justify-content-between align-items-center flex-wrap"> 
   <h5 className="page-title m-0">Category List</h5> 
  <div className="ml-auto d-flex align-items-center"> 
   <Breadcrumbs> 
  <StyledBreadcrumb label="Dashboard" icon={<HomeIcon fontSize="small" />} /> 
  <StyledBreadcrumb label="Category" /> 
  <Link to="/category/add">
   <Button className="btn-blue ml-3 pl-5 pr-5">Add Category</Button></Link> 
 </Breadcrumbs> 
 </div> 
 </div> 
 </div> 
 {/* ================= SLIDER ================= */} 
 <div 
     className="category productSlider mt-3" 
     ref={sliderRef} 
     onTouchStart={handleTouchStart} 
     onTouchEnd={handleTouchEnd} > 
 <div className="sliderTrack d-flex"> 
  {[...Array(8)].map((_, i) => ( 
    <Link key={i} to="/product/details" className="slide"> 
      <img src="/images/inno.webp" alt="product" /> 
      </Link> 
    ))} 
  </div> 
  </div> 
{/* ================= TABLE ================= */} 
<div className="card shadow border-0 p-3 mt-4 cate"> 
<div className="table-responsive"> 
<table className="table table-bordered v-align"> 
<thead className="thead-dark"> 
<tr> 
<th style={{ textAlign: "center" }}>UID</th> 
<th style={{ textAlign: "center" }}>CATEGORY</th> 
<th style={{ textAlign: "center" }}>IMAGE</th> 
<th style={{ textAlign: "center" }}>COLOR</th> 
<th style={{ textAlign: "center" }}>ACTION</th> 
</tr> 
</thead> 
<tbody> 
  {catData.categoryList.length === 0 ? ( 
    <tr> 
     <td colSpan="5" className="text-center"> 
      No Categories Found 
      </td> 
      </tr> 
      ) : ( 
      catData.categoryList.map((item, index) => (
        <tr key={item._id}> 
        <td> <Checkbox /> # 
        {(catData.page - 1) * ITEMS_PER_PAGE + index + 1} 
        </td>
        <td>{item.name}</td> 
        <td> 
         <img
           src={
              item.images?.[0]
                ? item.images[0].startsWith("http") || item.images[0].startsWith("data:")
                  ? item.images[0]
                  : `http://localhost:5000${item.images[0]}`
                : "/images/inno.webp"
            }
          alt={item.name}
          width="60"
        />
        </td> 
        <td>{item.color}</td> 
        <td> 
        <div className="actions d-flex gap-2 categ"> 
          <Link to={`/category/${item._id}`}> 
          <Button className="secondary" color="secondary"> 
          <FaEye /> 
          </Button> 
         </Link> 
          <Link to={`/category/edit/${item._id}`}>
         <Button color="success" className="success"> 
           <FaPencilAlt/> 
           </Button>
          </Link>  
         <Button className="error" color="error" onClick={() => deleteCategory(item._id)}> 
        <FaRegTrashAlt />
        </Button> 
        </div> 
      </td> 
    </tr> 
      )) 
    )} 
     </tbody>
     </table> 
      <div className="d-flex justify-content-between align-items-center">
        <p> Showing page <b>{catData.page}</b> of <b>{catData.totalPages}</b></p> 
      <Pagination 
      count={catData.totalPages} 
      page={catData.page} 
      onChange={handlePageChange} 
      color="primary" 
      size="small" 
      shape="rounded" 
      siblingCount={1} 
      boundaryCount={1} 
      showFirstButton 
      showLastButton /> 
      </div> 
      </div> 
      </div>
  </div>  
</> 
); 
}; 
export default Category;