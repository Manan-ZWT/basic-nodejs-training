import jwt from "jsonwebtoken";
import { secretKey } from "../config/config.js";

export const verifyRole = (...roles) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];
    let decodedmsg = jwt.verify(token, secretKey);
    if (roles.includes(decodedmsg.role)) {
      next();
    } else {
      res.status(403).json({ error: "Access denied" });
    }
  };
};
