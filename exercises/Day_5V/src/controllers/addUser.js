import { insertNew, validEmail } from "../database/db.js";
import { userCreateSchema } from "../validators/userSchema.js";

export const addUser = async (req, res) => {
  try {
    const { name, email, age, role, isActive } = req.body;

    try {
      await userCreateSchema.validate({ name, email, age, role, isActive });
    } catch (validationError) {
      return res.status(406).json({ error: validationError.message });
    }

    const emailExists = await validEmail(email);
    if (emailExists) {
      return res.status(403).json({
        error: `User with the same email: ${email} already exists.`,
      });
    }

    const data = await insertNew(name, email, age, role, isActive);
    res.status(200).json({
      message: "User has been successfully added",
      data: { name, email, age, role, isActive },
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
