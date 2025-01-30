// IMPORTING REQUIRED MODULES AND FILES
import { validUser } from "../database/db.js";

// CREATING A VALIDATION MIDDLEWARE FOR CHECKING ANY BAD REQUEST FROM THE USER FOR "id" FOR "user" TABLE
export const validateId = async(req, res, next) => {
    try {
      if (
        req.params.id &&
        (req.method === "GET" ||
          req.method === "PATCH" ||
          req.method === "DELETE")
      ) {
        let userId = parseInt(req.params.id);
        if (!Number.isInteger(userId) || userId <= 0) {
          return res.status(400).json({
            error:
              "Bad request from the user, only positive integers are allowed",
          });
        } else {
          let valid = await validUser(userId);
          if (valid) {
            next();
          } else {
            return res.status(404).json({ error: "User not found" });
          }
        }
      } else if (req.params.id && req.method === "POST") {
        return res.status(400).json({
          error: "Bad request from the user",
        });
      } else {
        return res.status(500).json({
          error: "Internal server error in processig the request",
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error" });
    }
}

