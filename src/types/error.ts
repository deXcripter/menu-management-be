export interface IError {
  message: string;
  name: string;
  isOperational: boolean;
  status: string;
  statusCode: number;
  code?: number;
  keyPattern?: string[];
  keyValue?: { [key: string]: string };

  path?: string;
  value?: string;
}
