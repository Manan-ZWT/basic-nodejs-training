import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { User } from "./usersModel.js";
import { Product } from "./productsModel.js";

export const Cart = sequelize.define(
  "Cart",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
        onDelete: "CASCADE",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "carts",
    timestamps: true,
  }
);

User.hasMany(Cart, { foreignKey: "user_id", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE" });

Cart.belongsTo(Product, { foreignKey: "product_id", onDelete: "CASCADE" });
Product.hasMany(Cart, { foreignKey: "product_id", onDelete: "CASCADE" });
