import mongoose, { mongo } from "mongoose";
import ICategory from "../types/category";

const categorySchema = new mongoose.Schema<ICategory>({
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
    required: [
      function () {
        return this.isTaxable;
      },
      "tax is required when the category is taxable",
    ],
    validate: {
      validator: function (v: Number) {
        return this.isTaxable ? v !== 0 || undefined : v === 0;
      },
      message: "tax must be a non-zero number if taxable, else 0",
    },
  },

  taxType: {
    type: String,
    required: [
      function () {
        return this.isTaxable && this.tax !== undefined;
      },
      "taxType is required when the category is taxable",
    ],
    validate: {
      validator: function (v: string) {
        return this.isTaxable ? v !== null || undefined : v === null;
      },
      message: "taxType must be specified if taxable, else null",
    },
  },

  // subCategories: [{ type: mongoose.Schema.ObjectId, ref: "SubCategory" }],
});

// categorySchema.methods.addSubCategory = async function (
//   id: mongoose.Types.ObjectId
// ) {
//   // check if the subCategory has already been added in the category array
// };

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
