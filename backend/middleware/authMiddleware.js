import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {

    //Read the JWT from the cookies
    let token = req.cookies.jwt;

    if(token) {
    // Verify the token
      try {
         const decoded = jwt.verify(token, process.env.JWT_SECRET);
         req.user = await User.findById(decoded.userId).select('-password');
         next();
      } catch(error) {
        console.error(error);
         res.status(401);
         throw new Error('User not authorized, invalid token')
      }

    } else {
        res.status(401);
        throw new Error('User not authorized, no token');
    }

    next();
})

// Admin middleware
const admin = (req, res, next) => {
    if(req?.user?.isAdmin) {
        next(); 
    } else {
        res.status(401);
        throw new Error('Not authorized as admin')
    }
}

export {protect, admin};