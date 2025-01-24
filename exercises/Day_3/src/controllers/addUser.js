import { users} from "../../../../constant.js";
let count=2;
export const addUser = (req, res) => {
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
      // let id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
      let id = ++count;
      const data = `id: ${id}, name:${name}, email:${email}, age:${age}, role:${role}, isActive:${isActive}`;
      users.push({ id, name, email, age, role, isActive });
      res
        .status(200)
        .json({ Message: "User has been successfully added", data: data });
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
