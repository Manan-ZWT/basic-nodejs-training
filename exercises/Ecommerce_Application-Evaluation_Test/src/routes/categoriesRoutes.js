// IMPORTING REQUIRED MODULES AND FILES
import express from "express";
import { verifyToken } from "../middlewares/jwtAuth.js";
import { verifyRole } from "../middlewares/validateRole.js";
import {
  createCategory,
  showAllCategories,
} from "../controllers/categoriesController.js";

// CREATING ROUTES FOR "/user" REQUEST
const router = express.Router();
router.get("/categories", verifyToken, showAllCategories);
router.post("/categories", verifyToken, verifyRole("admin"), createCategory);

export default router;
