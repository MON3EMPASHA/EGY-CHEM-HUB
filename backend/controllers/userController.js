import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bycrypt from "bcryptjs";
import createToken from "../utils/createToken.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Google Auth Function
const googleAuth = asyncHandler(async (req, res) => {
  const { credential } = req.body; // The token received from frontend

  // Verify the ID token with Google's API
  const ticket = await client.verifyIdToken({
    idToken: credential, // Token received from the frontend
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name, picture } = ticket.getPayload(); // Extract info from token

  // Check if the user already exists
  let user = await User.findOne({ email });

  if (!user) {
    // If no user, ask signup manually
    res.status(400);
    throw new Error("User not found. Please sign up first.");
  }
  // Generate a JWT for the logged-in user
  createToken(res, user._id);

  res.json({
    success: true,
    message: "Google Sign-In successful",
    user,
  });
});

const HashedPassword = async (password) => {
  const salt = await bycrypt.genSalt(10);
  return await bycrypt.hash(password, salt);
};
const createUser = asyncHandler(async (req, res) => {
  const { username, email, companyName, dateOfBirth, phoneNumber, password } =
    req.body;
  if (
    !username ||
    !email ||
    !password ||
    !companyName ||
    !dateOfBirth ||
    !phoneNumber
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  const user = await User.create({
    username,
    email,
    companyName,
    dateOfBirth,
    phoneNumber,
    password: await HashedPassword(password),
  });
  res.status(201).json({ message: "User created successfully", user });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const isPasswordValid = await bycrypt.compare(
      password,
      existingUser.password
    );
    if (isPasswordValid) {
      createToken(res, existingUser._id);
      res.json({ message: "Login successful", user: existingUser });
      return;
    } else {
      res.status(401);
      throw new Error("Invalid credentials");
    }
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httyOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    }

    await User.deleteOne({ _id: user._id });
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  googleAuth,
};
