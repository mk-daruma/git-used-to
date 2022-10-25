import { CreateQuizRemoteCommitMessage } from "interfaces"
import client from "lib/api/client"

export const createQuizRemoteCommitMessage = (data: any) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_remote_commit_messages", data)
  }
}

export const getQuizRemoteCommitMessage = (id: number | undefined | null) => {
  return client.get(`quiz_remote_commit_messages/${id}`)
}

export const deleteQuizRemoteCommitMessage = (id: number | undefined | null) => {
  return client.delete(`quiz_remote_commit_messages/${id}`)
}
