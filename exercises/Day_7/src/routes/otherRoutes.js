// IMPORTING REQUIRED MODULES AND FILES
import express from "express";
import {
  upload_file,
  deleteuserimage,
  adduserform,
  addUser,
  userlogin,
} from "../controllers/mainController.js";
import { checkFile } from "../../src/middlewares/fileCheck.js";
import { checkFormFile } from "../../src/middlewares/formFileCheck.js";
import { verifyToken } from "../middlewares/jwtAuth.js";

// CREATING ROUTES FOR "/user-profile" REQUEST
const router = express.Router();

router.post("/signup", addUser);
router.post("/login", userlogin);
router.post("/upload/:id", verifyToken, checkFile, upload_file);
router.delete("/user-images/:userId", verifyToken, deleteuserimage);
router.post("/user-forms/:userId", verifyToken, checkFormFile, adduserform);

export default router;
