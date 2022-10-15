import { CreateQuizHistoryOfCommittedFileData } from "interfaces"
import client from "lib/api/client"

export const CreateQuizHistoryOfCommittedFile = (data: CreateQuizHistoryOfCommittedFileData) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_history_of_committed_files", data)
  }
}

// export const updateQuizHistoryOfCommittedFile = (id: number | undefined | null, data: これから作成) => {
//   return client.post(`quiz_history_of_committed_files/${id}`, data)
// }

export const deleteQuizHistoryOfCommittedFile = (id: number | undefined | null) => {
  return client.delete(`quiz_history_of_committed_files/${id}`)
}
