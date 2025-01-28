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
    validate: {
      validator: function (v: Number) {
        return this.isTaxable ? v !== null : v === null;
      },
    },
  },

  taxType: {
    type: String,
    validate: {
      validator: function (v: String) {
        return this.isTaxable ? v !== null : v === null;
      },
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
