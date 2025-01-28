import { Response } from "express";
import { IError } from "../../types/error";
import AppError from "../../utils/app-error";

const handleMulterError = (err: IError, res: Response): AppError => {
  switch (err.code as any as string) {
    case "LIMIT_FILE_SIZE":
      return new AppError(
        `File size is too large. Please upload a smaller file`,
        413
      );
    case "LIMIT_FILE_COUNT":
      return new AppError(
        `Too many files uploaded. Please reduce the number of files`,
        400
      );
    case "LIMIT_UNEXPECTED_FILE":
      return new AppError(`Unexpected field name in file upload`, 400);
    case "LIMIT_FILE_TYPE":
      return new AppError(
        `Invalid file type. Please upload a valid file type`,
        400
      );
    default:
      return new AppError(`File upload error`, 400);
  }
};

export default handleMulterError;
