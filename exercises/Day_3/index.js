import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { users } from "./constant";

const app = express();
const port=process.env.D3_APP_PORT;

app.get("/",(req, res)=>{
    console.log("User connected to the server");
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the User Management API!");
});

app.listen(port,(err)=>{
if(err){
    console.error("Erro occured: Server not started")
}
else{
    console.log(`Server started at port: ${port}`);
}
});
