
import express from 'express'
import { authMiddleware } from '../middelware'
import { createHotelController, getHotelByIdController, getHotelsController } from '../controller/hotel'
import { addRoomToHotelController } from '../controller/rooms'

const router = express.Router()

router.post('/', authMiddleware('owner'), createHotelController)
router.post('/:hotelId/rooms', authMiddleware('owner'), addRoomToHotelController)
router.get('/', authMiddleware('customer'), getHotelsController)
router.get('/:hotelId', authMiddleware('customer'), getHotelByIdController)
export default router
