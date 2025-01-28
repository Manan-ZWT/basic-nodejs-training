import { insertNewUserProfile, showAll } from "../database/db.js";

export const addUserProfile = async (req, res) => {
  try {
    const users = await showAll();
    console.log(req.body);
    let { userId, bio, linkedInUrl, facebookUrl, instaUrl } = req.body;
    let user = users.find((u) => u.id === userId);
    if (!user) {
      try {
        const data = await insertNewUserProfile(
          userId,
          bio,
          linkedInUrl,
          facebookUrl,
          instaUrl
        );
        res.status(200).json({
          message: "User profile has been successfully added",
          data: `userID: ${userId}, bio: ${bio}, linkedInUrl: ${linkedInUrl}, facebookUrl: ${facebookUrl}, instaurl: ${instaUrl}`,
        });
      } catch (error) {
        console.error("Error inserting user:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
