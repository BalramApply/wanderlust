// <<<<<<<<<< requires <<<<<<<<<<
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { type } = require("os");

// ========== listing_schema ==========
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
       url: String,
       filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

// :::::::::: delete_reviews_with_post ::::::::::
listingSchema.post("findOneAndDelete", async(listing) => {
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});


// ########## export_schema ########## 
const Listing = mongoose.model("Listing", listingSchema) ;

// ********** export_listing **********
module.exports = Listing;