// <<<<<<<<<< requires <<<<<<<<<<
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// ========== user_schema ==========
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
});

// :::::::::: passport_plugin ::::::::::
userSchema.plugin(passportLocalMongoose);

// ########## export_schema ########## 
module.exports = mongoose.model("User", userSchema);