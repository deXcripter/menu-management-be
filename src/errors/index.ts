import { Request, Response, NextFunction } from "express";
import { handleMongooseValidationError } from "./handlers/validation-error";
import { IError } from "../types/error";
import handleProductionErrors from "./handlers/production.error";
import handleDevelopemntErrors from "./handlers/development.error";
import handleDuplicateFieldErrors from "./handlers/duplicate-errors";
import handleCastError from "./handlers/cast-errors";
import { MulterError } from "multer";
import handleMulterError from "./handlers/multer-errors";
import handleTimeoutError from "./handlers/timeout-error";

const production = process.env.NODE_ENV === "production"; // check if the environment is production or development

const GlobalErrorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError")
    err = handleMongooseValidationError(err, res);
  if (err.code === 11000) err = handleDuplicateFieldErrors(err, res)!;
  if (err.name === "CastError") err = handleCastError(err, res)!;
  if (err instanceof MulterError) err = handleMulterError(err, res);
  if (err.message === "Request Timeout") err = handleTimeoutError(err, res);

  // handling errors for both production and development enviroments
  if (production) return handleProductionErrors(err, res);
  else return handleDevelopemntErrors(err, res);
};

export default GlobalErrorHandler;
