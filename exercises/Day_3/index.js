import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import logMiddleware from "./middlewares/logMiddleware.js";
import userValidationMiddleware from "./middlewares/validateId.js";

dotenv.config();
const app = express();
const port = process.env.D3_APP_PORT;

app.use(express.json());
app.use(logMiddleware);
app.use("/users/:id", userValidationMiddleware);
app.use("/users", userRoutes);

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
