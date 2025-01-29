import express from "express";
import {
  createItem,
  deleteItem,
  getItems,
  updateItem,
} from "../controllers/items.controller";
import upload from "../services/multer";

const Router = express.Router();

Router.route("/").post(upload.single("image"), createItem).get(getItems);
Router.route("/:id")
  .delete(deleteItem)
  .patch(upload.single("image"), updateItem);

export { Router as itemsRouter };
