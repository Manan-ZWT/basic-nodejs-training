import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Category } from "./categoriesModel.js";
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
        onDelete:"CASCADE"
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

User.hasOne(Cart, {
  onDelete: "CASCADE",
});

Cart.belongsTo(User, {
  onDelete: "CASCADE",
});

Cart.hasMany(Product);
Product.hasOne(Cart);
