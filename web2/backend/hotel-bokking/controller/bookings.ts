import db from "../db"
import { v4 as uuidv4 } from 'uuid';

import { AppError, AppResponse, asyncHandler } from "../lib"
import { BookingSchema, RoomSchema } from "../types"
import { date } from "zod";

export const createBookingController = asyncHandler(async (req, res) => {
  const data = BookingSchema.safeParse(req.body)
  if (!data.success) {
    throw new AppError(data.error.message, 400)
  }
  const { roomId, checkInDate, checkOutDate, guests } = data.data
  const userId = req.user.id
  const roomExist = await db.query(`select rooms.*,hotels.id as hotel_id from rooms join hotels on rooms.hotel_id = hotel_id where rooms.id = $1`, [roomId])

  if (roomExist.rows.length === 0) {
    throw new AppError('NOT_FOUND', 400)
  }
  const room = roomExist.rows[0]

  if (guests > room.max_occupancy) {
    throw new AppError("Guests exceed room capacity", 400)
  }

  const conflict = await db.query(
    `SELECT id FROM bookings
     WHERE room_id = $1
     AND status = 'confirmed'
     AND NOT (
       check_out_date <= $2 OR check_in_date >= $3
     )`,
    [roomId, checkInDate, checkOutDate]
  )

  if (conflict.rows.length > 0) {
    throw new AppError("Room already booked for selected dates", 409)
  }

  const nights = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  const totalPrice = nights * Number(room.price_per_night)
  const booking = await db.query(
    `INSERT INTO bookings (
      id, user_id, room_id, hotel_id,
      check_in_date, check_out_date,
      guests, total_price
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    RETURNING *`,
    [
      uuidv4(),
      userId,
      roomId,
      room.hotel_id,
      checkInDate,
      checkOutDate,
      guests,
      totalPrice
    ]
  )
  return AppResponse(res, 201, {
    message: 'user created',
    success: true,
    data: booking.rows[0]
  })

})

export const cancelBookingController = asyncHandler(async (req, res) => {
  const { bookingId } = req.params
  if (!bookingId) {
    throw new AppError("bookingId Required", 400)
  }
  const userId = req.user.id
  const booking = await db.query(`select * from booking where id = $1 and user_id = $2`, [bookingId, userId])
  if (booking.rows.length == 0) {
    throw new AppError("bookingId not found", 400)
  }
  if (booking.rows[0].status == 'cancelled') {
    throw new AppError("already cancelled", 400)
  }
  const checkIn = new Date(booking.rows[0].check_in_date)
  const now = new Date()

  const hoursLeft = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60)

  if (hoursLeft < 24) {
    throw new AppError("Cannot cancel booking less than 24 hours before check-in", 400)
  }



  const cancelledBooking = await db.query(
    `update bookings set status = 'cancelled',cancelled_at = NOW() where id = $1
    RETURNING *`,
    [
      bookingId
    ]
  )
  return AppResponse(res, 201, {
    message: 'booking cancelled',
    success: true,
    data: cancelledBooking.rows[0]
  })

})




export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await db.query('select * from bookings where user_id = $1', [req.user.id])
  if (bookings.rows.length == 0) {
    return AppResponse(res, 200, {
      message: 'NO BOKKINGS FOUND',
      success: true,
      data: bookings.rows
    })
  }
  return AppResponse(res, 200, {
    message: 'ok',
    success: true,
    data: bookings.rows
  })
})
