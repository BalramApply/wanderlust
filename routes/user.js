// <<<<<<<<<< requires <<<<<<<<<<
const express = require("express");  
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js")

// ========== signup ==========
router.route("/signup")
.get(userController.renderSignupForm)   // :::::::::: signup_form ::::::::::
.post(wrapAsync(userController.signup));    // ########## post_form ##########

// ********** login **********
router.route("/login")
.get(userController.renderLoginForm)    // ---------- login_form ----------
.post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);  // >>>>>>>>>> post_form >>>>>>>>>>

// |||||||||| logout ||||||||||
router.get("/logout" ,userController.logout);

// ^^^^^^^^^^ export_route ^^^^^^^^^^
module.exports = router;

