import { updateProfileId } from "../database/db.js";

export const updateprofileid = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let { bio, linkedInUrl, facebookUrl, instaUrl } = req.body;
    try {
      const data = await updateProfileId(
        id,
        bio,
        linkedInUrl,
        facebookUrl,
        instaUrl,
        id
      );
      res.status(200).json({
        message: `User with profile id: ${id} has been successfully updated`,
        data: `bio: ${bio}, linkedinurl: ${linkedInUrl}, facebookurl: ${facebookUrl}, instaurl: ${instaUrl}`,
      });
    } catch (error) {
      console.error("Error inserting user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
