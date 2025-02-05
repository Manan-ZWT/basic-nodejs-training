import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { User } from "./usersModel.js";

export const Order = sequelize.define(
  "Order",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "shipped", "delievered", "canceled"),
      allowNull: false,
      defaultValue: "pending",
      set(value) {
        if (value) {
          this.setDataValue("status", value.toLowerCase());
        }
      },
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);
User.hasMany(Order, { foreignKey: "user_id", onDelete: "CASCADE" });
Order.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });
