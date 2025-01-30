// IMPORTING REQUIRED MODULES AND FILES
import mysql from "mysql2";
import dotenv from "dotenv";

// CONFIGURING .ENV VARIABLES AND SETTIGN UP THE DATABASE CONNECTION
dotenv.config();
export const pool = mysql
  .createPool({
    host: process.env.D5_DB_HOST,
    user: process.env.D5_DB_USER,
    password: process.env.D5_DB_PASSWORD,
    database: process.env.D5_DB_NAME,
  })
  .promise();

// QUERY FOR CREATING "users" TABLE
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

// QUERY FOR CREATING "user_image" TABLE
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

// QUERY FOR CREATING "user_profiles" TABLE
pool.query(
  `CREATE TABLE IF NOT EXISTS user_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT UNIQUE,
    bio TEXT NOT NULL,
    linkedInUrl VARCHAR(255) NOT NULL,
    facebookUrl  VARCHAR(255) NOT NULL,
    instaUrl VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
    );`
);

// QUERY FOR CREATING "user_forms" TABLE
pool.query(
  `CREATE TABLE IF NOT EXISTS user_forms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    path VARCHAR(225),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id)
  );`
);
