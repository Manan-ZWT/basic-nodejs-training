// IMPORTING REQUIRED MODULES AND FILES
import fs from "fs";
import path from "path";

// CREATING LOGGER MIDDLEWARE
export const logMiddleware = (req, res, next) => {
  if (req.url !== "/favicon.ico") {
    const date = new Date();
    const logMessage = `
  Request method- ${req.method}
  Request Path- ${req.originalUrl}
  IP Address- ${req.ip}
  Time- ${date.getHours()}H:${date.getMinutes()}M:${date.getSeconds()}S\n \n`;
    fs.appendFile(
      path.join(process.cwd(), "exercises/Day_3/log.txt"),
      logMessage,
      (err) => {
        if (err) {
          return res.status(403).json({ error: "You are not allowed" });
        }
      }
    );
  }
  next();
};
