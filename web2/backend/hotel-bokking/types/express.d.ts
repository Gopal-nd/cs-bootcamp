
export enum UserRole {
  customer = 'customer',
  owner = 'owner'
}

declare global {
  namespace Express {
    interface Request {
      user: { id: string, name?: string, email: string, role: UserRole }
    }
  }
}
