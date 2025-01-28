import mongoose from "mongoose";
import ISubCategory from "./sub-category";

export default interface ICategory {
  name: string;
  image: string;
  description: string;
  isTaxable: boolean;
  tax?: number;
  taxType?: string;

  subCategories: mongoose.Types.ObjectId[]; // manages the id's of subcategories referencing the category.
}
