import path from "path";
import { showAll, insertImage } from "../models/db.js";

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
              return res
                .status(200)
                .json({ message: "File uploaded successfully" });
            } catch (error) {
              console.error("Error inserting image:", error);
              return res.status(500).json({ message: "Internal server error" });
            }
          } else {
            return res.status(404).json({ message: "File not found" });
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
