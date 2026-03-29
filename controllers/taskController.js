import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const task = await Task.create({
    ...req.body,
    userId: req.user.id
  });
  res.json(task);
};

export const getTasks = async (req, res) => {
  const { keyword, priority, status, sortBy } = req.query;

  let query = {};

  if (keyword) {
    query.title = { $regex: keyword, $options: "i" };
  }

  if (priority) query.priority = priority;
  if (status) query.status = status;

  let sort = {};
  if (sortBy === "dueDate") sort.dueDate = 1;
  if (sortBy === "priority") sort.priority = -1;

  const tasks = await Task.find(query)
    .populate("categoryId")
    .populate("userId")
    .sort(sort);

  res.json(tasks);
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
};