import e, { Response } from "express";
import { IError } from "../../types/error";
import AppError from "../../utils/app-error";

const handleTimeoutError = (err: IError, res: Response) => {
  return new AppError(`Request Timeout`, 499);
};

export default handleTimeoutError;
