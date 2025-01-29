import { showAll } from "../database/db.js";

export const getAllUsers = (req, res) => {
  async function displayUsers() {
    try {
      const users = await showAll();

      const validRoles = ["Admin", "User"];
      if (users.length === 0) {
        res.status(404).json({ error: "No users found" });
      } else if (req.query) {
        const { role, isActive, ageGt } = req.query;
        let filteredUsers = users;

        if (role) {
          if (validRoles.includes(role)) {
            filteredUsers = filteredUsers.filter((user) => user.role === role);
          } else {
            return res
              .status(406)
              .json({ error: `Not a valid role,Enter a valid role` });
          }
        }

        if (isActive !== undefined) {
          const isActiveBool = isActive.toLowerCase() === "true";
          if (isActive === "true" || isActive === "false") {
            filteredUsers = filteredUsers.filter(
              (user) => user.isActive === isActiveBool
            );
          } else {
            return res
              .status(406)
              .json({ error: "Not a valid input, must be a Boolean" });
          }
        }

        if (ageGt) {
          const ageLimit = parseInt(ageGt);
          if (Number.isInteger(ageLimit) && ageLimit >= 1) {
            filteredUsers = filteredUsers.filter((user) => user.age > ageLimit);
          } else {
            return res
              .status(406)
              .json({ error: `Age can only be a positive integer` });
          }
        }

        res
          .status(200)
          .json({ Message: "List of all Filteres Users", data: filteredUsers });
      } else {
        res.status(200).json({ Message: "List of all Users", data: users });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  displayUsers();
};
