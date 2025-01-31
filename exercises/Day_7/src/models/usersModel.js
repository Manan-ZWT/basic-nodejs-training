import { DataTypes } from "sequelize";
import { sequelize } from "../database/config.js";
import bcrypt from "bcryptjs";

export const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "User"),
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        if (value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        }
      },
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

// User.prototype.verifyPassword = function (enteredPassword) {
//   return bcrypt.compareSync(enteredPassword, this.password);
// };
