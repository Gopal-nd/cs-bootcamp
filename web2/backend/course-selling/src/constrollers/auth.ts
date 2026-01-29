import bcrypt from 'bcrypt'
import type { Request, Response } from "express"
import { loginSchema, signupSchema } from "../types"
import prisma from "../../db"
import type { UserRole } from '../../generated/prisma/enums'
import { email } from 'zod'
import { password } from 'bun'
import jwt from 'jsonwebtoken'

export const signUpController = async (req: Request, res: Response) => {
  const data = req.body
  const signUpdate = signupSchema.safeParse(data)
  if (!signUpdate.success) {
    return res.status(400).json(signUpdate.error)
  }
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email: signUpdate.data.email
      }
    })
    if (isExist) {
      return res.status(401).json({ message: "user already exist" })
    }

    const hashedPassword = await bcrypt.hash(signUpdate.data.password, 10)

    const newUser = await prisma.user.create({
      data: {
        email: signUpdate.data.email,
        password: hashedPassword,
        role: signUpdate.data.role as "STUDENT" || "INSTRUCTOR",
        name: signUpdate.data.name
      }
    })

    res.status(201).json({ message: 'user created', data: newUser })

  } catch (error) {
    res.status(400).json({ message: 'something went wrong in /auth/signup' })
  }
}


export const loginContoller = async (req: Request, res: Response) => {
  const data = req.body
  const loginData = loginSchema.safeParse(data)
  if (!loginData.success) {
    return res.status(400).json(loginData.error)
  }
  try {
    const isExist = await prisma.user.findUnique({
      where: {
        email: loginData.data.email
      }, select: {
        email: true,
        name: true,
        role: true,
        password: true,
        id: true
      }
    })
    if (!isExist) {
      return res.status(401).json({ message: "user does not exist" })
    }

    const passwordMatch = await bcrypt.compare(loginData.data.password, isExist.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: "invalid credientails" })
    }

    const token = jwt.sign({
      data: { email: isExist.email, name: isExist.name, id: isExist.id, role: isExist.role },
    }, process.env.SECRET || 'nd', { expiresIn: '1h' })
    res.cookie('token', token)
    res.status(200).json({ message: 'sucess', token: token })

  } catch (error) {
    res.status(400).json({ message: 'something went wrong in /auth/login' })
  }
}

