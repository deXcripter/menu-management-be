import { NextFunction, Request, Response } from "express";
import Item from "../models/items";
import iItems from "../types/items";
import asyncHandler from "../utils/async-wrapper";
import { deleteImage, uploadImage } from "../utils/image-uploader";
import AppError from "../utils/app-error";
import IPagination from "../types/pagination";

const folder = "items";

const createItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as iItems;

    const newItem = new Item(payload);

    if (req.file) {
      const imageLink = await uploadImage(req, folder);
      if (!imageLink) return next(new AppError("Image upload failed", 400));
      newItem.image = imageLink;
    }

    await newItem.save();
    res.status(201).json({ message: "Item created", data: newItem });
  }
);

const updateItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.query as unknown as iItems;

    // @ts-ignore
    delete payload.image;

    if (req.file) {
      const imageLink = await uploadImage(req, folder);
      if (!imageLink) return next(new AppError("Image upload failed", 400));
      deleteImage(folder, payload.image); // delete the old image before replacing
      payload.image = imageLink;
    }

    const item = await Item.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!item) return next(new AppError("item not found", 404));

    res.status(200).json({
      status: "success",
      data: item,
    });
  }
);

const getItems = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      query = "",
      page = "1",
      limit = "10",
    } = req.query as { query: string; page: string; limit: string };

    const searchQuery = { name: { $regex: query, $options: "i" } };
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;

    const items = await Item.find(searchQuery).skip(skip).limit(limitInt);
    const totalItems = await Item.countDocuments(searchQuery);

    const hasNextPage = totalItems > parseInt(limit) * parseInt(page);
    const hasPrevPage = parseInt(page) > 1;

    const pagination: IPagination = {
      total: totalItems,
      page: parseInt(page),
      limit: parseInt(limit),
      hasNextPage,
      hasPrevPage,
    };

    res.status(200).json({
      status: "success",
      data: { list: items, pagination: pagination },
    });
  }
);

const deleteItem = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const item = await Item.findByIdAndDelete(id);
    if (!item) return next(new AppError("Item not found", 404));

    deleteImage(folder, item.image);

    res.status(200).json({
      status: "success",
      message: "Item deleted",
    });
  }
);

export { createItem, getItems, updateItem, deleteItem };
