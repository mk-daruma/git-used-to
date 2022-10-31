import { QuizFirtsOrLastData } from "interfaces"
import client from "lib/api/client"

export const createQuizFirstOrLast = (data: QuizFirtsOrLastData | undefined) => {
  if (data !== undefined) {
    return client.post("quiz_first_or_lasts", data)
  }
}

export const getQuizFirstOrLast = (id: number | undefined | null) => {
  return client.get(`quiz_first_or_lasts/${id}`)
}

export const deleteQuizFirstOrLast = (id: number | undefined | null) => {
  return client.delete(`quiz_first_or_lasts/${id}`)
}
