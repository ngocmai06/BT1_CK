import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Quản lý danh mục
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Tạo category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tạo thành công
 */
router.post("/", createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Lấy tất cả category
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Danh sách category
 */
router.get("/", getCategories);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Cập nhật category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 */
router.put("/:id", updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Xóa category
 *     tags: [Categories]
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
router.delete("/:id", deleteCategory);

export default router;