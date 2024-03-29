import { CreateQuizCommitMessage } from "interfaces"
import client from "lib/api/client"

export const createQuizCommitMessage = (data: CreateQuizCommitMessage[]) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_commit_messages", data)
  }
}

export const getQuizCommitMessage = (id: number | undefined | null) => {
  return client.get(`quiz_commit_messages/${id}`)
}

export const deleteQuizCommitMessage = (id: number | undefined | null) => {
  return client.delete(`quiz_commit_messages/${id}`)
}
