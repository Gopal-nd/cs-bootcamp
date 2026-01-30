
import express from 'express'
import { authMiddleware } from '../middelware'
import { cancelBookingController, createBookingController, getAllBookings } from '../controller/bookings'

const router = express.Router()

router.post('/', authMiddleware('customer'), createBookingController)
router.get('/', authMiddleware('customer'), getAllBookings)
router.put('/:bookingId/cancel', authMiddleware('customer'), cancelBookingController)
export default router

