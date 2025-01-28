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

export async function showAllUserProfiles() {
  try {
    const [rows] = await pool.query(`SELECT * FROM user_profiles;`);
    return rows;
  } catch (error) {
    console.error("Error in showing all user profiles:", error);
    throw error;
  }
}

export async function showUserProfileById(userId) {
  try {
    const [rows] = await pool.query(
      `SELECT user_profiles.userId, users.name, users.email, users.age, user_profiles.bio, users.isActive, user_profiles.linkedInUrl,user_profiles.facebookUrl, user_profiles.instagramUrl, users.createdAt, user_profiles.updatedAtFROM user_profiles INNER JOIN users ON users.id = user_profiles.userId WHERE user_profiles.userId = ?`,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error("Error in showing user profile:", error);
    throw error;
  }
}

export async function insertNewUserProfile(
  userId,
  bio,
  linkedInUrl,
  facebookUrl,
  instaUrl
) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO user_profiles (userId, bio, linkedInUrl, facebookUrl, instaUrl) 
        VALUES (?, ?, ?, ?, ?)`,
      [userId, bio, linkedInUrl, facebookUrl, instaUrl]
    );
    return rows;
  } catch (error) {
    console.error("Error in showing all users:", error);
    throw error;
  }
}
