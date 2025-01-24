import { users } from "../../../constant.js";

export const deleteUser = (req, res) => {
  let userId = parseInt(req.params.id);
  let userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    const message = `User with id:${userId} has been succesfully deleted`;
    users.splice(userIndex, 1);
    res.status(200).json({ message: message });
  }
};
