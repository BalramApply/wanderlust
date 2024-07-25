// <<<<<<<<<< .env <<<<<<<<<<
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

// ========== requires ==========
const express = require("express");    
const app = express();     
const mongoose = require("mongoose");            
const path = require("path");      
const methodOverride = require("method-override");      
const ejsMate = require("ejs-mate");            
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport"); // pbkdf2 hashing algorithm
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const dbUrl = process.env.ATLASDB_URL;

// :::::::::: connect_db ::::::::::
main()      
    .then(() => {       
        console.log("connected to DB");     
    })
    .catch((err) => {      
        console.log(err);       
    });

// ########## db_url ########## 
async function main(){      
    await mongoose.connect(dbUrl);      
}

// ********** use **********
app.set("view engine", "ejs");      
app.set("views", path.join(__dirname, "views"));        
app.use(express.urlencoded({extended: true}));     
app.use(methodOverride("_method"));    
app.engine('ejs', ejsMate);     
app.use(express.static(path.join(__dirname, "/public")));       

// ---------- user_time ----------
const store = MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

// >>>>>>>>>> db_error >>>>>>>>>>
store.on("error", () =>{
    console.log("ERROR IN MONGO SESSION STORE", err);
});

// |||||||||| cockies ||||||||||
const sessionOptions ={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

// ^^^^^^^^^^ flash ^^^^^^^^^^
app.use(session(sessionOptions));
app.use(flash());
    
// .......... password ..........
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// <<<<<<<<<< success_failear <<<<<<<<<<
app.use((req, res, next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// ========== routers ==========
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// :::::::::: wrong_request ::::::::::
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// ########## error ########## 
app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
});

// ********** server_localhost **********
app.listen(8080, () => {
    console.log("server is listening to port 8080");
});



























// <<<<<<<<<<  <<<<<<<<<<
// ==========  ==========
// ::::::::::  ::::::::::
// ##########  ########## 
// **********  **********
// ----------  ----------
// >>>>>>>>>>  >>>>>>>>>>
// ||||||||||  ||||||||||
// ^^^^^^^^^^  ^^^^^^^^^^
// ..........  ..........