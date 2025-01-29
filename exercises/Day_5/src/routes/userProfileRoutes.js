import express from "express";
import {
  getAllUsersProfiles,
  addUserProfile,
  getUsersProfileById,
  updateprofileid,
  deleteuserprofile,
} from "../controllers/userController.js";
const router = express.Router();

router.get("/", getAllUsersProfiles);
router.get("/:id", getUsersProfileById);
router.post("/", addUserProfile);
router.put("/:id", updateprofileid);
router.delete("/:id", deleteuserprofile);

export default router;
