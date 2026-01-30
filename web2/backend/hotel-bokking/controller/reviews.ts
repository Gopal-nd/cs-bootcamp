
import db from "../db"
import { v4 as uuidv4 } from 'uuid';

import { AppError, AppResponse, asyncHandler } from "../lib"
import { ReviewSchema, RoomSchema } from "../types"

export const submiteAReviewController = asyncHandler(async (req, res) => {
  const { hotelId } = req.params
  const data = ReviewSchema.safeParse(req.body)
  if (!data.success) {
    throw new AppError(data.error.message, 400)
  }
  const { bookingId, rating, comment } = data.data
  const userId = req.user.id
  const booking = await db.query(
    `SELECT * 
     FROM bookings
     WHERE id = $1 AND user_id = $2`,
    [bookingId, userId]
  )
  if (booking.rows.length === 0) {
    throw new AppError('NOT_FOUND', 404)
  }
  const bookingData = booking.rows[0]
  const existingReview = await db.query(
    `SELECT id FROM reviews WHERE booking_id = $1 AND user_id = $2`,
    [bookingId, userId]
  )

  if (existingReview.rows.length > 0) {
    throw new AppError("Review already submitted", 409)
  }

  const review = await db.query(
    `INSERT INTO reviews (id, user_id, hotel_id, booking_id, rating, comment)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      uuidv4(),
      userId,
      bookingData.hotel_id,
      bookingId,
      rating,
      comment || null
    ]
  )

  await db.query(
    `update hotels set total_reviews = total_reviews + 1,
    rating = (
      select ROUND(AVG(rating)::numeric,1)
    from reviews where hotel_id = $1
) 
where id = $1`,
    [bookingData.hotel_id]
  )
  return AppResponse(res, 201, {
    message: 'Review created',
    success: true,
    data: review.rows[0]
  })

})
