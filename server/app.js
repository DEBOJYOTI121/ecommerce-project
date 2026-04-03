const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();   // <-- fix here, use .config(


const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
const categoryRoutes =require('./routes/categories');
const productRoutes= require('./routes/products');
app.use(`/api/category`,categoryRoutes);
app.use(`/api/products`,productRoutes);
app.use("/uploads", express.static("uploads"));
// Database
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Database Connection is Ready...');
    // Server
    app.listen(process.env.PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
    });
})
.catch((err) => {
    console.error('❌ Database connection error:', err);
});
console.log("Cloudinary Config:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET ? "LOADED" : "MISSING"
});

console.log("🔥 PORT from env:", process.env.PORT);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${process.env.PORT}`);
});


