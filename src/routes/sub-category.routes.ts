import express from "express";
import {
  createSubCategory,
  getSubCategory,
  updateSubCategory,
} from "../controllers/sub-category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.get("/", getSubCategory);
Router.route("/:id")
  .patch(updateSubCategory)
  .post(upload.single("image"), createSubCategory);

export { Router as subCategoryRouter };
