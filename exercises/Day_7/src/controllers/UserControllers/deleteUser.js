// IMPORTING REQUIRED MODULES AND FILES
import { userDelete } from "../../database/db.js";

// FUNCTION TO DELETE USER FROM "users" TABLE
export const deleteUser = async (req, res) => {
    try {
      let userId = parseInt(req.params.id);
      if (userId) {
        const data = await userDelete(userId);
        const message = `User with id:${userId} has been successfully deleted`;
        console.log(data);
        res.status(200).json({ message: message });
      } else {
        res.status(400).json({ message: "Invalid user ID" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
