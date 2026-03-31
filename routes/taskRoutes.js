import express from "express";
import { createTask, getTasks, updateTask, deleteTask, getTasksByUser} from "../controllers/taskController.js";
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

export default router;