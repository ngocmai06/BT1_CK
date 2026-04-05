import User from "../models/User.js";

export const getUsers = async (req, res) => {
  res.json(await User.find({ isDeleted: false }));
};

export const updateUser = async (req, res) => {
  res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

export const deleteUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  res.json(user);
};

export const restoreUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { isDeleted: false },
    { new: true }
  );
  res.json(user);
};