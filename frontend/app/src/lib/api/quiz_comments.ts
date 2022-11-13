import { createQuizCommentData } from "interfaces"
import client from "lib/api/client"

export const getAllQuizComments = () => {
  return client.get("quiz_comments")
}

export const createQuizComment = (data: createQuizCommentData) => {
  return client.post("quiz_comments", data)
}

export const deleteQuizComment = (id: number | undefined | null) => {
  return client.delete(`quiz_comments/${id}`)
}