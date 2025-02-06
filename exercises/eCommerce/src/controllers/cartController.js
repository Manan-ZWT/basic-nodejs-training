// IMPORT ALL REQUIRED MODULES AND FILES
import { Cart } from "../models/cartsModel.js";
import { Product } from "../models/productsModel.js";
import { User } from "../models/usersModel.js";
import { addtoCart } from "../validators/cartValidators.js";
import { secretKey } from "../config/config.js";
import jwt from "jsonwebtoken";

// ADD TO CART FUCNTION
export const addToCart = async (req, res) => {
  let { product_id, quantity } = req.body;
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const user_id = parseInt(decodedmsg.id);

    const data = await Product.findByPk(product_id);
    if (!data) {
      return res.status(404).json({ error: "Product not found" });
    }
    if (data.stock < quantity) {
      return res.status(409).json({
        message: `Not enough stock available for the selected item: ${data.name}`,
      });
    }

    await addtoCart.validate({
      user_id,
      product_id,
      quantity,
    });

    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await Cart.create({
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
    });

    return res
      .status(200)
      .json({ message: "Product has been successfully added to the cart" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// SHOW CART ITEMS FUNCTION
export const showCart = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const id = parseInt(decodedmsg.id);

    const data = await Cart.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Product,
          attributes: [
            "name",
            "description",
            "price",
            "stock",
            "category_id",
            "image_url",
          ],
        },
      ],
    });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No items found in cart, Cart is empty" });
    } else {
      return res.status(200).json({
        message: "Product data:",
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE FROM CART FUNCTION
export const deleteFromCart = async (req, res) => {
  try {
    const product_id = parseInt(req.params.id);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const id = parseInt(decodedmsg.id);

    const cartProduct = await Cart.findOne({
      where: {
        product_id: product_id,
        user_id: id,
      },
    });
    if (!cartProduct) {
      return res.status(404).json({
        message: `Product with product ID: ${product_id} has not been found in your cart`,
      });
    }
    await Cart.destroy({
      where: { user_id: id, product_id: product_id },
    });

    return res.status(200).json({
      message: "Product has been removed from the cart:",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
