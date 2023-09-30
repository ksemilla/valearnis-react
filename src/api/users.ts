import { AccessToken, Credentials, QuizAnswer, Stat, User } from "../types"
import { ApiService } from "./BaseService"

export class UsersService {
  static createUser(data: Credentials) {
    return ApiService.post<AccessToken>("users/", data)
  }

  static getUser(id: number) {
    return ApiService.get<User>(`users/${id}/`)
  }

  static updateUser(id: number, data: User) {
    return ApiService.put<User>(`users/${id}/`, data)
  }

  static list() {
    return ApiService.get<User[]>(`users/`)
  }

  static getUserStats(id: number) {
    return ApiService.get<Stat>(`users/${id}/stats/`)
  }

  static getQuizAnswers(id: number) {
    return ApiService.get<QuizAnswer[]>(`users/${id}/quiz-answers/`)
  }
}
