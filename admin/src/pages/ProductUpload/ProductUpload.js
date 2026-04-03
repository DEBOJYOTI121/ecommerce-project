import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'; 
import { useState, useRef, useEffect, useContext } from "react";
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from 'react-icons/fa';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";
import { postData } from "../utils/api"; // adjust path if needed
import { Link, useNavigate } from "react-router-dom";


const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,

    "& .MuiChip-icon": {
      color: "#000",
    },

    "&:hover, &:focus": {
      backgroundColor: "#c2c2c2ff",
    },

    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: "#f0f0f0",
    },
  };
});
const ProductUpload = () => {
  const [categoryVal, setCategoryVal] = useState("");
  const [subCategoryVal, setSubCategoryVal] = useState("");
  const [brandVal, setBrandVal] = useState("");
  const [featuredVal, setFeaturedVal] = useState("");
  const [ratingsValue, setRatingsValue] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [urlImages, setUrlImages] = useState([]);
  const [isFeaturedValue, setIsFeaturedValue] = useState("");
  const [catData, setCatData] = useState({
    categoryList: [],
    totalPages: 1,
    page: 1,
     });
  const [formFields, setFormFields] = useState({
  name: "",
  description: "",
  images: [],
  brand: "",
  price: "",
  oldPrice: "",
  category: "",
  subCategory: "",
  countInStock: "",
  rating: 0,
  isFeatured: false
  });
  // ✅ image upload states
  const fileInputRef = useRef(null);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleChangeCategory = (event) => {
    setCategoryVal(event.target.value);
     setFormFields((prev) => ({
    ...prev,
    category: event.target.value
  }));
  };

  const handleChangeSubCategory = (event) => {
    setSubCategoryVal(event.target.value);
      setFormFields((prev) => ({
    ...prev,
    subCategory: event.target.value
   }));
  };
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeBrand = (event) => {
    setBrandVal(event.target.value);
    setFormFields((prev) => ({
    ...prev,
    brand: event.target.value
  }));
  };

  const handleChangeFeatured = (event) => {
    setFeaturedVal(event.target.value);
  };
   const loadCategories = async () => {
  const res = await fetchDataFromApi("/api/category/all");
  if (res) {
    setCatData({
      categoryList: res
    });
  }
  };
  const { setProgress } = useContext(MyContext);
  // ✅ open file manager
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };
   useEffect(() => {
     window.scrollTo(0, 0);
   
     setProgress(20);
   
     loadCategories()
       .then(() => setProgress(100))
       .catch(() => setProgress(100));
   
    },[setProgress]);
    useEffect(() => {
    setFormFields((prev) => ({
    ...prev,
    images: uploadedImages
    }));
   }, [uploadedImages]);

  // ✅ compress + preview multiple images
     const handleFileChange = (e) => {
  const files = Array.from(e.target.files);
  setUploadedImages((prev) => [...prev, ...files]);
   };
  // ✅ delete image
  const handleDeleteImage = (index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updatedImages);
  };
  const handleChangeIsFeaturedValue = (event) => {
  const value = event.target.value;

  if (value === "") {
    setIsFeaturedValue("");
  } else {
    setIsFeaturedValue(value === "true");
  }
    const booleanValue =
    value === "" ? "" : value === "true";

  setIsFeaturedValue(booleanValue);

  setFormFields((prev) => ({
    ...prev,
    isFeatured: booleanValue
  }));
};
  const inputChange = (e) => {
  const { name, value } = e.target;

  setFormFields((prev) => ({
    ...prev,
    [name]: value
  }));
  };
 const addProduct = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // ✅ FRONTEND VALIDATION (VERY IMPORTANT)
  if (!formFields.name.trim()) {
    enqueueSnackbar("Product name is required", { variant: "error" });
    setIsLoading(false);
    return;
  }

  if (!formFields.category) {
    enqueueSnackbar("Category is required", { variant: "error" });
    setIsLoading(false);
    return;
  }

  if (!formFields.price) {
    enqueueSnackbar("Price is required", { variant: "error" });
    setIsLoading(false);
    return;
  }

  if (!formFields.countInStock) {
    enqueueSnackbar("Stock quantity is required", { variant: "error" });
    setIsLoading(false);
    return;
  }

  if (urlImages.length === 0 && uploadedImages.length === 0) {
    enqueueSnackbar("Please add at least one product image", {
      variant: "error",
    });
    setIsLoading(false);
    return;
  }

  try {
    const formData = new FormData();

    // ✅ append normal fields (NO arrays / objects)
    Object.entries(formFields).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, String(value));
      }
    });

    // ✅ IF–ELSE image logic (matches backend)
    if (urlImages.length > 0) {
      urlImages.forEach((url) => {
        formData.append("imageUrls", url);
      });
      formData.append("imageType", "url");
    } else {
      uploadedImages.forEach((file) => {
        formData.append("images", file);
      });
      formData.append("imageType", "file");
    }

    await postData("/api/products/create", formData, true);

    enqueueSnackbar("Product added successfully!", {
      variant: "success",
    });

    navigate("/products");
  } catch (error) {
    console.error("ADD PRODUCT ERROR:", error);

    enqueueSnackbar(
      error.response?.data?.message || "Failed to add product",
      { variant: "error" }
    );
  } finally {
    setIsLoading(false);
  }
};
const handleAddImageUrl = () => {
  if (!imageUrl.trim()) return;

  setUrlImages((prev) => [...prev, imageUrl.trim()]);
  setImageUrl("");
};

 return (
    <>
      <div className="productOld right-content w-100  custom-width">
        <div className="card shadow border-0 w-100 p-4 header-title-bar">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <h5 className="page-title m-0">Product Upload</h5>
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb component="a" href="#" label="Product Upload" />
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <form className="form" onSubmit={addProduct}>
        <div className="row">
          <div className="col-sm-12 custom-wide">
            <div className="card productUpload p-4 oldd">
              <h5 className="text-black mb-4">Basic Information</h5>
                  <div className="form-group">
                <h6>PRODUCT NAME</h6>
                <input type="text" name="name" value={formFields.name} onChange={inputChange}/>
              </div>
              <div className="form-group">
                <h6>DESCRIPTION</h6>
                <textarea rows={5} cols={10} name="description" value={formFields.description} onChange={inputChange}/>
              </div>
              {/* Category / SubCategory / Brand */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>CATEGORY</h6>
                    <Select
                      variant="outlined"
                      value={categoryVal}
                      onChange={handleChangeCategory}
                      displayEmpty
                      className="w-100"
                      renderValue={(selected) =>
                        selected === "" ? (
                          <em className="select-placeholder">None</em>
                        ) : (
                          selected
                        )
                      }
                    >
                      <MenuItem className="text-capitalize" value="">None</MenuItem>
                       {catData?.categoryList?.map((cat) => (
                        <MenuItem key={cat._id} value={cat._id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>SUB CATEGORY</h6>
                    <Select
                      variant="outlined"
                      value={subCategoryVal}
                      onChange={handleChangeSubCategory}
                      displayEmpty
                      className="w-100"
                      renderValue={(selected) =>
                        selected === "" ? (
                          <em className="select-placeholder">None</em>
                        ) : (
                          selected
                        )
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="A">Type A</MenuItem>
                      <MenuItem value="B">Type B</MenuItem>
                      <MenuItem value="C">Type C</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>BRAND</h6>
                    <Select
                      variant="outlined"
                      value={brandVal}
                      onChange={handleChangeBrand}
                      displayEmpty
                      className="w-100"
                      renderValue={(selected) =>
                        selected === "" ? (
                          <em className="select-placeholder">None</em>
                        ) : (
                          selected
                        )
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="HP">HP</MenuItem>
                      <MenuItem value="DELL">Dell</MenuItem>
                      <MenuItem value="ASUS">Asus</MenuItem>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Price / Featured / Discount price */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>REGULAR PRICE</h6>
                    <input type="number" name="price" value={formFields.price} onChange={inputChange}/>
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>FEATURED</h6>
                    <Select
                      variant="outlined"
                      value={featuredVal}
                      onChange={handleChangeFeatured}
                      displayEmpty
                      className="w-100"
                      renderValue={(selected) =>
                        selected === "" ? (
                          <em className="select-placeholder">None</em>
                        ) : (
                          selected
                        )
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="yes">Yes</MenuItem>
                      <MenuItem value="no">No</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>DISCOUNT PRICE</h6>
                    <input type="number" name="oldPrice" value={formFields.oldPrice} onChange={inputChange}/>

                  </div>
                </div>
              </div>

              {/* Rating / Discount / Stock */}
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <h6>RATINGS</h6>
                     <Rating
                      value={ratingsValue}
                      onChange={(event, newValue) => {
                        setRatingsValue(newValue);

                        setFormFields((prev) => ({
                          ...prev,
                          rating: newValue
                        }));
                      }}
                    />
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6 className='text-uppercase'>is Featured</h6>
                    <Select
                      variant="outlined"
                      value={isFeaturedValue === "" ? "" : String(isFeaturedValue)}
                      onChange={handleChangeIsFeaturedValue}
                      displayEmpty
                      className="w-100"
                      renderValue={(selected) =>
                        selected === "" ? (
                          <em className="select-placeholder">None</em>
                        ) : (
                          selected
                        )
                      }
                    >
                      <MenuItem value="">None</MenuItem>
                      <MenuItem value="true">True</MenuItem>
                      <MenuItem value="false">False</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="col">
                  <div className="form-group">
                    <h6>PRODUCT STOCK</h6>
                    <input type="number" name="countInStock" value={formFields.countInStock} onChange={inputChange}/>

                  </div>
                </div>
              </div>
               {/* Images */}
              <div className="image-section mb-4">
                {/* ✅ Add Image URL Section */}
              <div className="form-group mb-4">
                <h6>ADD IMAGE URL</h6>

                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="Paste image URL here"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    style={{ flex: 1 }}
                  />

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddImageUrl}
                  >
                    Add
                  </Button>
                </div>
              </div>
                <p style={{ fontSize: "13px", color: "#555", marginBottom: "8px" }}>
                {urlImages.length > 0
                  ? `Using ${urlImages.length} image URL(s)`
                  : `Using ${uploadedImages.length} uploaded image(s)`}
              </p>
              <h6 className="text-black mb-3">MEDIA AND PUBLISHED</h6>
              <div className="image-grid">
                {/* static images (no change) */}
                <div className="image-card">
                  <LazyLoadImage
                    src="/images/gaming-main.jpg"
                    alt="img1"
                    effect="blur"
                  />
                </div>

                <div className="image-card">
                  <LazyLoadImage
                    src="/images/gaming-main1.jpg"
                    alt="img2"
                    effect="blur"
                  />
                </div>

                <div className="image-card">
                  <LazyLoadImage
                    src="/images/gaming-main2.jpg"
                    alt="img3"
                    effect="blur"
                  />
                </div>

                {/* ✅ uploaded images with delete */}
                {/* ✅ Image URLs preview */}
                {urlImages.map((url, index) => (
                  <div className="image-card position-relative" key={`url-${index}`}>
                    <LazyLoadImage
                      src={url}
                      alt={`url-img-${index}`}
                      effect="blur"
                    />

                    <span
                      onClick={() =>
                        setUrlImages((prev) => prev.filter((_, i) => i !== index))
                      }
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                        cursor: "pointer",
                        zIndex: 2
                      }}
                    >
                      ✕
                    </span>
                  </div>
                ))}
                {uploadedImages.map((img, index) => (
                  <div className="image-card position-relative" key={index}>
                    <LazyLoadImage
                      src={URL.createObjectURL(img)}   // 🔥 FIX HERE
                      alt={`upload-${index}`}
                      effect="blur"
                    />

                    <span
                      onClick={() => handleDeleteImage(index)}
                      style={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        background: "red",
                        color: "white",
                        borderRadius: "50%",
                        padding: "2px 6px",
                        fontSize: "12px",
                        cursor: "pointer",
                        zIndex: 2
                      }}
                    >
                      ✕
                    </span>
                  </div>
                ))}

                {/* ✅ upload button */}
                <div
                  className="image-card upload-box d-flex align-items-center justify-content-center"
                  onClick={handleUploadClick}
                  style={{ cursor: "pointer" }}
                >
                  <span className="text-black">Upload Image</span>
                </div>

                {/* ✅ hidden input */}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            </div>


              <br />
              <Button
                type="submit"
                className="btn-blue btn-lg btn-big"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Publishing...
                    <CircularProgress
                      size={18}
                      color="inherit"
                      className="ml-2"
                    />
                  </>
                ) : (
                  <>
                    <Link to="/product/productlist">
                    <FaCloudUploadAlt /> &nbsp; PUBLISH AND VIEW
                    </Link>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default ProductUpload;
