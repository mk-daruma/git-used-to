import { CreateQuizRemoteRepositoryFileData } from "interfaces"
import client from "lib/api/client"

export const createQuizRemoteRepositoryFile = (data: any) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_remote_repository_files", data)
  }
}

// export const updateQuizRemoteRepositoryFile = (id: number | undefined | null, data: これから作成) => {
//   return client.post(`quiz_remote_repository_files/${id}`, data)
// }

export const deleteQuizRemoteRepositoryFile = (id: number | undefined | null) => {
  return client.delete(`quiz_remote_repository_files/${id}`)
}
