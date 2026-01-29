

import express from 'express'
import { instructorMiddleware, requiredRole } from '../middleware/authmiddleware'
import { createCourse, createLessonById, deleteCourseById, editCourseById, getallCourse, getCourseById, getLessonById, getStatsById } from '../constrollers/courses'

const router = express.Router()

router.post('/', requiredRole('INSTRUCTOR'), createCourse)
router.get('/', getallCourse)
router.get('/:id', getCourseById)
router.patch('/:id', instructorMiddleware, editCourseById)
router.delete('/:id', instructorMiddleware, deleteCourseById)
router.post('/:courseId/lessons', instructorMiddleware, createLessonById)
router.get('/:courseId/lessons', getLessonById)
router.get('/:id/stats', instructorMiddleware, getStatsById)
export default router

