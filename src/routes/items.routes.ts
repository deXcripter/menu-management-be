import express from "express";
import { createItem } from "../controllers/items.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/").post(upload.single("image"), createItem);

export { Router as itemsRouter };
