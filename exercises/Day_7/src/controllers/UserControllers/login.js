// import { loginuser } from "../../database/db";
import { User } from "../../models/usersModel.js";
import bcrypt from "bcryptjs";

export const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email: email },
    });
    if (user) {
      const passwordverify = bcrypt.compareSync(password, user.password);
      if (passwordverify) {
        return res.status(200).json({ message: "Succesfully login" });
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
