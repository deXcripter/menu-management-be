import { Request, Response, NextFunction } from "express";
import { handleMongooseValidationError } from "./handlers/validation-error";
import { IError } from "../types/error";
import handleProductionErrors from "./handlers/production.error";
import handleDevelopemntErrors from "./handlers/development.error";

const production = process.env.NODE_ENV === "production"; // check if the environment is production or development

const GlobalErrorHandler = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError")
    err = handleMongooseValidationError(err, res);

  // handling errors for both production and development enviroments
  if (production) return handleProductionErrors(err, res);
  else return handleDevelopemntErrors(err, res);
};

export default GlobalErrorHandler;
