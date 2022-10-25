import { QuizBranch } from "interfaces"
import client from "lib/api/client"

export const createQuizBranch = (data :QuizBranch) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_branches", data)
  }
}

export const updateQuizBranch = (id: number | undefined | null, data: QuizBranch) => {
  return client.patch(`quiz_branches/${id}`, data)
}

export const getQuizBranch = (id: number | undefined | null) => {
  return client.get(`quiz_branches/${id}`)
}

export const deleteQuizBranch = (id: number | undefined | null) => {
  return client.delete(`quiz_branches/${id}`)
}
