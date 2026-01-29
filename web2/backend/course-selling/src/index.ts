import express, { type Request, type Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.ts'
import courseRouter from './routes/courses.ts'
import { authMiddleware, requiredRole } from './middleware/authmiddleware.ts'
import { puschaseSchema } from './types/index.ts'
import jwt from 'jsonwebtoken'
import prisma from '../db/index.ts'
import { email } from 'zod'
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
const port = process.env.PORT || 5000

app.use('/auth', authRouter)
app.use('/courses', courseRouter)


app.get('/', (req, res) => {
  res.send('hi')
})


app.post('/purchases', authMiddleware, async (req: Request, res: Response) => {
  const data = req.body
  const purchasesData = puschaseSchema.safeParse(data)
  if (!purchasesData.success) {
    return res.status(403).json({ error: purchasesData.error })
  }

  try {
    const newPurchases = await prisma.purchase.create({
      data: {
        courseId: purchasesData.data.courseId,
        userId: req.user.id
      }
    })
    return res.status(200).json(newPurchases)
  } catch (error) {
    console.log(error)
    res.status(403).json({ message: "purchases route went wrong" })
  }
})


app.get('/users/:id/purchases', authMiddleware, async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id) {
    return res.status(403).json({ message: "id required" })
  }

  try {
    const newPurchases = await prisma.purchase.findMany({
      where: {
        userId: req.user.id
      },
      include: {
        course: true
      }
    })
    return res.status(201).json(newPurchases)
  } catch (error) {
    res.status(403).json({ message: "purchases route went wrong" })
  }
})

app.get('/me', async (req: Request, res: Response) => {
  try {
    const token = req.cookies['token'] ?? req.headers.authorization?.split(' ')[1]
    console.log(token)
    if (!token) {
      return res.status(400).json({ message: 'cookies /token not provided' })
    }

    const data: any = jwt.verify(token, process.env.SECRET || 'nd')
    res.status(200).json({ email: data.data.email, id: data.data.id })
  } catch (err) {
    return res.status(403).json({ mes: "/me error" })
  }
})







app.listen(port, () => console.log('server running in port ', port))
