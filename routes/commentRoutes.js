import express from "express";
import {
  createComment,
  getCommentsByTask,
  updateComment,
  deleteComment
} from "../controllers/commentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Quản lý bình luận
 */

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Tạo comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               taskId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo thành công
 */
router.post("/", createComment);

/**
 * @swagger
 * /api/comments/{taskId}:
 *   get:
 *     summary: Lấy comment theo task
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Danh sách comment
 */
router.get("/:taskId", getCommentsByTask);

/**
 * @swagger
 * /api/comments/{id}:
 *   put:
 *     summary: Cập nhật comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", updateComment);

/**
 * @swagger
 * /api/comments/{id}:
 *   delete:
 *     summary: Xóa comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa thành công
 */
router.delete("/:id", deleteComment);

export default router;