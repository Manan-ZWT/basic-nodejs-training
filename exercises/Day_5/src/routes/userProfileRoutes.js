import express from "express";
import {
  getAllUsersProfiles,
  addUserProfile,
  getUsersProfileById,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getAllUsersProfiles);
router.get("/:id", getUsersProfileById);
router.post("/", addUserProfile);
// router.put("/:id", updateUserProfile);
// router.delete("/:id", deleteUserProfile);

export default router;
