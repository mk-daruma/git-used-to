import { AboutQuizData, getLessonQuizzes } from "interfaces"
import client from "lib/api/client"

export const createQuiz = (data: AboutQuizData | undefined) => {
  if (data !== undefined) {
    return client.post("quizzes", data)
  }
}

export const updateQuiz = (id: number | undefined | null, data: AboutQuizData) => {
  return client.put(`/quizzes/${id}`, data)
}

export const getAllQuizzes = () => {
  return client.get("quizzes")
}

export const getQuiz = (id: number | undefined | null) => {
  return client.get(`quizzes/${id}`)
}

export const getLessonQuizes = (data: getLessonQuizzes) => {
  return client.post("quizzes/lesson_quizzes", data)
}

export const deleteQuiz = (id: number | undefined | null) => {
  return client.delete(`quizzes/${id}`)
}

export const getQuizTags = (id: number | undefined | null) => {
  return client.get(`quizzes/${id}/tag`)
}

export const getWeeklyRankingQuizzes = () => {
  return client.get(`quizzes/weekly_ranking`)
}