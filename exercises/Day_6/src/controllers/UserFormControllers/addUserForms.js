// IMPORTING REQUIRED MODULES AND FILES
import { addUserForm, validUser } from "../../database/db.js";
import { userFormSchema } from "../../validators/userSchema.js";
import path from "path";

// FUNCTION TO ADD NEW USER FORM DATA WITH PDF IN "user_forms" TABLE
export const adduserform = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, email } = req.body;

    try {
      await userFormSchema.validate({ name, email });
    } catch (validationError) {
      return res.status(406).json({ error: validationError.message });
    }

    const user = await validUser(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "File upload is required" });
    }

    try {
      const pathname = req.file.path;
      const data = await addUserForm(userId, name, email, pathname);

      res.status(200).json({
        message: "User form data has been successfully added",
        data: { userId, name, email, pathname },
      });
    } catch (error) {
      console.error("Error adding user form:", error);
      res.status(500).json({ error: "Failed to add user form data" });
    }
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
