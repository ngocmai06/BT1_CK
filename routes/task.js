import express from "express";
import { createTask, getTasks, updateTask, deleteTask, 
    getTasksByUser,
    getHighPriorityTasks,
    getIncompleteTasks,
    searchTasks,
    sortByDueDate,
    overdueTasks,
    filterTasks,
    tasksWithCategory,
    countByStatus,
    topCategories,
    completionRate,
    tasksByMonth,
    lateCompletedTasks,
    avgCompletionTime
} from "../controllers/task.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Quản lý công việc
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Tạo task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task created successfully
 */
router.post("/", verifyToken, createTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Lấy danh sách task
 *     tags: [Tasks]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 */
router.get("/", verifyToken, getTasks);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Cập nhật task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
router.put("/:id", verifyToken, updateTask);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Xóa task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
router.delete("/:id", verifyToken, deleteTask);

/**
 * @swagger
 * tags:
 *   name: Task Queries
 *   description: Các truy vấn
 */

// Lấy tất cả task của user A. 
/**
 * @swagger
 * /api/tasks/user/{userId}:
 *   get:
 *     summary: Lấy tất cả task của user
 *     tags: [Task Queries]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách task
 */
router.get("/user/:userId", verifyToken, getTasksByUser);

// Lấy các task có mức ưu tiên cao. 
/**
 * @swagger
 * /api/tasks/priority/high:
 *   get:
 *     summary: Lấy task có mức ưu tiên cao
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Danh sách task
 */
router.get("/priority/high", verifyToken, getHighPriorityTasks);

// Lấy các task chưa hoàn thành. 
/**
 * @swagger
 * /api/tasks/incomplete:
 *   get:
 *     summary: Lấy task chưa hoàn thành
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Danh sách task
 */
router.get("/incomplete", verifyToken, getIncompleteTasks);

// Tìm các task chứa từ khóa “report”. 
/**
 * @swagger
 * /api/tasks/search:
 *   get:
 *     summary: Tìm các task chứa từ khóa “report”. 
 *     tags: [Task Queries]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: report
 *     responses:
 *       200:
 *         description: Kết quả tìm kiếm
 */
router.get("/search", verifyToken,searchTasks);

// Sắp xếp task theo hạn gần nhất
/**
 * @swagger
 * /api/tasks/sort/dueDate:
 *   get:
 *     summary: Sắp xếp task theo hạn gần nhất
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Danh sách task đã sắp xếp
 */
router.get("/sort/dueDate", verifyToken,sortByDueDate);

// Lấy các task quá hạn nhưng chưa hoàn thành. 
/**
 * @swagger
 * /api/tasks/overdue:
 *   get:
 *     summary: Lấy task quá hạn nhưng chưa hoàn thành
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Danh sách task quá hạn
 */
router.get("/overdue", verifyToken,overdueTasks);

// Lọc các task thuộc category “Học tập” và priority “high”. 
/**
 * @swagger
 * /api/tasks/filter:
 *   get:
 *     summary: Lọc task theo category “Học tập”  và priority “high”. 
 *     tags: [Task Queries]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: Học tập
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           example: high
 *     responses:
 *       200:
 *         description: Danh sách task đã lọc
 */
router.get("/filter", verifyToken,filterTasks);

// Hiển thị task kèm tên category.
/**
 * @swagger
 * /api/tasks/with-category:
 *   get:
 *     summary: Hiển thị task kèm tên category
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Danh sách task
 */
router.get("/with-category", verifyToken,tasksWithCategory);

// Thống kê số task theo trạng thái.
/**
 * @swagger
 * /api/tasks/stats/status:
 *   get:
 *     summary: Thống kê số task theo trạng thái
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Thống kê
 */
router.get("/stats/status", verifyToken,countByStatus);

// Tìm top 3 category có nhiều task nhất. 
/**
 * @swagger
 * /api/tasks/stats/top-category:
 *   get:
 *     summary: Tìm top 3 category có nhiều task nhất
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Top category
 */
router.get("/stats/top-category", verifyToken, topCategories);

// Tính tỷ lệ hoàn thành task của từng user. 
/**
 * @swagger
 * /api/tasks/stats/completion-rate:
 *   get:
 *     summary: Tính tỷ lệ hoàn thành task của từng user
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Tỷ lệ hoàn thành
 */
router.get("/stats/completion-rate", verifyToken, completionRate);

// Tìm task được tạo nhiều nhất theo từng tháng. 
/**
 * @swagger
 * /api/tasks/stats/by-month:
 *   get:
 *     summary: Tìm task được tạo nhiều nhất theo từng tháng
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Thống kê theo tháng
 */
router.get("/stats/by-month", verifyToken, tasksByMonth);

// Tìm các task hoàn thành sau deadline. 
/**
 * @swagger
 * /api/tasks/late:
 *   get:
 *     summary: Tìm các task hoàn thành sau deadline
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Danh sách task trễ
 */
router.get("/late", verifyToken, lateCompletedTasks);

// Tính thời gian trung bình hoàn thành một task
/**
 * @swagger
 * /api/tasks/avg-time:
 *   get:
 *     summary: Tính thời gian trung bình hoàn thành một task
 *     tags: [Task Queries]
 *     responses:
 *       200:
 *         description: Thời gian trung bình
 */
router.get("/avg-time", verifyToken, avgCompletionTime);

export default router;