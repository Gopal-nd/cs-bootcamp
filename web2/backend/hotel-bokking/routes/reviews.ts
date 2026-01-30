
import express from 'express'
import { authMiddleware } from '../middelware'
import { submiteAReviewController } from '../controller/reviews'

const router = express.Router()

router.post('/', authMiddleware('customer'), submiteAReviewController)
export default router

