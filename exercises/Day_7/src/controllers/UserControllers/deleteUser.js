// IMPORTING REQUIRED MODULES AND FILES
import { parse } from "dotenv";
import { userDelete } from "../../database/db.js";
import jwt from "jsonwebtoken";
// FUNCTION TO DELETE USER FROM "users" TABLE
export const deleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];
    let decodedId = jwt.decode(token);
    if (userId && userId === parseInt(decodedId.id)) {
      const data = await userDelete(userId);
      const message = `User with id:${userId} has been successfully deleted`;
      res.status(200).json({ message: message });
    } else {
      res
        .status(403)
        .json({
          message: "Invalid user ID, You can only delete your information",
        });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
