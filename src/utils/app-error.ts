class AppError extends Error {
  isOperational: boolean;
  statusCode: number;
  status;

  constructor(message: string, statusCode: number) {
    super(message);
    this.isOperational = true;
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4")
      ? "Invalid request: Fail"
      : "Unhandled Error";
  }
}

export default AppError;
