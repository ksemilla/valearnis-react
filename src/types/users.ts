export interface User {
  id?: number
  email: string
  name: string
  role: UserRole
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

export interface Stat {
  total_quizzes: number
  average_percentage: number
}
