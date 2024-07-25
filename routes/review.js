// <<<<<<<<<< requires <<<<<<<<<<
const express = require("express");  
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require("../models/review.js"); 
const Listing = require("../models/listing.js");
const {ValidateReview, isLoggedIn, isreviewAuthor} = require("../middleware.js");    
const reviewController = require("../controllers/reviews.js");

// ========== create_route ==========
router.post("/", isLoggedIn, ValidateReview, wrapAsync(reviewController.createReview));

// :::::::::: delete_route ::::::::::
router.delete("/:reviewId", isLoggedIn, isreviewAuthor, wrapAsync(reviewController.destroyReview));

// ########## export_review ##########
module.exports = router;