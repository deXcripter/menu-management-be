import express from "express";
import {
  createCategory,
  getAllSubCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/").post(upload.single("image"), createCategory).get(getCategory);
Router.get("/sub-categories/:id", getAllSubCategories);

Router.patch("/:id", updateCategory);

export { Router as categoryRouter };
