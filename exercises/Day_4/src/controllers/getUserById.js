import { showUser } from "../models/db.js";

export const getUserById = async (req, res) => {
  try {
    let userId = parseInt(req.params.id);
    const user = await showUser(userId);
    if (user) {
      res.status(200).json({
        message: `Data of the user with id:${userId} has been successfully fetched`,
        data: user,
      });
    } else {
      res.status(404).json({ message: `User with id:${userId} not found` });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
