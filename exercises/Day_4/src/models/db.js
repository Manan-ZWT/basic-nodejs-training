import { pool } from "./config.js";

export async function showAll() {
  try {
    const [rows] = await pool.query(`SELECT * FROM users;`);
    return rows;
  } catch (error) {
    console.error("Error in showing all users:", error);
    throw error;
  }
}

export async function showUser(id) {
  try {
    const [rows] = await pool.query(`SELECT * FROM users WHERE id=?;`, [id]);
    return rows;
  } catch (error) {
    console.error("Error in showing user:", error);
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

export async function userDelete(id) {
  try {
    const [rows] = await pool.query(`DELETE FROM users WHERE id=?`, [id]);
    return rows;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

export async function insertImage(
  userid,
  imagename,
  path,
  mimetype,
  extension,
  size
) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO user_images (userId,imageName, path, mimeType, extension, size) 
        VALUES (?, ?, ?, ?, ?, ?)`,
      [userid, imagename, path, mimetype, extension, size]
    );
    return rows;
  } catch (error) {
    console.error("Error inserting image:", error);
    throw error;
  }
}
