import { Response } from "express";
import { IError } from "../../types/error";
import AppError from "../../utils/app-error";

const handleCastError = (err: IError, res: Response) => {
  if (err.name === "CastError") {
    return new AppError(`Invalid ${err.path}: ${err.value}.`, 400);
  }
};

export default handleCastError;
