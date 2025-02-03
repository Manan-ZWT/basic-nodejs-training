// IMPORTING REQUIRED MODULES AND FILES
import express from "express";
import {
  getUserById,
  getAllUsers,
  userUpdate,
  deleteUser,
} from "../controllers/mainController.js";
import { verifyToken } from "../middlewares/jwtAuth.js";

// CREATING ROUTES FOR "/user" REQUEST
const router = express.Router();
router.use(verifyToken)
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.patch("/:id", userUpdate);
router.delete("/:id", deleteUser);

export default router;
