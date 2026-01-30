import type { NextFunction, Request, Response } from "express"


export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

export class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('error', err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server Error",
    data: null,
    error: null
  })
}

type ApiResponse = {
  success: boolean,
  message?: string,
  data: any
};

export const AppResponse = (
  res: Response,
  statusCode: number,
  options: ApiResponse,
) => {
  return res.status(statusCode).json({
    success: options.success ?? true,
    message: options.message,
    data: options.data
  })
}
