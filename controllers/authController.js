import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// đăng ký
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash
  });

  res.json(user);
};

// đăng nhập
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token, user });
};