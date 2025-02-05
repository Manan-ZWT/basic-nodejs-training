import { Product } from "../models/productsModel.js";
import { User } from "../models/usersModel.js";
import { addToWishlist } from "../validators/wishlistValidator.js";
import { secretKey } from "../config/config.js";
import jwt from "jsonwebtoken";
import { Wishlist } from "../models/wishlist.js";

export const addtoWishlist = async (req, res) => {
  let { user_id, product_id } = req.body;
  try {
    try {
      await addToWishlist.validate({
        user_id,
        product_id,
      });
    } catch (validationError) {
      return res.status(406).json({ error: validationError.message });
    }
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await Wishlist.create({
      user_id: user_id,
      product_id: product_id,
    });
    return res
      .status(200)
      .json({ message: "Product has been succesfully added to the wishlist" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const showWishlist = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const id = parseInt(decodedmsg.id);

    const data = await Wishlist.findAll({
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

export const deleteFromWishlist = async (req, res) => {
  try {
    const product_id = parseInt(req.params.id);
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[2];

    let decodedmsg = jwt.verify(token, secretKey);
    const id = parseInt(decodedmsg.id);

    const wishlistProduct = await Wishlist.findOne({
      where: {
        product_id: product_id,
      },
    });
    if (!wishlistProduct) {
      return res.status(404).json({
        message: `Product with product ID: ${product_id} has not been found in your wishlist`,
      });
    }

    await Wishlist.destroy({
      where: { user_id: id, product_id: product_id },
    });

    return res.status(200).json({
      message: "Product has been removed from the wishlist:",
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
