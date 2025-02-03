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

// CREATING ROUTES FOR "/user-profile" REQUEST
const router = express.Router();

router.post("/signup", addUser);
router.post("/login", userlogin);
router.post("/upload/:id", checkFile, upload_file);
router.delete("/user-images/:userId", deleteuserimage);
router.post("/user-forms/:userId", checkFormFile, adduserform);

export default router;
