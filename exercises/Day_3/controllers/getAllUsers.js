import { users } from "../../../constant.js";

export const getAllUsers = (req, res) => {
  if (users.length === 0) {
    res.status(404).json({ error: "No users found" });
  } else if (req.query) {
    const { role, isActive, ageGt } = req.query;
    let filteredUsers = users;

    if (role) {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    if (isActive !== undefined) {
      const isActiveBool = isActive === "true";
      filteredUsers = filteredUsers.filter(
        (user) => user.isActive === isActiveBool
      );
    }

    if (ageGt) {
      const ageLimit = parseInt(ageGt);
      if (Number.isInteger(ageLimit)) {
        filteredUsers = filteredUsers.filter((user) => user.age > ageLimit);
      }
    }

    res
      .status(200)
      .json({ Message: "List of all Filteres Users", data: filteredUsers });
  } else {
    res.status(200).json({ Message: "List of all Users", data: users });
  }
};
