import { validUser, validEmail, updateUser } from "../database/db.js";
import { userUpdateSchema } from "../validators/userSchema.js";

export const userUpdate = async (req, res) => {
  try {
    const { name, email, age, role, isActive } = req.body;
    const userId = parseInt(req.params.id);

    const user = await validUser(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with id:${userId} not found` });
    }

    try {
      await userUpdateSchema.validate(
        { name, email, age, role, isActive },
        { abortEarly: false }
      );
    } catch (validationError) {
      return res.status(406).json({
        error: validationError.errors.join(", "),
      });
    }

    if (email && (await validEmail(email))) {
      return res.status(403).json({
        error: `User with the same email:${email} already exists.`,
      });
    }

    let updateString = "";
    const fields = { name, email, age, role, isActive };
    Object.keys(fields).forEach((key) => {
      const value = fields[key];
      if (value !== undefined) {
        updateString += `${key}=${value},`;
      }
    });

    updateString = updateString.slice(0, -1) + `, updatedAt=NOW()`;

    try {
      const data = await updateUser(updateString, userId);
      res.status(200).json({
        message: "User has been successfully updated",
        data: updateString,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
