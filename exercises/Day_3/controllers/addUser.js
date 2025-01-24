import { users } from "../../../constant.js";

export const addUser = (req, res) => {
  let { name, email, age, role, isActive } = req.body;
  let user = users.find((u) => u.email === email);
  if (!user) {
    let id = users.length === 0 ? 1 : users[users.length - 1].id + 1;
    const data = `id: ${id}, name:${name}, email:${email}, age:${age}, role:${role}, isActive:${isActive}`;
    users.push({ id, name, email, age, role, isActive });
    res
      .status(200)
      .json({ Message: "User has been successfully added", data: data });
  } else {
    res
      .status(403)
      .json({ error: `User with the same email:${email} already exists.` });
  }
};
