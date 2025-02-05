import { Category } from "../models/categoriesModel.js";
import { addCategory } from "../validators/categoryValidator.js";
import { validCategory } from "../validators/smallValidators.js";

export const createCategory = async (req, res) => {
  try {
    const name = req.body.name;
    try {
      await addCategory.validate({
        name,
      });
    } catch (validationError) {
      return res.status(406).json({ error: validationError.message });
    }
    const categoryExists = await validCategory(name);
    if (categoryExists) {
      return res.status(409).json({
        message: "Category already exists, Please enter a Unique name",
      });
    } else {
      await Category.create({
        name: name,
      });
      const data = await Category.findOne({ where: { name: name } });
      return res.status(200).json({
        message: `Category has been succesfully added`,
        data: data,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const showAllCategories = async (req, res) => {
  try {
    const data = await Category.findAll();
    if (data.length === 0) {
      return res.status(404).json({ error: "No category found" });
    } else {
      return res.status(200).json({ message: "Categories founded", data: data });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
