import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllItemsInACategory,
  getAllSubCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/").post(upload.single("image"), createCategory).get(getCategory);
Router.get("/sub-categories/:id", getAllSubCategories);
Router.get("/items/:id", getAllItemsInACategory);
Router.route("/:id").patch(updateCategory).delete(deleteCategory);

export { Router as categoryRouter };
