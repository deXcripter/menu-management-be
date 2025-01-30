import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getItemsInSubCategory,
  getSubCategory,
  getSubCategoryById,
  updateSubCategory,
} from "../controllers/sub-category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/")
  .get(getSubCategory)
  .post(upload.single("image"), createSubCategory);
Router.route("/:id")
  .patch(upload.single("image"), updateSubCategory)
  .get(getSubCategoryById)
  .delete(deleteSubCategory);
Router.get("/items/:id", getItemsInSubCategory);

export { Router as subCategoryRouter };
