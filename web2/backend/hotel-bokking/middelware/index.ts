import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { AppError, asyncHandler } from "../lib";

export const authMiddleware = (role: 'customer' | 'owner') => asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'] ?? req.headers.authorization?.split(' ')[1]
  if (!token) {
    throw new AppError('UNAUTHORIZED', 401)
  }
  const userData: any = jwt.verify(token, process.env.SECRET || 'nd')
  const data = userData
  if (data.role == role) {
    req.user = data
    next()
  } else {

    throw new AppError('FORBIDDEN', 403)
  }
})
