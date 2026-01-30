import { password } from 'bun';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../db/index.ts'
import { v4 as uuidv4 } from 'uuid';
import { AppError, AppResponse, asyncHandler } from "../lib";
import { LoginSchema, UserSchema } from "../types";

export const signupController = asyncHandler(async (req, res) => {
  const data = UserSchema.safeParse(req.body)
  if (!data.success) {
    throw new AppError(data.error.message, 400)
  }
  const { email, name, password, role, phone, } = data.data

  const isExist = await db.query(`select id from users where email = $1`, [email])

  if (isExist.rows.length > 0) {
    throw new AppError("EMAIL_ALREADY_EXISTS", 400)
  }

  const hashPassword = await bcrypt.hash(password, 10)

  const newUser = await db.query(`INSERT into users (id,name,email,password,role,phone) values ($1,$2,$3,$4,$5,$6) returning id, name, email, role, phone ,created_at`,
    [uuidv4(), name, email, hashPassword, role, phone])
  return AppResponse(res, 201, {
    message: 'user created',
    success: true,
    data: newUser.rows[0]
  })

})


export const loginController = asyncHandler(async (req, res) => {
  const data = LoginSchema.safeParse(req.body)
  if (!data.success) {
    throw new AppError(data.error.message, 400)
  }
  const { email, password } = data.data

  const isExist = await db.query(`select id, email, name, password, role  from users where email = $1 `, [email])

  if (!isExist.rows[0]['email']) {
    throw new AppError("User Not Exist", 401)
  }

  const hashPassword = await bcrypt.compare(password, isExist.rows[0]['password'])

  if (!password) {
    throw new AppError('Invalid Credentails', 401)
  }

  const user = { email: isExist.rows[0]['email'], role: isExist.rows[0]['role'], id: isExist.rows[0]['id'], name: isExist.rows[0]['name'] }
  const token = jwt.sign(user, process.env.SECRET || 'nd', { expiresIn: '1h' })

  res.cookie('token', token)
  const userdata = {
    token: token,
    user: user

  }

  return AppResponse(res, 200, {
    message: 'login sucess',
    success: true,
    data: userdata
  })

})


