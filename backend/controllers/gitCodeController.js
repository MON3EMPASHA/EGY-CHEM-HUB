import asyncHandler from "../middlewares/asyncHandler.js";
import GitCode from "../models/gitCodeModel.js";

export const createGitCode = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    companyName,
    phone,
    country,
    product,
    quantity,
    message,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !companyName ||
    !phone ||
    !country ||
    !product ||
    !quantity
  ) {
    res.status(400);
    throw new Error("All fields except message are required");
  }
  const gitCode = await GitCode.create({
    firstName,
    lastName,
    email,
    companyName,
    phone,
    country,
    product,
    quantity,
    message,
  });
  res.status(201).json(gitCode);
});

export const getAllGitCodes = asyncHandler(async (req, res) => {
  const codes = await GitCode.find().sort({ createdAt: -1 });
  res.json(codes);
});

export const getGitCodeById = asyncHandler(async (req, res) => {
  const code = await GitCode.findById(req.params.id);
  if (!code) {
    res.status(404);
    throw new Error("Request not found");
  }
  res.json(code);
});

export const updateGitCode = asyncHandler(async (req, res) => {
  const code = await GitCode.findById(req.params.id);
  if (!code) {
    res.status(404);
    throw new Error("Request not found");
  }
  Object.assign(code, req.body);
  await code.save();
  res.json(code);
});

export const deleteGitCode = asyncHandler(async (req, res) => {
  const code = await GitCode.findById(req.params.id);
  if (!code) {
    res.status(404);
    throw new Error("Request not found");
  }
  await code.deleteOne();
  res.json({ message: "Request deleted" });
});
