import client from "lib/api/client"

export const createQuizRepositoryFile = (data: これから作成) => {
  return client.post("quiz_repository_files", data)
}

export const updateQuizRepositoryFile = (id: number | undefined | null, data: これから作成) => {
  return client.post(`quiz_repository_files/${id}`, data)
}

export const deleteQuizRepositoryFile = (id: number | undefined | null) => {
  return client.delete(`quiz_repository_files/${id}`)
}
