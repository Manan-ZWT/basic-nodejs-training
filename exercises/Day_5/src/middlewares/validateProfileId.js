import { validateProfileId } from "../database/db.js";

export const validateprofileid = async (req, res, next) => {
  if (
    req.params.id &&
    (req.method === "GET" || req.method === "PUT" || req.method === "DELETE")
  ) {
    let Id = parseInt(req.params.id);
    if (!Number.isInteger(Id) || Id <= 0) {
      return res.status(400).json({
        error: "Bad request from the user, only positive integers are allowed",
      });
    }
    else if(req.body.userId && req.method=== "PUT"){
        return res.status(405).json({
            error: "You are not allowed to change userId",
          });
    }
    else {
      let valid = await validateProfileId(Id);
      if (valid) {
        next();
      } else {
        return res.status(404).json({ error: "User profile not found" });
      }
    }
  }
};
