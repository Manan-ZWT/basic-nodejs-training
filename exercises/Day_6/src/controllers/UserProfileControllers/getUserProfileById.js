// IMPORTING REQUIRED MODULES AND FILES
import { showUserProfileById } from "../../database/db.js";

// FUNCTION TO GET USER PROFILE BY "id" FROM "user_profiles" TABLE
export const getUsersProfileById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await showUserProfileById(id);
    res.status(200).json({
      message: `Data of the user has been successfully fetched`,
      data: data,
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
