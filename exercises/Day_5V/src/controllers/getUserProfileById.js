import { showUserProfileById } from "../database/db.js";

export const getUsersProfileById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [data] = await showUserProfileById(id);
    res.status(200).json({
      message: `Data of the user has been successfully fetched`,
      data: data,
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
