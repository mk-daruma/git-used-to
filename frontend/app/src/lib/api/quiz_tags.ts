import { createQuizTagData } from "interfaces"
import client from "lib/api/client"

export const getAllQuizTags = () => {
  return client.get("quiz_tags")
}

export const createQuizTag = (data: createQuizTagData) => {
  return client.post("quiz_tags", data)
}

export const deleteQuizTag = (id: number | undefined | null) => {
  return client.delete(`quiz_tags/${id}`)
}