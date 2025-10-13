import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

// @desc    Log in user and get token
// @route   POST /api/users/login
// @acess.  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user &&  await user.matchPassword(password)) {
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expires: '1d'});

    // Set JWT as http only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'production',
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60 * 1000 // 1d
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  res.send("Login user");
});

// @desc    Register user
// @route   POST /api/users
// @acess.  Public
const registerUser = asyncHandler(async (req, res) => {
  res.send("Register user");
});

// @desc    Log out user / clear cookie
// @route   POST /api/users/logout
// @acess.  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });

  res.status(200).json({message: "Logged out successfully"});
});

// @desc    Get user's profile
// @route   GET /api/users/profile
// @acess.  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send("Get user profile");
});

// @desc    Get user's profile
// @route   PUT /api/users/profile
// @acess.  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("Update user profile");
});

// @desc    Get all users
// @route   GET /api/users
// @acess.  Private admin
const getUsers = asyncHandler(async (req, res) => {
  res.send("Get users");
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @acess.  Private admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send("Delete user");
});

// @desc    Get user by id
// @route   GET /api/users/:id
// @acess.  Private admin
const getUserById = asyncHandler(async (req, res) => {
  res.send("Get user by id");
});

// @desc    Update user
// @route   PUT /api/users/:id
// @acess.  Private admin
const updateUser = asyncHandler(async (req, res) => {
  res.send("Update user");
});

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
