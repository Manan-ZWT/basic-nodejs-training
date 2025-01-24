import { users } from "../../../../constant.js";

export const getUserById = (req, res) => {
  let userId = parseInt(req.params.id);
  let user = users.find((u) => u.id === userId);
  if (user) {
    res
      .status(200)
      .json({
        Message: `Data of the user with id:${userId} has been succesfully fetched`,
        data: user,
      });
  }
};
