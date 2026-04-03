const express = require("express");
const Category = require("../models/category");
const cloudinary = require("cloudinary").v2;
const pLimit = require("p-limit").default;
const mongoose = require("mongoose");

const router = express.Router();
const uploadCategoryImages = require("../middleCategory/uploadCategoryImages");
/* ================= CLOUDINARY CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
/* ================= CREATE CATEGORY ================= */
router.post("/create", uploadCategoryImages.array("images"), async (req, res) => {
  try {
    let imageUrls = [];

    // 🟢 CASE 1: IMAGE URL → CLOUDINARY
    if (req.body.images && Array.isArray(req.body.images)) {
      const limit = pLimit(3);

      const uploadResults = await Promise.all(
        req.body.images.map((image) =>
          limit(() =>
            cloudinary.uploader.upload(image, {
              folder: "categories",
            })
          )
        )
      );

      imageUrls = uploadResults.map((file) => file.secure_url);
    }

    // 🟢 CASE 2: MEDIA UPLOAD → CLOUDINARY
    if (req.files && req.files.length > 0) {

      const uploadResults = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "categories",
          })
        )
      );

      imageUrls = uploadResults.map((file) => file.secure_url);
    }
    
    const category = new Category({
      name: req.body.name,
      images: imageUrls,
      color: req.body.color,
    });

    const savedCategory = await category.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* ================= GET ALL CATEGORIES (DROPDOWN) ================= */
router.get("/all", async (req, res) => {
  try {
    const categories = await Category.find().select("name");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ================= GET CATEGORIES (PAGINATED) ================= */
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 4;

    const totalPosts = await Category.countDocuments();
    const totalPages = Math.ceil(totalPosts / perPage) || 1;

    const categories = await Category.find()
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      categoryList: categories,
      totalPages,
      page,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= GET CATEGORY BY ID ================= */
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  res.json(category);
});

/* ================= UPDATE CATEGORY ================= */
 router.put("/:id", uploadCategoryImages.array("images"), async (req, res) => {
  try {

    let imageUrls = [];
    
    // CASE 1: IMAGE URL
    if (req.body.images) {

      const images = Array.isArray(req.body.images)
        ? req.body.images
        : [req.body.images];

      const uploadResults = await Promise.all(
        images.map((image) =>
          cloudinary.uploader.upload(image, {
            folder: "categories",
          })
        )
      );

      imageUrls = uploadResults.map((file) => file.secure_url);
    }
    // CASE 2: MEDIA FILE
    if (req.files && req.files.length > 0) {

      const uploadResults = await Promise.all(
        req.files.map((file) =>
          cloudinary.uploader.upload(file.path, {
            folder: "categories",
          })
        )
      );

      imageUrls = uploadResults.map((file) => file.secure_url);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        color: req.body.color,
        images: imageUrls,
      },
      { new: true }
    );

    res.json(updatedCategory);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
/* ================= DELETE CATEGORY ================= */
router.delete("/:id", async (req, res) => {
  const deleted = await Category.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json({ success: true });
});
module.exports = router;
