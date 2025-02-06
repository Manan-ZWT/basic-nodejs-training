// IMPORT ALL REQUIRED MODULES AND FILES
import { Category } from "../models/categoriesModel.js";
import { addCategory } from "../validators/categoryValidator.js";
import { validCategory } from "../validators/smallValidators.js";

// CREATE CATEGORY FUNCTION
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
      return res.status(201).json({
        message: `Category has been succesfully added`,
        data: `Category Name: ${data.name}`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

// SHOW ALL CATEGORY FUNCTION
export const showAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    if (categories.length === 0) {
      return res.status(404).json({ error: "No category found" });
    } else {
      const category_data = [];
      for (let category of categories) {
        category_data.push({
          id: category.id,
          name: category.name,
        });
      }
      return res
        .status(200)
        .json({ message: "Categories founded", data: category_data });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
