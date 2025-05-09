import express from "express";
import {
  createGitCode,
  getAllGitCodes,
  getGitCodeById,
  updateGitCode,
  deleteGitCode,
} from "../controllers/gitCodeController.js";
const router = express.Router();

router.post("/", createGitCode);
router.get("/", getAllGitCodes);
router.get("/:id", getGitCodeById);
router.put("/:id", updateGitCode);
router.delete("/:id", deleteGitCode);

export default router;
