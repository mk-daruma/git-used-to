import { CreateQuizRepositoryFileData } from "interfaces"
import client from "lib/api/client"

export const createQuizRepositoryFile = (data: any) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_repository_files", data)
  }
}

// export const updateQuizRepositoryFile = (id: number | undefined | null, data: これから作成) => {
//   return client.post(`quiz_repository_files/${id}`, data)
// }

export const deleteQuizRepositoryFile = (id: number | undefined | null) => {
  return client.delete(`quiz_repository_files/${id}`)
}
