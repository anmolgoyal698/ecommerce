import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Log in user and get token
// @route   POST /api/users/login
// @acess.  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

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
});

// @desc    Register user
// @route   POST /api/users
// @acess.  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(401);
    throw new Error("User already exists !");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      generateToken(res, user._id);
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Log out user / clear cookie
// @route   POST /api/users/logout
// @acess.  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// @desc    Get user's profile
// @route   GET /api/users/profile
// @acess.  Private
const getUserProfile = asyncHandler(async (req, res) => {
  if (req.user) {
    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user's profile
// @route   PUT /api/users/profile
// @acess.  Private

// @desc    Update user's profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  console.log("Update user profile called");

  // Ensure req.user exists
  if (!req.user || !req.user._id) {
    return res.status(401).json({ message: "Not authorized" });
  }

  let user;
  try {
    user = await User.findById(req.user._id);
  } catch (err) {
    console.error("Error fetching user from DB:", err);
    return res.status(500).json({ message: "Database error" });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user fields
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    const updatedUser = await user.save();

    // Only set headers / send response after all DB operations succeed
    generateToken(res, updatedUser._id); // if you need JWT cookie

    return res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } catch (err) {
    console.error("Error saving updated user:", err);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Failed to update user" });
    }
  }
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
