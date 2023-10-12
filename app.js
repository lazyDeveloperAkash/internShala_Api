require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();

//db connecction
require("./models/database").connectDatabase();

// cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: true }));

// logger
const logger = require("morgan");
app.use(logger("tiny"));

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

//  session & cookie
const session = require("express-session");
const cookieperser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieperser());

//express file upload
const fileUpload = require("express-fileupload");
app.use(fileUpload());

//routes 
app.use("/", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes"));

//error handle
const ErrorHandler = require("./utils/errorHandler");
const { generatedErrors } = require("./middlewares/error");
app.all("*", (req,res,next)=>{
    next(new ErrorHandler(`Requested URL NOT FOUND ${req.url}`, 404));
});
app.use(generatedErrors);


app.listen(process.env.PORT, console.log(`server running on port ${process.env.PORT}`));