import express from "express";
import {
  createCategory,
  getCategory,
} from "../controllers/category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/").post(upload.single("image"), createCategory).get(getCategory);

export { Router as categoryRouter };
