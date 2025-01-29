import { deleteUserImage } from "../database/db.js";

export const deleteuserimage = async (req, res) => {
  try {
    let userid = parseInt(req.params.userId);
    const data = await deleteUserImage(userid);
    res.status(200).json({
      message: `User Image with userid: ${userid}has been succefully deleted`,
    });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
