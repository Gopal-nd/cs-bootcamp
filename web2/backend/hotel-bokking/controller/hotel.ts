
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import db from '../db/index.ts'
import { v4 as uuidv4 } from 'uuid';
import { AppError, AppResponse, asyncHandler } from "../lib";
import { HotelSchema, LoginSchema, RoomSchema, UserSchema } from "../types";


export const getHotelByIdController = asyncHandler(async (req, res) => {
  const { hotelId } = req.params
  if (!hotelId) {
    throw new AppError("HOTEL_NOT_FOUND", 400)
  }

  const hotel = await db.query(`select * from hotels where id = $1`, [hotelId])

  if (hotel.rows.length == 0) {
    throw new AppError("HOTEL_NOT_FOUND", 400)
  }
  return AppResponse(res, 201, {
    message: 'user created',
    success: true,
    data: hotel.rows
  })

})


export const createHotelController = asyncHandler(async (req, res) => {
  const data = HotelSchema.safeParse(req.body)
  if (!data.success) {
    throw new AppError(data.error.message, 400)
  }
  const { description, name, city, country, amenities } = data.data

  const newUser = await db.query(`INSERT into hotel (id, owner_id, name, description, city, country, amenities)
values ($1,$2,$3,$4,$5,$6,$7) returning id, name, description,city, country ,created_at,rating,totalReviews,owner_id`,
    [uuidv4(), req.user.id, name, description, city, country, amenities])
  return AppResponse(res, 201, {
    message: 'user created',
    success: true,
    data: newUser.rows[0]
  })

})





export const getHotelsController = asyncHandler(async (req, res) => {
  const { city, minRating, country, minPrice, maxPrice } = req.query

  let query = `
select distinct hotels.* from hotels left join rooms on hotels.id = rooms.hotel_id where 1=1`

  const values: any[] = []
  let index = 1

  if (city) {
    query += `and hotels.city ilike $${index++}`
    values.push(`%${city}%`)
  }

  if (country) {
    query += `and hotels.country ilike $${index++}`
    values.push(`%${country}%`)
  }

  if (minRating) {
    query += ` AND hotels.rating >= $${index++}`
    values.push(minRating)
  }

  if (minPrice) {
    query += ` AND rooms.price_per_night >= $${index++}`
    values.push(minPrice)
  }

  if (maxPrice) {
    query += ` AND rooms.price_per_night <= $${index++}`
    values.push(maxPrice)
  }
  query += ` ORDER BY hotels.rating DESC`
  const results = await db.query(query, values)
  if (results.rows.length == 0) {
    throw new AppError('HOTEL_NOT_FOUND',)
  }
  return AppResponse(res, 201, {
    message: 'user created',
    success: true,
    data: results.rows
  })

})






