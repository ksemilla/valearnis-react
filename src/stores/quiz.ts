import { create } from "zustand"
import { Choice, Question, QuestionType, QuizAnswerItem } from "../types"

interface QuizAnswerState {
  items: QuizAnswerItem[]
  reset: () => void
  setItems: (data: QuizAnswerItem[]) => void
  applyAnswer: (question: Question, type: QuestionType, choice: Choice) => void
}

export const useQuizAnswerStore = create<QuizAnswerState>()((set) => ({
  items: [],

  reset: () => set((state) => ({ ...state, items: [] })),
  setItems: (data: QuizAnswerItem[]) =>
    set((state) => ({ ...state, items: data })),
  applyAnswer: (question: Question, type: QuestionType, choice: Choice) =>
    set((state) => {
      return {
        ...state,
        items: state.items.map((qa) => {
          if (qa.question.id === question.id) {
            if (type === QuestionType.SINGLE_MUTIPLE_CHOICE) {
              return {
                question: qa.question,
                answers: [choice],
              }
            } else {
              const _choice = qa.answers.find((a) => a.id === choice.id)
              return {
                question: qa.question,
                answers: _choice
                  ? qa.answers.filter((a) => a.id !== _choice.id)
                  : [...qa.answers, choice],
              }
            }
          } else {
            return qa
          }
        }),
      }
    }),
}))
