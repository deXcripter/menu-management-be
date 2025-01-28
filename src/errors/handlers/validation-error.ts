import { Response } from "express";
import AppError from "../../utils/app-error";

export const handleMongooseValidationError = (err: any, res: Response) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  return new AppError(`Validation error: ${errors}`, 400);
};
