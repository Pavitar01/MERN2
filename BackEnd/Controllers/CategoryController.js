const { default: slugify } = require("slugify");
const { categories } = require("../Models/Category");

const categoryController = async (req, res) => {
console.log("hello"+req.body)
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send("Name is required");
    }

    const catExist = await categories.findOne({ name });

    if (catExist) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
      });
    }

    const category = await new categories({
      name: name,
      slug: slugify(name),
    }).save();

    res.status(200).send({
      message: "Category added successfully!",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update category
const updateCategoryController = async (req, res) => {
  try {
    const [name] = req.body;
    const { id } = req.params;
    const category = categories.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      message: "Category upadted successfully !",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//get all category

const allCategoryController = async (req, res) => {
  try {
    const category = await categories.find({});
    res.status(200).send({
      message: "All Categories !",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//single catergory
const singleCategoryController = async (req, res) => {
  try {
    const category = await categories.findOne({
      slug: req.body.params.slug,
    });
    res.status(200).send({
      message: "Single Category !",
      success: true,
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in fetching single category",
      error,
    });
  }
};
//delete

const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.body.id;
    const category = await categories.deleteOne(id);
    res.status(200).send({
      message: "Category deleted successfully !",
      success: true,
      category,
    });
  } catch (error) {
    res.status(201).send({
      success: false,
      message: "Error in deleting category",
      error,
    });
  }
};

module.exports = {
  categoryController,
  updateCategoryController,
  allCategoryController,
  singleCategoryController,
  deleteCategoryController,
};
