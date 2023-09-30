import { Lesson, Quiz, QuizAnswerItem, QuizResult } from "../types"
import { ApiService } from "./BaseService"

export class LessonsService {
  static createLesson(data: Lesson) {
    return ApiService.post<Lesson>("lessons/", data)
  }

  static getBySlug(slug: string) {
    return ApiService.get<Lesson>(`lessons/${slug}/`)
  }

  static updateLesson(slug: string, data: Lesson) {
    return ApiService.put<Lesson>(`lessons/${slug}/`, data)
  }

  static list() {
    return ApiService.get<Lesson[]>(`lessons/`)
  }

  static createQuiz(slug: string, data: Quiz) {
    return ApiService.post<Quiz>(`lessons/${slug}/quizzes/`, data)
  }

  static getQuiz(slug: string, quiz_id: number) {
    return ApiService.get<Quiz>(`lessons/${slug}/quizzes/${quiz_id}/`)
  }

  static getQuizzes(slug: string) {
    return ApiService.get<Quiz[]>(`lessons/${slug}/quizzes/`)
  }

  static updateQuiz(slug: string, quiz_id: number, data: Quiz) {
    return ApiService.put<Quiz>(`lessons/${slug}/quizzes/${quiz_id}/`, data)
  }

  static getPublicQuiz(slug: string, quiz_id: number) {
    return ApiService.get<Quiz>(`lessons/${slug}/quizzes/${quiz_id}/take/`)
  }

  static submitPublicQuiz(
    slug: string,
    quiz_id: number,
    data: {
      quiz_items: QuizAnswerItem[]
    }
  ) {
    return ApiService.post<QuizResult>(
      `lessons/${slug}/quizzes/${quiz_id}/submit/`,
      data
    )
  }

  static getQuizAnswer(id: number) {
    return ApiService.get<QuizResult>(`quiz-answers/${id}/`)
  }
}
