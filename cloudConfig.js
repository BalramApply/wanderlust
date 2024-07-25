// <<<<<<<<<< .env <<<<<<<<<<
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ========== cloud_info ==========
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

// :::::::::: types_accept ::::::::::
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',
      allowerdFormats:["png", "jpg", "jpeg"], // supports promises as well
    },
  });

// ########## export ########## 
  module.exports = {
    cloudinary,
    storage,
  };