import mongoose from "mongoose";
import iItems from "../types/items";

const itemSchema = new mongoose.Schema<iItems>({
  name: {
    required: [true, "Please enter a name"],
    type: String,
    trim: true,
    lowercase: true,
  },

  image: {
    required: [true, "Please upload an image"],
    type: String,
    trim: true,
  },

  description: {
    required: [true, "Please enter a description"],
    type: String,
    trim: true,
  },

  isTaxable: {
    required: [true, "Please specify if the item is taxable"],
    type: Boolean,
    default: false,
  },

  tax: {
    type: Number,
    default: 0,
    validate: {
      validator: function (v: Number) {
        return this.isTaxable ? v !== 0 : v === 0;
      },
      message:
        "Tax value must be a non-zero number if taxable, or 0 if not taxable",
    },
  },

  baseAmount: {
    type: Number,
    required: [true, "Please enter the baseAmount"],
  },

  discount: {
    type: Number,
    default: 0,
  },

  totalAmount: Number,

  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  subCategoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
});

// making the name unique to the category or sub-category
itemSchema.index({ name: 1, categoryID: 1 }, { unique: true });
itemSchema.index({ name: 1, subCategoryID: 1 }, { unique: true });

itemSchema.pre("save", function (next) {
  this.totalAmount = this.baseAmount - this.discount;
  next();
});

const Item = mongoose.model<iItems>("Item", itemSchema);

export default Item;
