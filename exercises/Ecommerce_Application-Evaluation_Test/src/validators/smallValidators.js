import { User } from "../models/usersModel.js";

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

export async function validPass(password) {
  try {
    const user = await User.findOne({
      where: {
        password: password,
      },
      attributes: ["id"],
    });
    return user;
  } catch (error) {
    console.error("Error in checking password from users table", error);
    throw error;
  }
}