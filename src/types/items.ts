import mongoose, { mongo } from "mongoose";

export default interface iItems {
  name: string;
  image: string;
  description: string;
  isTaxable: Boolean;
  tax?: number;
  baseAmount: number;
  discount: number;
  totalAmount: number;

  categoryID?: mongoose.Types.ObjectId;
  subCategoryID?: mongoose.Types.ObjectId;
}
