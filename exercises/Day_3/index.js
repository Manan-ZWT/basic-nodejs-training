import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
dotenv.config();
import { users } from "./constant.js";

const app = express();
const port = process.env.D3_APP_PORT;

app.use(express.json());

app.use((req, res, next) => {
  if (req.url !== "/favicon.ico") {
    const date = new Date();
    const logMessage = `
    Request method- ${req.method}
    Request Path- ${req.originalUrl}
    IP Address- ${req.ip}
    Time- ${date.getHours()}H:${date.getMinutes()}M:${date.getSeconds()}S\n \n`;
    fs.appendFile(path.join(process.cwd(),"\\exercises\\Day_3\\log.txt"), logMessage, (err) => {
      if (err) {
        res.status(403).end("You are not allowed");
      }
    });
  }
  next();
});

app.use("/users/:id",(req,res,next)=>{
  if(req.params.id && (req.method==="GET" || req.method==="PATCH") || req.method==="DELETE"){
    let userId = parseInt(req.params.id);
    let user = users.find((u) => u.id === userId);
    if (user) {
      next();
    } else {
      res.status(404).json({ error: "User not found from middleware" });
      return;
    }
  }
});



app.get("/", (req, res) => {
  console.log("User connected to the server");
  res.status(200).send(`Welcome to the User Management API!`);
});

app.get("/users", (req, res) => {
  if (users.length === 0) {
    res.status(404).send("No users found");
  } else {
    res.status(200).json(users);
  }
});

app.get("/users/:id", (req, res) => {
  let userId = parseInt(req.params.id);
  let user = users.find((u) => u.id === userId);

  if (user) {
    res.status(200).json(user);
  }
});

app.post("/users", (req, res) => {
  console.log(`New entry:\n${req.body}`);
  let { name, email, age, role, isActive } = req.body;
  let id = users.length === 0 ? 1 : users[users.length-1].id + 1;
  users.push({ id, name, email, age, role, isActive });
  res.status(200).send("User has been succesfully added");
});

app.patch("/users/:id", (req, res) => {
  console.log(req.body);
  let { name, email, age, role, isActive } = req.body;
  let userId = parseInt(req.params.id);
  let user = users.find((u) => u.id === userId);
  if (user) {
    user.name = name;
    user.email = email;
    user.age = age;
    user.role = role;
    user.isActive = isActive;
    res.status(200).send("User has been succesfully updated");
  } 
});

app.delete("/users/:id", (req, res) => {
  let userId = parseInt(req.params.id);
  let userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    res.status(200).json("User has been succesfully deleted");
  }
});

app.listen(port, (err) => {
  if (err) {
    console.error("Error occured: Server not started");
  } else {
    console.log(`Server started at port: ${port}`);
  }
});
