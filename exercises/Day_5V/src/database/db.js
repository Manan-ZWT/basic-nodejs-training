// IMPORTING REQUIRED MODULES AND FILES
import { pool } from "./config.js";

// QUERY FUNCTION FOR SELECTING ALL USERS FROM "users" TABLE
export async function showAll() {
  try {
    const [rows] = await pool.query(`SELECT * FROM users;`);
    return rows;
  } catch (error) {
    console.error("Error in showing all users:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR SELECTING USER USING SPECIFIC "id" FROM "users" TABLE
export async function showUser(id) {
  try {
    const [rows] = await pool.query(
      ` SELECT * FROM users LEFT JOIN user_profiles ON users.id = user_profiles.userId LEFT JOIN user_images ON users.id = user_images.userId WHERE users.id = ?;`,
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error in showing user:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR INSERITNG NEW USER FOR "users" TABLE
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

// QUERY FUNCTION FOR UPDATING USER USING SPECIFIC "id" FOR "users" TABLE
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

// QUERY FUNCTION FOR DELETING USER USING SPECIFIC "id" FOR "users" TABLE
export async function userDelete(id) {
  try {
    const [rows] = await pool.query(`DELETE FROM users WHERE id=?`, [id]);
    return rows;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR INSERTING USER IMAGE USING SPECIFIC "userid" FOR "user_images" TABLE
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

// QUERY FUNCTION FOR SELECTING ALL USER PROFILES FROM "user_profiles" TABLE
export async function showAllUserProfiles() {
  try {
    const [rows] = await pool.query(`SELECT * FROM user_profiles;`);
    return rows;
  } catch (error) {
    console.error("Error in showing all user profiles:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR SELECTING USER PROFILE USING SPECIFIC "id" FROM "user_profiles" TABLE
export async function showUserProfileById(id) {
  try {
    const [rows] = await pool.query(
      `SELECT user_profiles.userId, users.name, users.email, users.age, user_profiles.bio, users.isActive, user_profiles.linkedInUrl,user_profiles.facebookUrl, user_profiles.instaUrl, users.createdAt, user_profiles.updatedAt FROM user_profiles INNER JOIN users ON users.id = user_profiles.userId WHERE user_profiles.id = ?`,
      [id]
    );
    return rows;
  } catch (error) {
    console.error("Error in showing user profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR INSERITNG NEW USER PROFILE FOR "user_profiles" TABLE
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

// QUERY FUNCTION FOR UPDATING USER PROFILE USING SPECIFIC "id" FOR "user_profiles" TABLE
export async function updateProfileId(
  id,
  bio,
  linkedInUrl,
  facebookUrl,
  instaUrl
) {
  try {
    const [rows] = await pool.query(
      `UPDATE user_profiles SET bio=?, linkedInUrl=?, facebookUrl=?, instaUrl=? WHERE id=?`,
      [bio, linkedInUrl, facebookUrl, instaUrl, id]
    );
    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error in updating profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR DELETING USER PROFILE USING SPECIFIC "id" FOR "user_profiles" TABLE
export async function deleteUserProfile(id) {
  try {
    const [rows] = await pool.query(`DELETE FROM user_profiles WHERE id=?`, [
      id,
    ]);
  } catch (error) {
    console.error("Error in deleting profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR INSERITNG NEW USER FORM DATA FOR "user_forms" TABLE
export async function addUserForm(userId, name, email, path) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO user_forms (userId, name, email, path)
      VALUES(?, ?, ?, ?)`,
      [userId, name, email, path]
    );
  } catch (error) {
    console.error("Error in deleting profile:", error);
    throw error;
  }
}

// QUERY FUNCTION DELETING USER IMAGE USING SPECIFIC "userId" FROM "user_images" TABLE
export async function deleteUserImage(id) {
  try {
    const [result] = await pool.query(
      `DELETE FROM user_images WHERE userId = ?`,
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error deleting user image:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR VALIDATING "id" FOR "users" TABLE
export async function validUser(id) {
  try {
    const [rows] = await pool.query(`SELECT 1 FROM users WHERE id = ?`, [id]);
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in validating user profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR VALIDATING "email" FOR "users" TABLE
export async function validEmail(email) {
  try {
    const [rows] = await pool.query(`SELECT 1 FROM users WHERE email = ?`, [
      email,
    ]);
    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in checking email from users table", error);
    throw error;
  }
}

// QUERY FUNCTION FOR VALIDATING "id" FOR "user_profiles" TABLE
export async function validateProfileId(id) {
  try {
    const [rows] = await pool.query(
      `SELECT 1 FROM user_profiles WHERE id = ?`,
      [id]
    );

    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in validating user profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR VALIDATING "id" FOR "user_profiles" TABLE FROM "users" TABLEWHILE CREATING NEW USER PROFILE
export async function validateProfileIdcreate(id) {
  try {
    const [rows] = await pool.query(
      ` SELECT 1 FROM user_profiles INNER JOIN users ON user_profiles.userId= users.id WHERE user_profiles.userId= ?`,
      [id]
    );

    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in validating user: ", error);
    throw error;
  }
}
