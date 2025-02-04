import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { Order } from "./ordersModel.js";
import { Product } from "./productsModel.js";

export const Order_item = sequelize.define(
  "Order_item",
  {
    order_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Order,
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "order_items",
    timestamps: true,
  }
);
Order.hasMany(Order_item, {
  onDelete: "CASCADE",
});

Order_item.belongsTo(Order, {
  onDelete: "CASCADE",
});

Order_item.hasOne(Product, {
  onDelete: "CASCADE",
});

Product.belongsTo(Order_item, {
  onDelete: "CASCADE",
});
