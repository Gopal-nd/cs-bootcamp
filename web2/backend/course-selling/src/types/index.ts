import z, { email, string } from "zod";

export const signupSchema = z.object({
  email: z.email(),
  password: z.string(),
  name: z.string(),
  role: z.enum(['STUDENT', 'INSTRUCTOR'])

})

export const loginSchema = z.object({
  email: z.email(),
  password: z.string()
})


export const courseSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.int().min(1)
})


export const lessonSchema = z.object({
  title: z.string(),
  content: z.string(),
  courseId: z.string()
})

export const puschaseSchema = z.object({
  courseId: z.string()
})
