import express from "express";
import {
  getUserById,
  getAllUsers,
  addUser,
  userUpdate,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.patch("/:id", userUpdate);
router.delete("/:id", deleteUser);

export default router;
