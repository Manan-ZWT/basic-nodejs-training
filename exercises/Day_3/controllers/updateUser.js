import { users } from "../../../constant.js";

export const updateUser = (req, res) => {
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validRoles = ["Admin", "User"];

  let { name, email, age, role, isActive } = req.body;
  let userId = parseInt(req.params.id);
  let user = users.find((u) => u.id === userId);
  let user_email = users.find((u) => u.email === email && u.id !== userId);

  if (!user_email) {
    if (user) {
      if (name && nameRegex.test(name)) {
        user.name = name;
      }
      if (email && emailRegex.test(email)) {
        user.email = email;
      }
      if (age && Number.isInteger(age) && age >= 1) {
        user.age = age;
      }
      if (role && validRoles.includes(role)) {
        user.role = role;
      }
      if (isActive && typeof isActive === "boolean") {
        user.isActive = isActive;
      }
      res.status(200).json({
        message: `Data of the User with id:${userId} has been succesfully updated`,
        data: user,
      });
    } else {
      if (!nameRegex.test(name)) {
        return res.status(406).json({
          error: `Name must only contain alphabets and spaces`,
        });
      } else if (!Number.isInteger(age) || age < 1) {
        return res
          .status(406)
          .json({ error: `Age can only be a positive integer` });
      } else if (!emailRegex.test(email)) {
        return res.status(406).json({ error: `Email is Invalid` });
      } else if (!validRoles.includes(role)) {
        return res
          .status(406)
          .json({ error: `Not a valid role,Enter a valid role` });
      } else if (!typeof isActive === "boolean") {
        res.status(406).json({ error: `Not a valid input, must be a Boolean` });
      } else {
        res.status(500).json({ error: `Internal server error` });
      }
    }
  } else {
    res
      .status(403)
      .json({ error: `User with the same email:${email} already exists.` });
  }
};
