import { showUserProfileById, showAll } from "../database/db.js";

export const getUsersProfileById = async (req, res) => {
  try {
    const users = await showAll();
    let userId = parseInt(req.params.id);
    let user = users.find((u) => u.id === userId);
    if (user) {
      try {
        const [data] = await showUserProfileById(userId);
        res.status(200).json({
          message: `Data of the user with userid:${data.userId} has been successfully fetched`,
          data: data,
        });
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    } else {
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
