// IMPORTING REQUIRED MODULES AND FILES
import { User } from "../../models/usersModel.js";
import { Op} from "sequelize";

// FUNCTION TO GET ALL USERS FROM "users" TABLE

export const getAllUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;

    const { role, isActive, ageGt, orderByColumn, order } = req.query;

    const conditions = {};
    if (role) {
      conditions.role = role;
    }
    if (isActive !== undefined) {
      conditions.isActive = isActive === "true";
    }
    if (ageGt) {
      conditions.age = { [Op.gt]: parseInt(ageGt) };
    }

    const users = await User.findAll({
      where: conditions,
      limit,
      offset,
      order: [[orderByColumn, order.toUpperCase()]],
    });

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.status(200).json({ data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
