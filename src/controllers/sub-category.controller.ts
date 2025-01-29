import AppError from "../utils/app-error";
import asyncHandler from "../utils/async-wrapper";
import { Request, Response, NextFunction } from "express";
import { deleteImage, uploadImage } from "../utils/image-uploader";
import IPagination from "../types/pagination";
import ISubCategory from "../types/sub-category";
import SubCategory from "../models/sub-category";
import Category from "../models/category";

const folder = "sub-categories";

const createSubCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload = req.body as unknown as ISubCategory;
    const { id } = req.params; // the category ID that the sub-category belongs to
    const category = await Category.findById(id);
    if (!category)
      return next(
        new AppError("Please select a valid category for the sub-category", 404)
      );

    const subCategory = new SubCategory(payload);

    subCategory.isTaxable = payload.isTaxable || category.isTaxable || false;
    subCategory.tax = payload.tax || category.tax || 0;
    subCategory.categoryID = category._id; // passing the id of the category to the sub-category for reference

    if (req.file) {
      try {
        const imageLink = await uploadImage(req, folder);
        if (!imageLink) return next(new AppError("Image upload failed", 400));
        subCategory.image = imageLink;
      } catch (ex) {
        console.log(ex);
        return next(
          new AppError(`Error uploading image. Please try again`, 500)
        );
      }
    }

    await subCategory.save();

    res
      .status(201)
      .json({ message: "Sub-category created", data: subCategory });
  }
);

const updateSubCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params as { id: string };
    const payload = req.body as ISubCategory;

    // @ts-ignore - delete image from payload to avoid mutating from malicious users since the endpoint is not protected
    delete payload.image;

    if (req.file) {
      const imageLink = await uploadImage(req, folder);
      if (!imageLink) return next(new AppError("Image upload failed", 400));
      deleteImage(folder, payload.image);
      payload.image = imageLink;
    }

    const subCategory = await SubCategory.findByIdAndUpdate(id, payload, {
      new: true,
    });

    if (!subCategory) return next(new AppError("subCategory not found", 404));

    res.status(200).json({
      status: "success",
      data: subCategory,
    });
  }
);

const getSubCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      page = "1",
      limit = "10",
      query = "",
    } = req.query as unknown as { page: string; limit: string; query: string };

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;
    const searchQuery = { name: { $regex: query, $options: "i" } };

    const subCategories = await SubCategory.find(searchQuery)
      .skip(skip)
      .limit(limitInt);
    const total = await SubCategory.countDocuments(searchQuery);

    const pagination: IPagination = {
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      hasNextPage: total > parseInt(limit) * parseInt(page),
      hasPrevPage: parseInt(page) > 1,
    };

    res.status(200).json({ data: { list: subCategories, pagination } });
  }
);

export { createSubCategory, updateSubCategory, getSubCategory };
