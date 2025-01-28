import express from "express";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.js";
import logMiddleware from "./src/middlewares/logMiddleware.js";
import validateId from "./src/middlewares/validateId.js";
import checkFile from "./src/middlewares/fileCheck.js";
import {upload_file } from "./src/controllers/userController.js";

dotenv.config();
const app = express();
const port = process.env.D3_APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logMiddleware);
app.use("/users/:id", validateId);
app.use("/users", userRoutes);

app.post("/upload/:id", checkFile, upload_file);

app.get("/", (req, res) => {
  console.log("User connected to the server");
  res.status(200).send(`Welcome to the User Management API!`);
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error occurred: Server not started");
  } else {
    console.log(`Server started at port: ${port}`);
  }
});
