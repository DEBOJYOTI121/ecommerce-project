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
import 'react-lazy-load-image-component/src/effects/blur.css';

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../utils/api";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";
import { editData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


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
const ProductEdit = () => {
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
  const { id } = useParams();
  const [previews, setPreviews] = useState([]);
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
    const value = event.target.value === "yes";
      setFeaturedVal(event.target.value);

      setFormFields((prev) => ({
        ...prev,
        isFeatured: value
      }));
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
  const loadProduct = async () => {
  try {
    const res = await fetchDataFromApi(`/api/products/${id}`);
    if (!res) return;
    const isUrlImage =
    res.imageType === "url" ||
    (res.images && res.images.length > 0 && res.images[0].startsWith("http"));

  if (isUrlImage) {
    setUrlImages(res.images);
    setPreviews([]);

    // ✅ ADD THIS LINE HERE
    setImageUrl(res.images[0] || "");
  } else {
    setPreviews(res.images);
    setUrlImages([]);

    // optional: clear input
    setImageUrl("");
  }
    // OTHER STATES
    setCategoryVal(res.category?._id || "");
    setSubCategoryVal(res.subCategory || "");
    setBrandVal(res.brand || "");
    setIsFeaturedValue(res.isFeatured);

    setFormFields({
      name: res.name || "",
      description: res.description || "",
      brand: res.brand || "",
      price: res.price || "",
      oldPrice: res.oldPrice || "",
      category: res.category?._id || "",
      subCategory: res.subCategory || "",
      countInStock: res.countInStock || "",
      rating: res.rating || 0,
      isFeatured: res.isFeatured || false,
      images: res.images || []
    });

  } catch (err) {
    console.error("Error loading product:", err);
  }
};
  loadProduct();
  }, [id]);
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

  if (
  urlImages.length === 0 &&
  uploadedImages.length === 0 &&
  previews.length === 0
   ) {
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

    // ✅ MEDIA FILE
      if (uploadedImages.length > 0) {
        uploadedImages.forEach((file) => {
          formData.append("images", file);
        });
        formData.append("imageType", "file");
      }

      // ✅ IMAGE URL
     else if (urlImages.length > 0 || previews.length > 0) {
      const allImages = [...urlImages, ...previews];

      allImages.forEach((url) => {
        formData.append("imageUrls", url);
      });

      formData.append("imageType", "url");
    }
    await editData(`/api/products/${id}`, formData);
     enqueueSnackbar("Product updated successfully!",{
      variant: "success",
    });
     navigate("/product/productlist");
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
  setUploadedImages([]);
   setFormFields((prev) => ({
  ...prev,
  images: [...(prev.images || []), imageUrl.trim()]
  }));
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
              {/* ADD IMAGE URL INPUT */}
              {/* ✅ URL PREVIEW HERE */}
              <div className="url-preview-grid">
                {urlImages.map((url, index) => (
                  <div className="url-preview-card" key={index}>
                    <img src={url} className="url-preview-img" alt="" />

                    <span
                      className="url-preview-delete"
                      onClick={() =>
                        setUrlImages((prev) => prev.filter((_, i) => i !== index))
                      }
                    >
                      ✕
                    </span>
                  </div>
                ))}
              </div>
              <h6 className="text-black mb-3">MEDIA AND PUBLISHED</h6>
              <div className="image-grid">                              
                {/* EXISTING IMAGES (DB / CLOUDINARY) */}
                {previews?.length > 0 &&
                  previews.map((img, index) => (
                    <div className="image-card position-relative" key={`preview-${index}`}>
                      <img
                        src={
                          img.startsWith("http") || img.startsWith("data:")
                            ? img
                            : `http://localhost:5000${img}`
                        }
                        className="w-100"
                        alt=""
                      />

                      <span
                        onClick={() => {
                          setPreviews((prev) => prev.filter((_, i) => i !== index));

                          // 🔥 IMPORTANT: sync with form
                          setFormFields((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== index)
                          }));
                        }}
                        style={{
                          position: "absolute",
                          top: 5,
                          right: 5,
                          background: "red",
                          color: "#fff",
                          borderRadius: "50%",
                          padding: "2px 6px",
                          cursor: "pointer",
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  ))}
                {/* EMPTY STATE */}
                {previews.length === 0 && uploadedImages.length === 0 && urlImages.length === 0 && (
                  <div className="image-card d-flex align-items-center justify-content-center">
                    <span>No Image Selected</span>
                  </div>
                )}

                {/* UPLOAD BOX (CLICK + DRAG & DROP) */}
                <div
                  className="image-card upload-box d-flex align-items-center justify-content-center"
                  onClick={handleUploadClick}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();

                    const files = Array.from(e.dataTransfer.files);

                    setUploadedImages(files);
                    setPreviews([]);
                    setUrlImages([]);

                    // 🔥 clear URL
                    setFormFields((prev) => ({
                      ...prev,
                      images: ""
                    }));
                  }}
                  style={{
                    cursor: "pointer",
                    border: "2px dashed #ccc"
                  }}
                >
                  Upload / Drag Image
               </div>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      const files = Array.from(e.target.files);

                      setUploadedImages(files);
                      setPreviews([]);
                      setUrlImages([]); // 👈 VERY IMPORTANT

                      setFormFields((prev) => ({
                        ...prev,
                        images: ""
                      }));
                    }}
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
                  <FaCloudUploadAlt />&nbsp;UPDATE PRODUCT
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
export default ProductEdit;
