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

export async function showAll() {
  try {
    const [rows] = await pool.query(`SELECT * FROM users;`);
    return rows;
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error;
  }
}

export async function showUser(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id=?;`, [id]);
    return rows;
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error;
  }
}

export async function insertNew(name, email, age, role, isActive) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO users (name, email, age, role, isActive) 
        VALUES (?, ?, ?, ?, ?)`,
      [name, email, age, role, isActive]
    );
    return rows;
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error;
  }
}

export async function updateUser(update_string, id) {
  try {
    const [rows] = await pool.query(
      `UPDATE users SET ${update_string} WHERE id=?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

export async function deleteUser(){
  try {
    const [rows] = await pool.query(
      `UPDATE users SET ${update_string} WHERE id=?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}