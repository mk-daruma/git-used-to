import client from "lib/api/client"

export const createQuizRemoteBranch = (data :any) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_remote_branches", data)
  }
}

// export const updateQuizRemoteBranch = (id: number | undefined | null, data: これから作成) => {
//   return client.post(`quiz_remote_branches/${id}`, data)
// }

export const getQuizRemoteBranch = (id: number | undefined | null) => {
  return client.get(`quiz_remote_branches/${id}`)
}

export const deleteQuizRemoteBranch = (id: number | undefined | null) => {
  return client.delete(`quiz_remote_branches/${id}`)
}
