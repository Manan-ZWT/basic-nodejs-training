// IMPORT ALL REQUIRED MODULES AND FILES
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import userProfileRoutes from "./src/routes/userProfileRoutes.js";
import otherRoutes from "./src/routes/otherRoutes.js";
import { logMiddleware } from "./src/middlewares/logMiddleware.js";
import { validateId } from "./src/middlewares/validateId.js";
import { validateprofileid } from "./src/middlewares/validateProfileId.js";
import { dbConnect, sequelize } from "./src/database/config.js";

// CONFIGURING .ENV VARIABLES
dotenv.config();
const app = express();
const port = process.env.D7_APP_PORT;

(async () => {
  await sequelize.sync({ alter: true });
})();

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logMiddleware);
app.use("/users/:id", validateId);
app.use("/user-profile/:id", validateprofileid);
app.use("/users", userRoutes);
app.use("/user-profile", userProfileRoutes);
app.use("/", otherRoutes);

// MAIN END POINT
app.get("/", (req, res) => {
  console.log("User connected to the server");
  res.status(200).send(`Welcome to the User Management API!`);
});

// LISTENING PORT
app.listen(port, (err) => {
  if (err) {
    console.error("Error occurred: Server not started");
  } else {
    console.log(`Server started at port: ${port}`);
    dbConnect();
  }
});
