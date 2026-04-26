import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import { useState, useRef, useEffect, useContext } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import "react-lazy-load-image-component/src/effects/blur.css";
import { editData, fetchDataFromApi } from "../utils/api";
import { useNavigate , useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";
import { MyContext } from "../../App";
/* ================== Breadcrumb ================== */
const StyledBreadcrumb = styled(Chip)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800],
  height: theme.spacing(3),
  color: theme.palette.text.primary,
  fontWeight: theme.typography.fontWeightRegular,
  "& .MuiChip-icon": { color: "#000" },
}));
/* ================== Image Compression ================== */
const compressImage = (file, maxWidth = 800, quality = 0.7) => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => (img.src = e.target.result);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = maxWidth / img.width;

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: "image/jpeg",
          });
          resolve(compressedFile);
        },
        "image/jpeg",
        quality
      );
    };

    reader.readAsDataURL(file);
  });
};
 const EditCategory = () => {
  const {id}= useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const [formFields, setFormFields] = useState({
    name: "",
    images: "",
    color: "",
  });

  const changeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  /* ================== SUBMIT ================== */
  const addCategory = async (e) => {

  e.preventDefault();

  if (!formFields.name || !formFields.color) {
    enqueueSnackbar("All fields are required", { variant: "error" });
    return;
  }

  setIsLoading(true);

  try {

    const formData = new FormData();

    formData.append("name", formFields.name);
    formData.append("color", formFields.color);

    // MEDIA IMAGE
    if (uploadedImages.length > 0) {
      formData.append("images", uploadedImages[0]);
    }

    // IMAGE URL
    else if (formFields.images) {
      formData.append("images", formFields.images);
    }

    await editData(`/api/category/${id}`, formData);

    enqueueSnackbar("Category updated successfully!", {
      variant: "success",
    });

    navigate("/category");

  } catch (error) {

    enqueueSnackbar("Failed to update category", {
      variant: "error",
    });

  } finally {
    setIsLoading(false);
  }
};
  /* ================== IMAGE HANDLERS ================== */
  const handleUploadClick = () => {
  if (fileInputRef.current) 
  {
    fileInputRef.current.click();
  }
};
const handleFileChange = async (e) => {
  const files = Array.from(e.target.files);

  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

  const validFile = files.find((file) => validTypes.includes(file.type));

  if (!validFile) {
    enqueueSnackbar("Only JPG, PNG, WEBP images allowed", {
      variant: "error",
    });
    return;
  }

  const compressed = await compressImage(validFile);

  // 🔥 replace previous images completely
  setUploadedImages([compressed]);
  setPreviews([]);

  // if user uploads media → remove URL
  setFormFields((prev) => ({
  ...prev,
  images: "",
}));

  enqueueSnackbar("Image uploaded successfully", { variant: "success" });

  e.target.value = null;
};
 useEffect(() => {
  const loadCategory = async () => {
    try {
      context.setProgress(20);

      const res = await fetchDataFromApi(`/api/category/${id}`);
      if (!res) return;
      let imageUrl = "";
      let localImages = [];
      if (Array.isArray(res.images) && res.images.length > 0) {
      const img = res.images[0];

      if (img.startsWith("data:")) {
        localImages = res.images;
      } 
      else if (
        img.includes("/uploads/") ||
        img.includes("cloudinary.com")
      ) {
        // ✅ Treat cloudinary as MEDIA
        localImages = res.images;
      } 
      else {
        // Only external links
        imageUrl = img;
      }
    }
      setFormFields({
        name: res.name || "",
        color: res.color || "",
        images: imageUrl
      });
      setPreviews(localImages);

    } catch (error) {
      console.error("Failed to fetch category:", error);
    } finally {
      context.setProgress(100);
    }
  };
loadCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [id]);
  return (
    <>
      <div className="productNew right-content w-100 custom-width">
        <div className="card shadow border-0 w-100 p-4 header-title-bar">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5 className="page-title m-0">Edit Category</h5>
            <Breadcrumbs>
              <StyledBreadcrumb
                icon={<HomeIcon fontSize="small" />}
                label="Dashboard"
              />
              <StyledBreadcrumb label="Category" />
              <StyledBreadcrumb label="Edit Category" />
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <form className="form" onSubmit={addCategory}>
        <div className="card productUpload p-4 neww">
          <h5 className="text-black mb-4">Basic Information</h5>

          <div className="form-group">
            <h6>Category Name</h6>
            <input
              type="text"
              name="name"
              value={formFields.name}
              onChange={changeInput}
            />
          </div>

          <div className="form-group">
            <h6>Image Url</h6>
            <input
              type="text"
              name="images"
              value={formFields.images}
              onChange={(e) => {
              const value = e.target.value;
              setFormFields((prev) => ({
                ...prev,
                images: value
              }));

              if (value) {
                setUploadedImages([]);
                setPreviews([]);
              }
            }}
            />
          </div>
          <div className="form-group">
            <h6>Color</h6>
            <input
              type="text"
              name="color"
              value={formFields.color}
              onChange={changeInput}
            />
          </div>
          <h6 className="text-white mb-3">MEDIA</h6>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
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
                    images: ""
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

        {/* NEWLY UPLOADED IMAGES */}
        {uploadedImages.map((img, index) => (
          <div className="image-card position-relative" key={`upload-${index}`}>
            <img
              src={URL.createObjectURL(img)}
              className="w-100"
              alt=""
            />

            <span
              onClick={() =>
                setUploadedImages((prev) => prev.filter((_, i) => i !== index))
              }
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
        {previews.length === 0 && uploadedImages.length === 0 && (
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

        {/* 🔥 THIS WAS MISSING */}
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        </div>
          <Button
            type="submit"
            className="btn-blue btn-lg mt-4"
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
                <FaCloudUploadAlt /> &nbsp; PUBLISH
              </>
            )}
          </Button>
        </div>
      </form>
    </>
  );
};
export default EditCategory;