import { User } from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import { validEmail } from "../validators/smallValidators.js";
import { secretKey } from "../config/config.js";
import { userUpdateSchema } from "../validators/userValidator.js";

export const getUserProfile = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const id = parseInt(decodedmsg.id);

    const data = await User.findByPk(id);
    res.status(200).json({
      message: `User data of id: ${id} has been succesfully fetched`,
      data: data,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const id = parseInt(decodedmsg.id);

    const { first_name, last_name, email, password, role } = req.body;
    try {
      await userUpdateSchema.validate({
        first_name,
        last_name,
        email,
        password,
        role,
      });
    } catch (validationError) {
      return res.status(406).json({ error: validationError.message });
    }

    if (email) {
      const emailExists = await validEmail(email);
      if (emailExists) {
        return res.status(409).json({
          error: `User with the same email: ${email} already exists`,
          messsage: `Please add your valid email`,
        });
      }
    } else {
      const update_query = {
        ...(first_name && { first_name: first_name }),
        ...(last_name && { last_name: last_name }),
        ...(email && { email: email }),
        ...(password && { password: password }),
        ...(role && { role: role }),
      };
      await User.update(update_query, { where: { id: id } });
      const data = await User.findByPk(id);
      res.status(200).json({
        message: `User data of id: ${id} has been succesfully updated`,
        data: data,
      });
    }
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllUserProfile = async (req, res) => {
  try {
    const data = await User.findAll();
    res.status(200).json({
      message: `User data has been succesfully fetched`,
      data: data,
    });
  } catch (error) {
    console.error("Error finding user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
