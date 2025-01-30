// IMPORTING REQUIRED MODULES AND FILES
import { deleteUserProfile } from "../database/db.js";

// FUNCTION TO DELETE USER PROFILE FROM "user_profiles" TABLE
export const deleteuserprofile = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const row = await deleteUserProfile(id);
    if (row) {
      res.status(200).json({
        message: `User profile with id: ${id}has been successfully deletef`,
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
