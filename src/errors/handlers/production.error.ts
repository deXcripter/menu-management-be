import { Response } from "express";
import { IError } from "../../types/error";

const handleProductionErrors = (err: IError, res: Response) => {
  if (err.isOperational) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, status: err.status });
  } else {
    return res.status(500).json({
      message: "Server Error: Please try again later",
    });
  }
};

export default handleProductionErrors;
