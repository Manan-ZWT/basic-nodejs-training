import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql
  .createPool({
    host: process.env.D5_DB_HOST,
    user: process.env.D5_DB_USER,
    password: process.env.D5_DB_PASSWORD,
    database: process.env.D5_DB_NAME,
  })
  .promise();

pool.query(
  `CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    bio TEXT NOT NULL,
    linkedInUrl VARCHAR(255) NOT NULL,
    facebookUrl  VARCHAR(255) NOT NULL,
    instaUrl VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
    );`
);