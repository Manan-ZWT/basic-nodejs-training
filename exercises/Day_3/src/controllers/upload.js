import multer from "multer";
import path from "path";
import fs from "fs";
import { users } from "../../../../constant.js";

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

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Only .jpg and .png files are allowed!"), false);
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1000 * 1000 },
  fileFilter: fileFilter,
});

export const upload_file = (req, res) => {
  if (req.params.id) {
    const userId = parseInt(req.params.id);
    let user = users.find((u) => u.id === userId);
    if (user) {
      if (req.file) {
        user.imageURL = path.resolve(req.file.path);
        res.status(200).json({ message: "File uploaded successfully" });
      } else {
        res.status(404).json({ message: "File not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid user ID" });
  }
};
