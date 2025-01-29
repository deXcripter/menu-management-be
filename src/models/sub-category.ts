import mongoose from "mongoose";
import ISubCategory from "../types/sub-category";

const subCategorySchema = new mongoose.Schema<ISubCategory>({
  name: {
    type: String,
    required: true,
    trim: true,
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
        return this.isTaxable ? v !== null || 0 : v === null || 0;
      },
      message: "Tax value must be a non-zero number if taxable",
    },
    message: "Tax value must be a non-zero number if taxable",
  },
  categoryID: {
    type: mongoose.Schema.ObjectId,
    require: [true, "A sub-category must belong to a category"],
    ref: "Category",
  },
});

subCategorySchema.index({ name: 1, categoryID: 1 }, { unique: true }); // ensure sub-category name is unique within a category

const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);

export default SubCategory;
