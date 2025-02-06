import { Cart } from "../models/cartsModel.js";
import { Product } from "../models/productsModel.js";
import { User } from "../models/usersModel.js";
import { addtoCart } from "../validators/cartValidators.js";
import { secretKey } from "../config/config.js";
import jwt from "jsonwebtoken";

export const addToCart = async (req, res) => {
  let { user_id, product_id, quantity } = req.body;
  try {
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

    await Product.update(
      {
        stock: data.stock - quantity,
      },
      { where: { id: product_id } }
    );

    return res
      .status(200)
      .json({ message: "Product has been successfully added to the cart" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

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

    return res.status(200).json({
      message: "Product data:",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

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
      },
    });
    if (!cartProduct) {
      return res.status(404).json({
        message: `Product with product ID: ${product_id} has not been found in your card`,
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
