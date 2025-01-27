import { insertNew, showAll } from "../models/db.js";

export const addUser = async (req, res) => {
  try {
    const users = await showAll();
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validRoles = ["Admin", "User"];

    let { name, email, age, role, isActive } = req.body;
    let user = users.find((u) => u.email === email);

    if (!user) {
      if (
        nameRegex.test(name) &&
        Number.isInteger(age) &&
        age >= 1 &&
        emailRegex.test(email) &&
        validRoles.includes(role) &&
        typeof isActive === "boolean"
      ) {
        try {
          const data = await insertNew(name, email, age, role, isActive);
          res.status(200).json({
            message: "User has been successfully added",
            data: `name: ${name}, email: ${email}, age: ${age}, role: ${role}, isActive: ${isActive}`,
          });
        } catch (error) {
          console.error("Error inserting user:", error);
          res.status(500).json({ message: "Internal server error" });
        }
      } else {
        if (!nameRegex.test(name)) {
          return res.status(406).json({
            error: "Name must only contain alphabets and spaces",
          });
        } else if (!Number.isInteger(age) || age < 1) {
          return res
            .status(406)
            .json({ error: "Age can only be a positive integer" });
        } else if (!emailRegex.test(email)) {
          return res.status(406).json({ error: "Email is Invalid" });
        } else if (!validRoles.includes(role)) {
          return res
            .status(406)
            .json({ error: "Not a valid role, enter a valid role" });
        } else if (typeof isActive !== "boolean") {
          return res
            .status(406)
            .json({ error: "Not a valid input, must be a Boolean" });
        } else {
          return res.status(500).json({ error: "Internal server error" });
        }
      }
    } else {
      return res
        .status(403)
        .json({ error: `User with the same email: ${email} already exists.` });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
