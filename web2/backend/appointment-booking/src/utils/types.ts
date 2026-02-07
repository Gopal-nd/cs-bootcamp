

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string,
        role: 'SERVICE_PROVIDER' | 'USER' | string
        name?: string
      }
    }
  }
}
