import express from "express";
import mongoose from "mongoose";

import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/task.js";
import categoryRoutes from "./routes/category.js";
import commentRoutes from "./routes/comment.js";
import userRoutes from "./routes/user.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect("mongodb://127.0.0.1:27017/BT1_CK");

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API docs available at http://localhost:${PORT}/api-docs`);
});