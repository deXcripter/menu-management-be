import express from "express";
import {
  createSubCategory,
  getItemsInSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/sub-category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/")
  .get(getSubCategory)
  .post(upload.single("image"), createSubCategory);
Router.patch("/:id", upload.single("image"), updateSubCategory);
Router.get("/:id", getItemsInSubCategory);

export { Router as subCategoryRouter };
