import { Router } from "express";
import { createUser } from "./users.controller.js";

const router = Router();

//Endpoint createUsers
router.post("/users", createUser);

export default router;