import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Category } from "./categoriesModel.js";
import { User } from "./usersModel.js";
import { Product } from "./productsModel.js";

export const Wishlist = sequelize.define(
  "Wishlist",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Product,
        key: "id",
      },
    },
  },
  {
    tableName: "wishlist",
    timestamps: true,
    updatedAt: false,
  }
);

Wishlist.hasMany(Product, {
  onDelete: "CASCADE",
});

Product.belongsTo(Wishlist, {
  onDelete: "CASCADE",
});

User.hasOne(Wishlist, {
  onDelete: "CASCADE",
});

Wishlist.belongsTo(User, {
  onDelete: "CASCADE",
});
