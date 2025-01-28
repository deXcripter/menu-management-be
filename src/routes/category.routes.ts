import express from "express";
import { createCategory } from "../controllers/category.controller";

const Router = express.Router();

Router.route("/").post(createCategory).get();

export { Router as categoryRouter };
