import multer from "multer";
import path from "path";
import fs from "fs";

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Only .jpg and .png files are allowed!"), false);
  }
};

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

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("uploaded_file");

const checkFile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File should be smaller than 2MB" });
      }
    } else if (err) {
      if (err.message === "Only .jpg and .png files are allowed!") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default checkFile;
