import express from 'express'
import cors from 'cors'
import { errorHandler } from './lib'
import authRouter from './routes/auth.ts'
import hotelRouter from './routes/hotel.ts'
import bookingsRouter from './routes/bookings.ts'
import reviewsRouter from './routes/reviews.ts'
import cookieParser from 'cookie-parser'
const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/hotel', hotelRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/reviews', reviewsRouter)

app.get('/', async (req, res) => {

  res.send('alive')

})

app.use(errorHandler)



app.listen(port, () => {
  console.log(`server running in port : ${port}`)

  // db.on('connect', () => {
  //   console.log('Postgresql Connected')
  // })
}) 
