import {
  insertNewUserProfile,
  validateProfileIdcreate,
} from "../database/db.js";
import { userProfileCreateSchema } from "../validators/userSchema.js";

export const addUserProfile = async (req, res) => {
  try {
    let { userId, bio, linkedInUrl, facebookUrl, instaUrl } = req.body;

    try {
      await userProfileCreateSchema.validate({
        userId,
        bio,
        linkedInUrl,
        facebookUrl,
        instaUrl,
      });
    } catch (validationError) {
      return res.status(406).json({ error: validationError.message });
    }

    const user = await validateProfileIdcreate(userId);

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
          data: `userID: ${userId}, bio: ${bio}, linkedInUrl: ${linkedInUrl}, facebookUrl: ${facebookUrl}, instaUrl: ${instaUrl}`,
        });
      } catch (error) {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(409).json({ error: "User profile already exists" });
    }
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
