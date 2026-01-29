import type { Request, Response } from "express";
import { courseSchema, lessonSchema } from "../types";
import prisma from "../../db";
import { string, treeifyError } from "zod";
import { da } from "zod/locales";


export const getallCourse = async (req: Request, res: Response) => {
  try {

    const newCourse = await prisma.course.findMany({
      include: {
        lessons: true
      }
    })
    res.status(200).json({ data: newCourse, message: 'sucess' })

  } catch (error) {
    res.status(400).json({ message: "err in createcourse" })
  }
}


export const deleteCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'course id required' })
    }
    const newCourse = await prisma.course.delete({
      where: {
        id: id as string
      },
      include: {
        lessons: true
      }
    })
    res.status(200).json({ message: 'deleted sucessfully' })

  } catch (error) {
    res.status(400).json({ message: "err in createcourse" })
  }
}
export const getCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'course id required' })
    }
    const newCourse = await prisma.course.findUnique({
      where: {
        id: id as string
      },
      include: {
        lessons: true
      }
    })
    res.status(200).json({ data: newCourse, message: 'sucess' })

  } catch (error) {
    res.status(400).json({ message: "err in createcourse" })
  }
}

export const editCourseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body
    const courseData = courseSchema.safeParse(data)

    if (!courseData.success) {
      return res.status(400).json({ error: courseData.error })
    }

    if (!id) {
      return res.status(400).json({ message: 'course id required' })
    }
    const newCourse = await prisma.course.update({
      data: {
        description: courseData.data.description,
        title: courseData.data.title,
        price: courseData.data.price
      }, where: {
        id: id as string
      },
      include: {
        lessons: true
      }
    })
    res.status(200).json({ data: newCourse, message: 'sucess' })

  } catch (error) {
    res.status(400).json({ message: "err in createcourse" })
  }
}

export const createCourse = async (req: Request, res: Response) => {
  try {
    const data = req.body
    const courseData = courseSchema.safeParse(data)
    if (!courseData.success) {
      return res.status(400).json({ error: courseData.error })
    }
    if (!req.user.id) {
      return res.status(400).json({ error: 'userid required' })
    }
    const newCourse = await prisma.course.create({
      data: {
        price: courseData.data.price,
        title: courseData.data.title,
        description: courseData.data.description,
        instructorId: req.user.id
      }
    })
    res.status(201).json({ data: newCourse, message: 'course creted' })

  } catch (error) {
    console.log(error)

    res.status(400).json({ message: "err in createcourse" })
  }
}



export const createLessonById = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params
    if (!courseId) {
      return res.status(400).json({ meassage: 'need courseId' })

    }
    const data = req.body
    const courseData = lessonSchema.safeParse(data)
    if (!courseData.success) {
      return res.status(400).json({ error: courseData.error })
    }

    const newCourse = await prisma.lesson.create({
      data: {
        title: courseData.data.title,
        content: courseData.data.content,
        courseId: courseId as string
      }
    })
    res.status(201).json({ data: newCourse, message: 'lesson created' })

  } catch (error) {
    res.status(400).json({ message: "err in createcourse" })
  }
}
export const getLessonById = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params
    if (!courseId) {
      return res.status(400).json({ meassage: 'need courseId' })

    }

    const newCourse = await prisma.lesson.findUnique({
      where: {
        id: courseId as string
      }
    })
    res.status(201).json({ data: newCourse, message: 'lesson created' })

  } catch (error) {
    res.status(400).json({ message: "err in createcourse" })
  }

}

export const getStatsById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ meassage: 'need courseId' })

    }

    const stats = await prisma.course.findUnique({
      where: {
        id: id as string,
      },
      select: {
        price: true,
        _count: {
          select: {
            purchases: true
          }
        }
      }
    })

    const data = {
      totalPurchases: stats?._count.purchases,
      totalRevenue: (stats?.price ?? 0) * (stats?._count.purchases ?? 0),
      coursePrice: stats?.price
    }
    res.status(201).json({ data: data, message: 'lesson created' })

  } catch (error) {
    res.status(400).json({ message: "err in createcourse" })
  }

}
