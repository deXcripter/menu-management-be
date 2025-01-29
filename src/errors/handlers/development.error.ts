import { Response } from "express";
import { IError } from "../../types/error";

const handleDevelopemntErrors = (err: IError, res: Response) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    isOperational: err.isOperational,
    message: err.message,
    err: {
      err,
    },
  });
};

export default handleDevelopemntErrors;
