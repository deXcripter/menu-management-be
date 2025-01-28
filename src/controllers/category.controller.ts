import AppError from "../utils/app-error";
import Category from "../models/category.model";
import asyncHandler from "../utils/async-wrapper";
import { Request, Response, NextFunction } from "express";
import ICategory from "../types/category";
import { uploadImage } from "../utils/image-uploader";
import IPagination from "../types/pagination";

const folder = "categories";

const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as ICategory;

    // early return if category already exists
    const existingCategory = await Category.findOne({ name: payload.name });
    if (existingCategory)
      return next(
        new AppError(`Category: ${payload.name} already exists`, 400)
      );

    const imageLink = await uploadImage(req, folder);
    if (!imageLink) return next(new AppError("Image upload failed", 400));
    payload.image = imageLink;

    const category = await Category.create(payload);

    res.status(201).json({
      status: "success",
      data: category,
    });
  }
);

const getCategory = asyncHandler(
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

    const categories = await Category.find(searchQuery)
      .skip(skip)
      .limit(limitInt);
    const totalCategories = await Category.countDocuments(searchQuery);

    const hasNextPage = totalCategories > parseInt(limit) * parseInt(page);
    const hasPrevPage = parseInt(page) > 1;

    const pagination: IPagination = {
      total: totalCategories,
      page: parseInt(page),
      limit: parseInt(limit),
      hasNextPage,
      hasPrevPage,
    };

    res.status(200).json({
      status: "success",
      data: { list: categories, pagination: pagination },
    });
  }
);

// exports
export { createCategory, getCategory };
