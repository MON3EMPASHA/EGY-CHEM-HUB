import Brand from "../models/brandModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createBrand = asyncHandler(async (req, res) => {
  const { name, description, website, logo } = req.body;

  const existingBrand = await Brand.findOne({ name });
  if (existingBrand) {
    return res.status(400).json({ message: "Brand already exists" });
  }
  const brand = new Brand({
    name,
    description,
    website,
    logo,
  });

  const createdBrand = await brand.save();
  res.status(201).json(createdBrand);
});

const getAllBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json(brands);
});

const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }
  res.status(200).json(brand);
});

const updateBrand = asyncHandler(async (req, res) => {
  const { name, description, website, logo } = req.body;

  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  brand.name = name || brand.name;
  brand.description = description || brand.description;
  brand.website = website || brand.website;
  brand.logo = logo || brand.logo;

  const updatedBrand = await brand.save();
  res.status(200).json(updatedBrand);
});

const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    return res.status(404).json({ message: "Brand not found" });
  }

  await brand.deleteOne();
  res.status(200).json({ message: "Brand removed" });
});

export { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand };
