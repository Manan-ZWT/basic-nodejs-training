import { showAll } from "../database/db.js";

const validateId = (req, res, next) => {
  async function displayUsers() {
    try {
      const users = await showAll();
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
          let user = users.find((u) => u.id === userId);
          if (user) {
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
  displayUsers();
};

export default validateId;
