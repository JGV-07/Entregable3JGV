import { Router } from "express";
import { createCategory } from "./categories.controllers.js";

const router = Router();

//Endpoint createCategories
router.post("/categories", createCategory);

export default router;