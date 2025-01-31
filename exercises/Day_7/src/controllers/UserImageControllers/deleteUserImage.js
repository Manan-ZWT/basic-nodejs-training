// IMPORTING REQUIRED MODULES AND FILES
import { deleteUserImage } from "../../database/db.js";

// FUNCTION TO DELETE USER IMAGE FROM "user_images" TABLE
export const deleteuserimage = async (req, res) => {
  try {
    let userid = parseInt(req.params.userId);
    const data = await deleteUserImage(userid);
    res.status(200).json({
      message: `User Image with userid: ${userid} has been succefully deleted`,
    });
  } catch (error) {
    console.error("Error deleting user image:", error);
    res.status(500).json({ message: "User not found" });
  }
};
