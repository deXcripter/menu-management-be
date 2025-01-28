import AppError from "../utils/app-error";
import Category from "../models/category.model";
import asyncHandler from "../utils/async-wrapper";
import { Request, Response, NextFunction } from "express";
import ICategory from "../types/category";

const createCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as ICategory;

    console.log(req.file);

    const category = await Category.create(payload);

    res.status(201).json({
      status: "success",
      data: category,
    });
  }
);

// exports
export { createCategory };
