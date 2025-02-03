// import { loginuser } from "../../database/db";
import { User } from "../../models/usersModel.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userLoginSchema } from "../../validators/userSchema.js";

dotenv.config();

const secretKey = process.env.D7_JWT_SECRET_KEY;
export const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    try {
      await userLoginSchema.validate({
        email,
        password,
      });
    } catch (validationError) {
      return res.status(406).json({ error: validationError.message });
    }
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      const passwordverify = bcrypt.compareSync(password, user.password);
      if (passwordverify) {
        const token = jwt.sign(
          { id: user.id, email: user.email },
          secretKey,
          {
            expiresIn: "1h",
          },
          {
            algorithm: "RS256",
          }
        );
        return res.status(200).json({
          message: "Succesfully login",
          token: token,
          data: user,
        });
      } else {
        return res.status(401).json({
          error: "Incorrect Password",
        });
      }
    } else {
      return res.status(404).json({
        error: "User not found",
        message: "Please signup to become member",
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
