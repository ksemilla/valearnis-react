import { User } from "."

export interface Lesson {
  id?: number
  slug: string
  name: string
  subtitle: string
  description: string
  lesson_elements: LessonElement[]
  img_url: string
  quizzes: Quiz[]
}

export interface LessonElement {
  id?: number
  type: "text" | "image"
  display_order: number
  text: string
  img_url: string
}

export interface Quiz {
  id?: number
  lesson: Lesson
  name: string
  questions: Question[]
}

export enum QuestionType {
  SINGLE_MUTIPLE_CHOICE = "smc",
  MULTI_MULTIPLE_CHOICE = "mmc",
}

export interface Question {
  id?: number
  quiz?: Quiz
  text: string
  type: QuestionType
  choices: Choice[]
}

export interface Choice {
  id?: number
  question?: Question
  text: string
  is_answer: boolean
}

export interface QuizAnswer {
  id?: number
  user: User
  quiz: Quiz
  total: number
  total_items: number
  percentage: number
}

export interface QuizAnswerItem {
  id?: number
  question: Question
  answers: Choice[] | []
}

export interface QuizResult {
  quiz_answer_id: number
  quiz: Quiz
  total_items: number
  total: number
  quiz_items: QuizAnswerItem[]
}
