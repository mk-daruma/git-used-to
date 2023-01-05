import { QuizWortreeFileData } from "interfaces"
import client from "lib/api/client"

export const createQuizWorktreeFile = (data: QuizWortreeFileData[]) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_worktree_files", data)
  }
}

export const updateQuizWorktreeFile = (id: number | undefined | null, data: QuizWortreeFileData) => {
  return client.patch(`quiz_worktree_files/${id}`, data)
}

export const deleteQuizWorktreeFile = (id: number | undefined | null) => {
  return client.delete(`quiz_worktree_files/${id}`)
}
