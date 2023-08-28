import express from "express";
import {
	createTask,
	deleteTask,
	editTask,
	getAllTasks,
} from "../controllers/task.controller";
import authenticateUser from "../utils/auth.middleware";

const router = express.Router();

router.get("/tasks", authenticateUser, getAllTasks);
router.post("/tasks", authenticateUser, createTask);
router.put("/tasks/:id", authenticateUser, editTask);
router.delete("/tasks/:id", authenticateUser, deleteTask);

export default router;
