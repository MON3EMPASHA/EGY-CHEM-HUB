import express from "express";
const router = express.Router();
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { googleAuth } from "../controllers/userController.js";
// Create a new user
router.route("/").post(createUser);

router.post("/google-login", googleAuth);

// Login an existing user
router.post("/login", loginUser);

// Logout the current user
router.post("/logout", logoutCurrentUser);

// Get all users
router.get("/", authenticate, authorizeAdmin, getAllUsers);

// Get the current user's profile
router.get("/profile", authenticate, getCurrentUserProfile);

// Update the current user's profile
router.put("/profile", authenticate, updateCurrentUserProfile);

// Delete a user by ID
router.delete("/:id", authenticate, authorizeAdmin, deleteUserById);

// Get a user by ID
router.get("/:id", authenticate, authorizeAdmin, getUserById);

// Update a user by ID
router.put("/:id", authenticate, authorizeAdmin, updateUserById);
export default router;
