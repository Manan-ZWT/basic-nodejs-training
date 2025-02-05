import { Order } from "../models/ordersModel.js";
import { Order_item } from "../models/order_itemsModel.js";
import { Cart } from "../models/cartsModel.js";
import { Product } from "../models/productsModel.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/config.js";

export const placeOrder = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const id = parseInt(decodedmsg.id);

    const cart_items = await Cart.findAll({ where: { user_id: id } });

    if (cart_items.length === 0) {
      return res.status(400).json({ message: "No items found in cart" });
    }

    let total_price = 0;

    for (let cart_data of cart_items) {
      const product_id = parseInt(cart_data.product_id);
      const product_data = await Product.findByPk(product_id);

      if (!product_data) {
        return res.status(404).json({ message: `Product with ID: ${product_id} not found` });
      }

      const product_quantity = parseInt(cart_data.quantity);
      const product_price = parseFloat(product_data.price);
      const item_total_price = product_quantity * product_price;

      total_price += item_total_price;

      await Order_item.create({
        product_id: product_id,
        quantity: product_quantity,
        price: product_price,
        order_id: null, 
      });
    }

    const order = await Order.create({
      user_id: id,
      total_price: total_price,
      status: "pending",
    });

    for (let cart_data of cart_items) {
      const product_id = parseInt(cart_data.product_id);
      const product_quantity = parseInt(cart_data.quantity);
      const product_price = parseFloat(cart_data.price);
      await Order_item.update(
        { order_id: order.id },
        { where: { product_id: product_id, quantity: product_quantity } }
      );
    }

    res.status(200).json({
      message: "Order placed successfully",
      order_id: order.id,
      total_price: total_price,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
