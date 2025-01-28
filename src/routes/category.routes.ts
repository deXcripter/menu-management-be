import express from "express";
import { createCategory } from "../controllers/category.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/").post(upload.single("image"), createCategory).get();

export { Router as categoryRouter };
