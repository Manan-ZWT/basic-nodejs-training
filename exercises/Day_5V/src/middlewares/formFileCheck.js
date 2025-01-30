// IMPORTING REQUIRED MODULES AND FILES
import multer from "multer";
import path from "path";
import fs from "fs";

// FILTER FOR FILE TO CHECK FILE TYPE ".pdf"
const fileFilter = (req, file, cb) => {
  const filetypes = /pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Only .pdf files are allowed!"), false);
  }
};

// CONFIGURING DISKSTORAGE FOR MULTER
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

// CONFIGURING UPLOAD MIDDLEWARE AND FILE SIZE "15MB" FILTER FOR MULTER
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 15 * 1024 * 1024 },
}).single("uploaded_form_file");

// EXPORTING FUNCTION TO CHECK THE VALIDATION FOR THE FILE
export const checkFormFile = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res
          .status(400)
          .json({ message: "File should be smaller than 15MB" });
      }
    } else if (err) {
      if (err.message === "Only .pdf files are allowed!") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};
