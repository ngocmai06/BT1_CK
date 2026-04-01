import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  res.json(await Category.create(req.body));
};

export const getCategories = async (req, res) => {
  res.json(await Category.find({ isDeleted: false }));
};

export const updateCategory = async (req, res) => {
  res.json(await Category.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  res.json(category);
};