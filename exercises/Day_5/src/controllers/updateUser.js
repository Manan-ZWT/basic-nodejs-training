import { showAll, updateUser } from "../database/db.js";

export const userUpdate = (req, res) => {
  async function displayUsers() {
    try {
      const users = await showAll();

      const nameRegex = /^[a-zA-Z\s]+$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const validRoles = ["Admin", "User"];

      let { name, email, age, role, isActive } = req.body;
      let userId = parseInt(req.params.id);
      let user = users.find((u) => u.id === userId);
      let user_email = users.find((u) => u.email === email && u.id !== userId);
      let update_string = ``;

      if (!user_email) {
        if (user) {
          if (name && nameRegex.test(name)) {
            user.name = name;
            update_string += `name="${name}",`;
          }
          if (email && emailRegex.test(email)) {
            user.email = email;
            update_string += `email="${email}",`;
          }
          if (age && Number.isInteger(age) && age >= 1) {
            user.age = age;
            update_string += `age="${age}",`;
          }
          if (role && validRoles.includes(role)) {
            user.role = role;
            update_string += `role="${role}",`;
          }
          if (typeof isActive === "boolean") {
            user.isActive = isActive;
            update_string += `isActive=${isActive},`;
          }
          update_string += `updatedAt= NOW()`;

          try {
            const data = await updateUser(update_string, userId);
            console.log(data);
            res.status(200).json({
              message: "User has been successfully updated",
              data: update_string,
            });
          } catch (error) {
            console.error("Error updating user:", error);
            res.status(500).json({ message: "Internal server error" });
          }
        } else {
          res.status(404).json({ error: `User with id:${userId} not found` });
        }
      } else {
        res
          .status(403)
          .json({ error: `User with the same email:${email} already exists.` });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  displayUsers();
};
