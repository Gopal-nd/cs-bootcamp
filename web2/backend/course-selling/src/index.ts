import express, { type Request, type Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.ts'
import courseRouter from './routes/courses.ts'
import { authMiddleware, requiredRole } from './middleware/authmiddleware.ts'
import { puschaseSchema } from './types/index.ts'
import prisma from '../db/index.ts'
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
    return res.status(201).json({ message: 'purchases made successfull', data: newPurchases })
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
      }
    })
    return res.status(201).json({ message: 'success', data: newPurchases })
  } catch (error) {
    res.status(403).json({ message: "purchases route went wrong" })
  }
})







app.listen(port, () => console.log('server running in port ', port))
