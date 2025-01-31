// IMPORTING REQUIRED MODULES AND FILES
import {
  insertNewUserProfile,
  validateProfileIdCreate,
} from "../../database/db.js";
import { userProfileCreateSchema } from "../../validators/userSchema.js";

// FUNCTION TO ADD NEW USER PROFILE IN "user_profiles" TABLE
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

    const userExists = await validateProfileIdCreate(userId);

    if (userExists) {
      return res.status(409).json({ error: "User profile already exists" });
    }

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
        data: {
          userId,
          bio,
          linkedInUrl,
          facebookUrl,
          instaUrl,
        },
      });
    } catch (insertError) {
      console.error("Error inserting user profile:", insertError);
      res.status(500).json({ error: "Failed to insert profile" });
    }
  } catch (error) {
    console.error("Error in addUserProfile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
