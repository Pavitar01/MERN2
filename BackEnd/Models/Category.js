const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
});
const categories = mongoose.model("categories", categorySchema);
module.exports = { categories };
