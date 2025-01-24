import { users } from "../../../constant.js";

export const updateUser = (req, res) => {
  if (req.params.id) {
    res.status(400).json({
      Message: "Bad request from the user, only positive integers are allowed",
    });
  } else {
    let { name, email, age, role, isActive } = req.body;
    let userId = parseInt(req.params.id);
    let user = users.find((u) => u.id === userId);
    if (user) {
      user.name = name;
      user.email = email;
      user.age = age;
      user.role = role;
      user.isActive = isActive;
      res.status(200).json({
        message: `Data of the User with id:${userId} has been succesfully updated`,
        data: user,
      });
    }
  }
};
