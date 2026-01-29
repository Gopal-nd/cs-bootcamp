import express from 'express'
import { loginContoller, signUpController } from '../constrollers/auth'

const router = express.Router()

router.post('/signup', signUpController)
router.post('/login', loginContoller)


export default router
