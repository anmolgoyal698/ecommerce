import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import jwt from "jsonwebtoken";

//Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error('User not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    next(); // only call next once here
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error('User not authorized, invalid token');
  }
});


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