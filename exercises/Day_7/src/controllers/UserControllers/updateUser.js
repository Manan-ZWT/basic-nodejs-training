// IMPORTING REQUIRED MODULES AND FILES
import { validUser, validEmail, updateUser } from "../../database/db.js";
import { userUpdateSchema } from "../../validators/userSchema.js";
import jwt from "jsonwebtoken";

// FUNCTION TO UPDATE USER FOR "users" TABLE
export const userUpdate = async (req, res) => {
  try {
    const { name, email, age, role, isActive, password } = req.body;
    const userId = parseInt(req.params.id);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];
    let decodedId = jwt.decode(token);
    if (userId !== parseInt(decodedId.id)) {
      return res.status(403).send({
        messsage: "Invalid user ID, You can change your information only",
      });
    }
    const user = await validUser(userId);
    if (!user) {
      return res
        .status(404)
        .json({ error: `User with id:${userId} not found` });
    }

    try {
      await userUpdateSchema.validate(
        { name, email, age, role, isActive, password },
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

    const updateFields = {};
    const fields = { name, email, age, role, isActive, password };

    Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined) {
        updateFields[key] = value;
      }
    });

    try {
      const result = await updateUser(updateFields, userId);
      res.status(200).json({
        message: "User has been successfully updated",
        data: updateFields,
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
