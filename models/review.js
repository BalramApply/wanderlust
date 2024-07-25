// <<<<<<<<<< requires <<<<<<<<<<
const mongoose = require("mongoose");
const { type } = require("os");
const Schema = mongoose.Schema;

// ========== review_schema ==========
const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

// :::::::::: export_schema ::::::::::
module.exports = mongoose.model("Review", reviewSchema);