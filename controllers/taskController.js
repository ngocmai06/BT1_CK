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

  query.isDeleted = false;

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
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { isDeleted: true },
    { new: true }
  );
  res.json(task);
};

export const restoreTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { isDeleted: false },
    { new: true }
  );
  res.json(task);
};

// Lấy tất cả task của user A
export const getTasksByUser = async (req, res) => {
  const tasks = await Task.find({ userId: req.params.userId });
  res.json(tasks);
};

//Lấy các task có mức ưu tiên (priority) cao. 
export const getHighPriorityTasks = async (req, res) => {
  const tasks = await Task.find({ priority: "high" });
  res.json(tasks);
};

//Lấy các task chưa hoàn thành. 
export const getIncompleteTasks = async (req, res) => {
  const tasks = await Task.find({ status: { $ne: "completed" } });
  res.json(tasks);
};

// Tìm các task chứa từ khóa “report”. 
export const searchTasks = async (req, res) => {
  const tasks = await Task.find({
    title: { $regex: "report", $options: "i" }
  });
  res.json(tasks);
};

// Sắp xếp task theo hạn gần nhất
export const sortByDueDate = async (req, res) => {
  const tasks = await Task.find().sort({ dueDate: 1 });
  res.json(tasks);
};

// Lấy các task quá hạn nhưng chưa hoàn thành. 
export const overdueTasks = async (req, res) => {
  const tasks = await Task.find({
    dueDate: { $lt: new Date() },
    status: { $ne: "completed" }
  });
  res.json(tasks);
};

// Lọc các task thuộc category “Học tập” và priority “high”. 
export const filterTasks = async (req, res) => {
  const tasks = await Task.find({ priority: "high" })
    .populate({
      path: "categoryId",
      match: { name: "Học tập" }
    });

  res.json(tasks.filter(t => t.categoryId));
};

// Hiển thị task kèm tên category. 
export const tasksWithCategory = async (req, res) => {
  const tasks = await Task.find().populate("categoryId", "name");
  res.json(tasks);
};

// Thống kê số task theo trạng thái.
export const countByStatus = async (req, res) => {
  const result = await Task.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } }
  ]);
  res.json(result);
};

// Tìm top 3 category có nhiều task nhất. 
export const topCategories = async (req, res) => {
  const result = await Task.aggregate([
    { $group: { _id: "$categoryId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 3 }
  ]);
  res.json(result);
};

// Tính tỷ lệ hoàn thành task của từng user. 
export const completionRate = async (req, res) => {
  const result = await Task.aggregate([
    {
      $group: {
        _id: "$userId",
        total: { $sum: 1 },
        completed: {
          $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
        }
      }
    },
    {
      $project: {
        rate: { $divide: ["$completed", "$total"] }
      }
    }
  ]);
  res.json(result);
};

// Tìm task được tạo nhiều nhất theo từng tháng. 
export const tasksByMonth = async (req, res) => {
  const result = await Task.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);
  res.json(result);
};

// Tìm các task hoàn thành sau deadline. 
export const lateCompletedTasks = async (req, res) => {
  const tasks = await Task.find({
    status: "completed",
    $expr: { $gt: ["$completedAt", "$dueDate"] }
  });
  res.json(tasks);
};

// Tính thời gian trung bình hoàn thành một task
export const avgCompletionTime = async (req, res) => {
  const result = await Task.aggregate([
    {
      $match: {
        status: "completed",
        completedAt: { $ne: null }
      }
    },
    {
      $project: {
        duration: {
          $subtract: ["$completedAt", "$createdAt"]
        }
      }
    },
    {
      $group: {
        _id: null,
        avgTime: { $avg: "$duration" }
      }
    }
  ]);
  res.json(result);
};


