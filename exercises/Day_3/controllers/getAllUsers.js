import { users } from "../../../constant.js";

export const getAllUsers = (req, res) => {
  if (users.length === 0) {
    res.status(404).json({ error: "No users found" });
  } else {
    res.status(200).json({ Message: "List of all Users", data: users });
  }
};
