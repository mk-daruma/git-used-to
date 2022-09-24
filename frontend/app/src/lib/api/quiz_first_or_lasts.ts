import { QuizFirtsOrLastData } from "interfaces"
import client from "lib/api/client"

export const createQuizFirstOrLast = (data: QuizFirtsOrLastData) => {
  return client.post("quiz_first_or_lasts", data)
}

// export const updateQuizFirstOrLast = (id: number | undefined | null, data: これから作成) => {
//   return client.post(`quiz_first_or_lasts/${id}`, data)
// }

export const getQuizFirstOrLast = (id: number | undefined | null) => {
  return client.get(`quiz_first_or_lasts/${id}`)
}

export const deleteQuizFirstOrLast = (id: number | undefined | null) => {
  return client.delete(`quiz_first_or_lasts/${id}`)
}
