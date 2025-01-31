// IMPORTING REQUIRED MODULES AND FILES
import { showAllUserProfiles } from "../../database/db.js";

// FUNCTION TO GET ALL USER PROFILES FROM "user_profiles" TABLE
export const getAllUsersProfiles = async (req, res) => {
  try {
    const data = await showAllUserProfiles();
    res.status(200).json({
      message: `Data has been successfully fetched`,
      data: data,
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
