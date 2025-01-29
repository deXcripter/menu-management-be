import express from "express";
import {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/sub-category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/")
  .get(getSubCategory)
  .post(upload.single("image"), createSubCategory);
Router.patch("/:id", upload.single("image"), updateSubCategory);

export { Router as subCategoryRouter };
