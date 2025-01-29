import express from "express";
import { createItem } from "../controllers/items.controller";

const Router = express.Router();

Router.route("/").post(createItem);

export { Router as itemsRouter };
