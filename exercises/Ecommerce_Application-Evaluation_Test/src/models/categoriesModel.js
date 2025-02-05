import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const Category = sequelize.define(
  "Category",
  {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
    timestamps: true,
  }
);

// Category.hasMany(Product, { foreignKey: "category_id", onDelete: "CASCADE" });
// Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE" });
