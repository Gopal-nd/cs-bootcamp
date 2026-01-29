
import bcrypt from 'bcrypt'
import type { NextFunction, Request, Response } from "express"
import { loginSchema, signupSchema } from "../types"
import prisma from "../../db"
import type { UserRole } from '../../generated/prisma/enums'
import { email } from 'zod'
import { password } from 'bun'
import jwt from 'jsonwebtoken'

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'] ?? req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(400).json({ message: 'cookies /token not provided' })
  }
  try {

    const data: any = jwt.verify(token, process.env.SECRET || 'nd')
    if (data.data.role == 'STUDENT') {
      req.user = data.data
      next()
    }

  } catch (error) {
    res.status(400).json({ message: 'something went wrong in authMiddleware' })
  }
}

export const instructorMiddleware = async (req: Request, res: Response, next: NextFunction,) => {
  const token = req.cookies['token'] ?? req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(400).json({ message: 'cookies /token not provided' })
  }
  try {

    const data: any = jwt.verify(token, process.env.SECRET || 'nd')
    if (data.data.role == 'INSTRUCTOR') {
      req.user = data.data
      next()
    }

  } catch (error) {
    res.status(400).json({ message: 'something went wrong in INSTRUCTOR middleware' })
  }
}

export const requiredRole = (role: string) => async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies['token'] ?? req.headers.authorization?.split(' ')[1]
  if (!token) {
    return res.status(400).json({ message: 'cookies /token not provided' })
  }
  try {

    const data: any = jwt.verify(token, process.env.SECRET || 'nd')
    if (data.data.role == role) {
      req.user = data.data
      next()
    } else {

      return res.status(400).json({ message: 'check token there is a error' })
    }

  } catch (error) {
    return res.status(400).json({ message: 'something went wrong in INSTRUCTOR middleware' })
  }
}

//
//
// export const loginContoller = async (req: Request, res: Response) => {
//   const data = req.body
//   const loginData = loginSchema.safeParse(data)
//   if (!loginData.success) {
//     return res.status(400).json(loginData.error)
//   }
//   try {
//     const isExist = await prisma.user.findUnique({
//       where: {
//         email: loginData.data.email
//       }, select: {
//         email: true,
//         password: true,
//         role: true
//       }
//     })
//     if (!isExist) {
//       return res.status(401).json({ message: "user does not exist" })
//     }
//
//     const passwordMatch = await bcrypt.compare(loginData.data.password, isExist.password)
//
//     if (!passwordMatch) {
//       return res.status(401).json({ message: "invalid credientails" })
//     }
//
//     const token = jwt.sign({
//       data: { email: isExist.email, name: isExist.name, role: isExist.role },
//     }, process.env.SECRET || 'nd', { expiresIn: '1h' })
//     res.cookie('token', token)
//     res.status(200).json({ message: 'sucess', token: token })
//
//   } catch (error) {
//     res.status(400).json({ message: 'something went wrong in /auth/login' })
//   }
// }
//
//
