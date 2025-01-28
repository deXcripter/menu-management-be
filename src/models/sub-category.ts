import mongoose from "mongoose";
import ISubCategory from "../types/sub-category";

const subCategorySchema = new mongoose.Schema<ISubCategory>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    require: [true, "Please enter a category name"],
  },
  image: {
    type: String,
    required: true,
    trim: true,
    require: [true, "Please enter an image URL"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    require: [true, "Please enter a description"],
  },
  isTaxable: {
    type: Boolean,
    required: true,
    require: [true, "Please specify if the category is taxable"],
  },
  tax: {
    type: Number,
    validate: {
      validator: function (v: Number) {
        return this.isTaxable ? v !== null : v === null;
      },
    },
  },
});

const Category = mongoose.model<ISubCategory>("Category", subCategorySchema);

export default Category;
