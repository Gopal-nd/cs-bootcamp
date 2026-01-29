import express from 'express'

enum Role {
  STUDENT = 'STUDENT',
  INSTRUCTOR = 'INSTRUCTOR'
}

declare global {
  namespace Express {
    interface Request {
      user: { email: string, name: string, role: Role, id: string }
    }
  }
}
