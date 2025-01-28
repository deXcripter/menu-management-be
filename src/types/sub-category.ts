import mongoose from "mongoose";

export default interface ISubCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  image: string;
  description: string;
  isTaxable: boolean;
  tax?: number;
  category: mongoose.Types.ObjectId;
}
