import { showAllUserProfiles } from "../database/db.js";

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
