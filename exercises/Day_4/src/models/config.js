import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql
  .createPool({
    host: process.env.D4_DB_HOST,
    user: process.env.D4_DB_USER,
    password: process.env.D4_DB_PASSWORD,
    database: process.env.D4_DB_NAME,
  })
  .promise();

pool.query(
  `CREATE TABLE IF NOT EXISTS users 
(id INT AUTO_INCREMENT PRIMARY KEY,
name TEXT NOT NULL, 
email VARCHAR(255) UNIQUE, 
age INT, 
role VARCHAR(255), 
isActive BOOLEAN, 
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, 
updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)`
);

pool.query(
  `CREATE TABLE IF NOT EXISTS user_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    imageName VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    mimeType VARCHAR(255) NOT NULL,
    extension VARCHAR(255) NOT NULL,
    size BIGINT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
    );`
);