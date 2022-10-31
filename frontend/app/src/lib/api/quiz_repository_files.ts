import { CreateQuizRepositoryFileData } from "interfaces"
import client from "lib/api/client"

export const createQuizRepositoryFile = (data: CreateQuizRepositoryFileData) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_repository_files", data)
  }
}

export const deleteQuizRepositoryFile = (id: number | undefined | null) => {
  return client.delete(`quiz_repository_files/${id}`)
}
