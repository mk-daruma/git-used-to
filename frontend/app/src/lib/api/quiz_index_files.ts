import { QuizIndexFileData } from "interfaces"
import client from "lib/api/client"

export const createQuizIndexFile = (data: any) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_index_files", data)
  }
}

export const updateQuizIndexFile = (id: number | undefined | null, data: QuizIndexFileData) => {
  return client.patch(`quiz_index_files/${id}`, data)
}

export const deleteQuizIndexFile = (id: number | undefined | null) => {
  return client.delete(`quiz_index_files/${id}`)
}
