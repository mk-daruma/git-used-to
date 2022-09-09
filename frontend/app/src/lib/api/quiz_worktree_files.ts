import client from "lib/api/client"

export const createQuizWorktreeFile = (data: これから作成) => {
  return client.post("quiz_worktree_files", data)
}

export const updateQuizWorktreeFile = (id: number | undefined | null, data: これから作成) => {
  return client.post(`quiz_worktree_files/${id}`, data)
}

export const deleteQuizWorktreeFile = (id: number | undefined | null) => {
  return client.delete(`quiz_worktree_files/${id}`)
}
