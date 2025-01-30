// IMPORTING REQUIRED MODULES AND FILES
// import { pool } from "./config.js";
import { User } from "../models/usersModel.js";
import { UserImage } from "../models/usersImagesModel.js";
import { UserProfile } from "../models/userProfileModel.js";

// QUERY FUNCTION FOR SELECTING ALL USERS FROM "users" TABLE
export async function showAll() {
  User.sync({ alter: true });
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("Error in showing all users:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR SELECTING USER USING SPECIFIC "id" FROM "users" TABLE
export async function showUser(id) {
  User.sync({ alter: true });
  try {
    const user = await User.findByPk(id);
    return user;
  } catch (error) {
    console.error("Error in showing user:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR INSERITNG NEW USER FOR "users" TABLE
export async function insertNew(name, email, age, role, isActive) {
  User.sync({ alter: true });
  try {
    const data = await User.create({
      name: name,
      email: email,
      age: age,
      role: role,
      isActive: isActive,
    });
    console.log(data);
  } catch (error) {
    console.error("Error inserting new user:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR UPDATING USER USING SPECIFIC "id" FOR "users" TABLE
export async function updateUser(updateFields, id) {
  User.sync({ alter: true });
  try {
    const [rows] = await User.update(updateFields, {
      where: { id },
    });

    return rows;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR DELETING USER USING SPECIFIC "id" FOR "users" TABLE
export async function userDelete(id) {
  User.sync({ alter: true });
  try {
    const rows = await User.destroy({
      where: { id },
    });
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
  UserImage.sync({ alter: true });
  try {
    const rows = await UserImage.create({
      userId: userid,
      imageName: imagename,
      path: path,
      mimeType: mimetype,
      extension: extension,
      size: size,
    });
    return rows;
  } catch (error) {
    console.error("Error inserting image:", error);
    throw error;
  }
}

// QUERY FUNCTION DELETING USER IMAGE USING SPECIFIC "userId" FROM "user_images" TABLE
export async function deleteUserImage(id) {
  UserImage.sync({ alter: true });
  try {
    const result = await UserImage.destroy({
      where: { userId: id },
    });

    return result;
  } catch (error) {
    console.error("Error deleting user image:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR SELECTING ALL USER PROFILES FROM "user_profiles" TABLE
export async function showAllUserProfiles() {
  UserProfile.sync({ alter: true });
  try {
    const rows = await UserProfile.findAll();
    return rows;
  } catch (error) {
    console.error("Error in showing all user profiles:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR SELECTING USER PROFILE USING SPECIFIC "id" FROM "user_profiles" TABLE
export async function showUserProfileById(id) {
  UserProfile.sync({ alter: true });
  try {
    const userprofile = await UserProfile.findOne({
      where: { id },
    });
    return userprofile;
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
  UserProfile.sync({ alter: true });
  try {
    const rows = UserProfile.create({
      userId: userId,
      bio: bio,
      linkedInUrl: linkedInUrl,
      facebookUrl: facebookUrl,
      instaUrl: instaUrl,
    });
    return rows;
  } catch (error) {
    console.error("Error in inserting new user profile:", error);
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
  UserProfile.sync({ alter: true });
  try {
    const rows = await UserProfile.update(
      {
        bio: bio,
        linkedInUrl: linkedInUrl,
        facebookUrl: facebookUrl,
        instaUrl: instaUrl,
      },
      { where: { id } }
    );
    console.log("Profile updated successfully");
  } catch (error) {
    console.error("Error in updating profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR DELETING USER PROFILE USING SPECIFIC "id" FOR "user_profiles" TABLE
export async function deleteUserProfile(id) {
  UserProfile.sync({ alter: true });
  try {
    const rows = await UserProfile.destroy({
      where: { id },
    });
    return rows;
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

// QUERY FUNCTION FOR VALIDATING "id" FOR "users" TABLE
export async function validUser(id) {
  try {
    const user = await User.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    return user;
  } catch (error) {
    console.error("Error in validating user profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR VALIDATING "email" FOR "users" TABLE
export async function validEmail(email) {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
      attributes: ["id"],
    });

    return user;
  } catch (error) {
    console.error("Error in checking email from users table", error);
    throw error;
  }
}

// QUERY FUNCTION FOR VALIDATING "id" FOR "user_profiles" TABLE
export async function validateProfileId(id) {
  try {
    const user = await UserProfile.findOne({
      where: {
        id: id,
      },
      attributes: ["id"],
    });

    return user;
  } catch (error) {
    console.error("Error in validating user profile:", error);
    throw error;
  }
}

// QUERY FUNCTION FOR VALIDATING "id" FOR "user_profiles" TABLE FROM "users" TABLEWHILE CREATING NEW USER PROFILE
export async function validateProfileIdCreate(id) {
  try {
    const profile = await UserProfile.findOne({
      where: { userId: id },
      include: [
        {
          model: User,
          required: true,
        },
      ],
    });

    if (profile) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in validating user: ", error);
    throw error;
  }
}
