// IMPORTING REQUIRED MODULES AND FILES
import mysql from "mysql2";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// CONFIGURING .ENV VARIABLES AND SETTIGN UP THE DATABASE CONNECTION
dotenv.config();

export const sequelize = new Sequelize(
  process.env.D7_DB_NAME,
  process.env.D7_DB_USER,
  process.env.D7_DB_PASSWORD,
  {
    host: process.env.D7_DB_HOST,
    dialect: "mysql",
  }
);

export const dbConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

