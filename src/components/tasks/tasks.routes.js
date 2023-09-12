import { Router } from "express";
import { createTaskByUser, deleteTask, getAllTaskByUser, updateTaskById } from "./tasks.controller.js";

const router = Router();

//Enpoint createTaskByUser
router.post('/users/:id/tasks', createTaskByUser);

//Enpoint getAllTaskByUser and categories
router.get('/users/:id/tasks', getAllTaskByUser)

//Endpoint updateTask
router.put('/task/:id', updateTaskById )

//Enpoint deleteTask
router.delete('/delete/tasks/:id', deleteTask)

export default router;
