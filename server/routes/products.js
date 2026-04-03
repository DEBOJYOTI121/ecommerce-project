const express = require("express");
const router = express.Router();
const pLimit = require("p-limit").default;
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const Category = require("../models/category");
const { Product } = require("../models/products");
const uploadProductImages = require("../middlewares/multerProduct");
const fs = require("fs-extra");

/* ================= CLOUDINARY CONFIG ================= */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ================= GET ALL PRODUCTS ================= */
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const { keyword, category, brand } = req.query;

    let filter = {};

    if (keyword) {
      filter.name = { $regex: keyword, $options: "i" };
    }

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    const total = await Product.countDocuments(filter);

    const productList = await Product.find(filter)
      .populate("category", "name")
      .skip(skip)
      .limit(limit)
      .sort({ dateCreated: 1 });
    res.status(200).json({
      productList,
      totalPages: Math.ceil(total / limit),
      page,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ================= CREATE PRODUCT ================= */
 router.post(
  "/create",
  uploadProductImages.array("images", 10),
  async (req, res) => {
    try {
      let imageUrls = [];

      // 🔁 IMAGE URL FLOW → CLOUDINARY
      if (req.body.imageType === "url") {
        const urls = req.body.imageUrls;
        const urlArray = Array.isArray(urls) ? urls : [urls];

        const uploads = await Promise.all(
          urlArray.map((url) =>
            cloudinary.uploader.upload(url, { folder: "products" })
          )
        );

        imageUrls = uploads.map((u) => u.secure_url);
      }

      // 🔁 FILE UPLOAD FLOW → LOCAL ONLY (NO CLOUDINARY)
      else {
        if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "No images uploaded" });
        }

        imageUrls = req.files.map(
          (file) => `/uploads/products/${file.filename}`
        );
      }

      const product = await Product.create({
        name: req.body.name,
        description: req.body.description,
        images: imageUrls,
        brand: req.body.brand,
        price: Number(req.body.price),
        oldPrice: Number(req.body.oldPrice),
        category: req.body.category,
        subCategory: req.body.subCategory || "",
        countInStock: Number(req.body.countInStock),
        rating: Number(req.body.rating),
        isFeatured:
          req.body.isFeatured === "true" || req.body.isFeatured === true,
      });

      res.status(201).json(product);
    } catch (err) {
      console.error("CREATE PRODUCT ERROR:", err);
      res.status(500).json({ error: err.message });
    }
  }
);
/* ================= GET PRODUCT BY ID ================= */
router.get("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  const product = await Product.findById(req.params.id)
    .populate("category", "name");

  if (!product) {
    return res.status(404).json({
      message: "The product with the given ID was not found.",
    });
  }

  res.status(200).json(product);
});

/* ================= DELETE PRODUCT ================= */
router.delete("/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return res.status(404).json({
      message: "Product not found!",
      status: false,
    });
  }

  res.status(200).json({
    message: "The product is deleted!",
    status: true,
  });
});

/* ================= UPDATE PRODUCT ================= */
router.put(
  "/:id",
  uploadProductImages.array("images", 10), // ← STEP 5 USED HERE
  async (req, res) => {
    try {
      let imageUrls = [];

      // if new images uploaded
      if (req.files && req.files.length > 0) {
        const uploads = await Promise.all(
          req.files.map((file) =>
            cloudinary.uploader.upload(file.path, { folder: "products" })
          )
        );

        imageUrls = uploads.map((u) => u.secure_url);

        req.files.forEach((file) => fs.remove(file.path));
      }

      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: req.body.name,
          description: req.body.description,
          images: imageUrls.length ? imageUrls : req.body.images,
          brand: req.body.brand,
          price: req.body.price,
          oldPrice: req.body.oldPrice,
          category: req.body.category,
          subCategory: req.body.subCategory,
          countInStock: req.body.countInStock,
          rating: req.body.rating,
          isFeatured: req.body.isFeatured,
        },
        { new: true }
      );

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);
module.exports = router;
