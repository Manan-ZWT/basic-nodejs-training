import express from "express";
import {
  getUserById,
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  upload, 
  upload_file
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
