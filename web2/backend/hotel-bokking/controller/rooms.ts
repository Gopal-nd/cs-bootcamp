import db from "../db"
import { v4 as uuidv4 } from 'uuid';

import { AppError, AppResponse, asyncHandler } from "../lib"
import { RoomSchema } from "../types"

export const addRoomToHotelController = asyncHandler(async (req, res) => {
  const { hotelId } = req.params
  const data = RoomSchema.safeParse(req.body)
  if (!data.success) {
    throw new AppError(data.error.message, 400)
  }
  const { roomNumber, roomType, pricePerNight, maxOccupancy } = data.data

  const hotelExist = await db.query(`select id, email from hotels where id = $1 and owner_id = $2`, [hotelId, req.user.id])
  if (hotelExist.rows.length === 0) {
    throw new AppError('FORBIDDEN', 400)
  }
  const roomExists = await db.query(
    `SELECT id FROM rooms WHERE hotel_id = $1 AND room_number = $2`,
    [hotelId, roomNumber]
  )

  if (roomExists.rows.length > 0) {
    throw new AppError("ROOM_ALREADY_EXISTS", 409)
  }

  const newRoom = await db.query(
    `INSERT INTO rooms (id, hotel_id, room_number, room_type, price_per_night, max_occupancy)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      uuidv4(),
      hotelId,
      roomNumber,
      roomType,
      pricePerNight,
      maxOccupancy
    ]
  )
  return AppResponse(res, 201, {
    message: 'user created',
    success: true,
    data: newRoom.rows[0]
  })

})
