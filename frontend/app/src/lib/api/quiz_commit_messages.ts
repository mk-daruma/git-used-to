import client from "lib/api/client"

export const createQuizCommitMessage = (data: これから作成) => {
  return client.post("quiz_commit_messages", data)
}

export const updateQuizCommitMessage = (id: number | undefined | null, data: これから作成) => {
  return client.post(`quiz_commit_messages/${id}`, data)
}

export const showQuizCommitMessage = (id: number | undefined | null) => {
  return client.get(`quiz_commit_messages/${id}`)
}

export const deleteQuizCommitMessage = (id: number | undefined | null) => {
  return client.delete(`quiz_commit_messages/${id}`)
}
