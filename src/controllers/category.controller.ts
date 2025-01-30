import AppError from "../utils/app-error";
import Category from "../models/category";
import asyncHandler from "../utils/async-wrapper";
import { Request, Response, NextFunction } from "express";
import ICategory from "../types/category";
import { deleteImage, uploadImage } from "../utils/image-handler";
import IPagination from "../types/pagination";
import SubCategory from "../models/sub-category";
import mongoose from "mongoose";
import Item from "../models/items";

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

    const searchQuery = query ? { name: { $regex: query, $options: "i" } } : {};
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

const updateCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.query as unknown as ICategory;

    // @ts-ignore - delete image from payload to avoid mutating from malicious users since the endpoint is not protected
    delete payload.image;

    const existingCategory = await Category.findOne({ name: payload.name });
    if (existingCategory && existingCategory._id.toString() !== id)
      return next(new AppError("Category name already exists", 400));

    if (req.file) {
      const imageLink = await uploadImage(req, folder);
      if (!imageLink) return next(new AppError("Image upload failed", 400));
      deleteImage(folder, payload.image); // delete the old image before replacing
      payload.image = imageLink;
    }

    const category = await Category.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!category) return next(new AppError("Category not found", 404));

    res.status(200).json({
      status: "success",
      data: category,
    });
  }
);

const deleteCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) return next(new AppError("Category not found", 404));

    await Item.deleteMany({ categoryID: category._id });

    const subcategories = await SubCategory.find({ categoryID: category._id });
    for (const subcategory of subcategories) {
      await Item.deleteMany({ subCategoryID: subcategory._id });
      await SubCategory.findByIdAndDelete(subcategory._id);
      deleteImage(folder, subcategory.image);
    }

    await Category.findByIdAndDelete(id);
    deleteImage(folder, category.image);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

const getAllSubCategories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { page = "1", limit = "10" } = req.query as {
      page: string;
      limit: string;
    };

    if (!(await Category.exists({ _id: id })))
      return next(new AppError("Category not found", 404));

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;

    const subCategories = await SubCategory.find({
      categoryID: new mongoose.Types.ObjectId(id),
    })
      .skip(skip)
      .limit(limitInt);

    const total = await SubCategory.countDocuments({
      categoryID: new mongoose.Types.ObjectId(id),
    });

    const pagination: IPagination = {
      total: total,
      page: parseInt(page),
      limit: parseInt(limit),
      hasNextPage: total > limitInt * pageInt,
      hasPrevPage: pageInt > 1,
    };

    res.status(200).json({
      status: "success",
      data: { list: subCategories, pagination },
    });
  }
);

// TODO: Add a new controller to get all items in a category

// exports
export {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getAllSubCategories,
};
