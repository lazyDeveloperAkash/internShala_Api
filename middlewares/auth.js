const JWT = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const { catchAsyncErrors } = require("./catchAsyncErrors");



exports.isAuthenticated = catchAsyncErrors(async (req,res,next) => {
    const {token} = req.cookies;

    if(!token){
        return next( new ErrorHandler("Please login to eccess the resource", 401));
    }
    const { id } = JWT.verify(token, process.env.JWT_SECRET);
    req.id = id;
    next();
});