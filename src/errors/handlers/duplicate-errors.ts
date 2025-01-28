import { Response } from "express";
import { IError } from "../../types/error";
import AppError from "../../utils/app-error";

const handleDuplicateFieldErrors = (err: IError, res: Response) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern!)[0];
    const value = err.keyValue![field];

    return new AppError(
      `Duplicate key error: ${field} with value "${value}" already exists.`,
      409
    );
  }
};

export default handleDuplicateFieldErrors;
