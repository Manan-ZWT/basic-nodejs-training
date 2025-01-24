import { users } from "../../../constant.js";

const validateId = (req, res, next) => {
  if (
    req.params.id &&
    (req.method === "GET" || req.method === "PATCH" || req.method === "DELETE")
  ) {
    let userId = parseInt(req.params.id);
    if (!Number.isInteger(userId) || userId <= 0) {
      res
        .status(400)
        .json({
          Message:
            "Bad request from the user, only positive integers are allowed",
        });
      return;
    } else {
      let user = users.find((u) => u.id === userId);
      if (user) {
        next();
      } else {
        res.status(404).json({ error: "User not found from middleware" });
        return;
      }
    }
  } 
};

export default validateId;
