import { AboutQuizData } from "interfaces"
import client from "lib/api/client"

export const createQuiz = (data: AboutQuizData) => {
  return client.post("quizzes", data)
}

// export const updateQuiz = (id: number | undefined | null, data: これから作成) => {
//   return client.post(`quizzes/${id}`, data)
// }

export const getQuiz = (id: number | undefined | null) => {
  return client.get(`quizzes/${id}`)
}

export const deleteQuiz = (id: number | undefined | null) => {
  return client.delete(`quizzes/${id}`)
}
