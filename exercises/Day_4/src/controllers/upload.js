import multer from "multer";
import path from "path";
import fs from "fs";
import { showAll, insertImage } from "../models/db.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
      return cb(null, "./uploads");
    } else {
      return cb(null, "./uploads");
    }
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}- ${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  // if (file.fileSize <= 2 * 1024 * 1024) {
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error(`error: Only .jpg and .png files are allowed!`), false);
    }
  // } else {
  //   cb(new Error(`error: File should be smaller than 2MB`), false);
  // }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter,
});

export const upload_file = (req, res) => {
  async function handleFileUpload() {
    try {
      const users = await showAll();
      if (req.params.id) {
        const userId = parseInt(req.params.id);
        let user = users.find((u) => u.id === userId);
        if (user) {
          if (req.file) {
            try {
              const data = await insertImage(
                userId,
                req.file.filename,
                req.file.path,
                req.file.mimetype,
                path.extname(req.file.originalname),
                req.file.size
              );
              res.status(200).json({ message: "File uploaded successfully" });
            } catch (error) {
              console.error("Error inserting image:", error);
              res.status(500).json({ message: "Internal server error" });
            }
          } else {
            res.status(404).json({ message: "File not found" });
          }
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        res.status(400).json({ message: "Invalid user ID" });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  handleFileUpload();
};
