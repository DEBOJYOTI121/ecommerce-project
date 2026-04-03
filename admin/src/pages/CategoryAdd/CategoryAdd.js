import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { styled } from "@mui/material/styles";
import { useState, useRef } from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { postData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useSnackbar } from "notistack";

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

const AddCategory = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
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

      // If URL provided
      if (formFields.images) {
        formData.append("imageUrl", formFields.images);
      }

      // If files uploaded
      uploadedImages.forEach((img) => {
        formData.append("images", img);
      });

      await postData("/api/category/create", formData, true);

      enqueueSnackbar("Category added successfully!", {
        variant: "success",
      });

      navigate("/category");
    } catch (error) {
      enqueueSnackbar("Failed to add category", {
        variant: "error",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  /* ================== IMAGE HANDLERS ================== */
  const handleUploadClick = () => fileInputRef.current.click();
   
  const handleFileChange = async (e) => {
  const files = Array.from(e.target.files);

  const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  const validExtensions = ["jpg", "jpeg", "png", "webp"];

  const validFiles = [];
  const invalidFiles = [];

  files.forEach((file) => {
    const extension = file.name.split(".").pop().toLowerCase();

    const isValidType =
      validTypes.includes(file.type) || validExtensions.includes(extension);

    if (isValidType) {
      validFiles.push(file);
    } else {
      invalidFiles.push(file.name);
    }
  });

  // ❌ Show error for invalid files
  if (invalidFiles.length > 0) {
    enqueueSnackbar(
      `Only JPG, PNG, WEBP images allowed. Invalid file(s): ${invalidFiles.join(", ")}`,
      { variant: "error" }
    );
  }

  // ✅ Compress & upload valid images
  if (validFiles.length > 0) {
    const compressedImages = await Promise.all(
      validFiles.map((file) => compressImage(file))
    );

    setUploadedImages((prev) => [...prev, ...compressedImages]);

    // 🎉 SUCCESS SNACKBAR
    enqueueSnackbar(
      `${validFiles.length} image(s) uploaded successfully`,
      { variant: "success" }
    );
  }

  e.target.value = null;
};
 const handleDeleteImage = (index) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className="productNew right-content w-100 custom-width">
        <div className="card shadow border-0 w-100 p-4 header-title-bar">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <h5 className="page-title m-0">Add Category</h5>
            <Breadcrumbs>
              <StyledBreadcrumb
                icon={<HomeIcon fontSize="small" />}
                label="Dashboard"
              />
              <StyledBreadcrumb label="Category" />
              <StyledBreadcrumb label="Add Category" />
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
              onChange={changeInput}
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

          <div className="image-grid">
            {uploadedImages.map((img, index) => (
              <div className="image-card position-relative" key={index}>
                <LazyLoadImage
                  src={URL.createObjectURL(img)}
                  effect="blur"
                />
                <span
                  onClick={() => handleDeleteImage(index)}
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

            <div
              className="image-card upload-box d-flex align-items-center justify-content-center"
              onClick={handleUploadClick}
              style={{ cursor: "pointer" }}
            >
              Upload Image
            </div>

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
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
export default AddCategory;