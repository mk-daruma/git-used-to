// import { CreateQuizBranch } from "interfaces"
import client from "lib/api/client"

export const createQuizBranch = (data :any) => {
  if (Object.keys(data).length > 0) {
    return client.post("quiz_branches", data)
  }
}

// export const updateQuizBranch = (id: number | undefined | null, data: これから作成) => {
//   return client.post(`quiz_branches/${id}`, data)
// }

export const getQuizBranch = (id: number | undefined | null) => {
  return client.get(`quiz_branches/${id}`)
}

export const deleteQuizBranch = (id: number | undefined | null) => {
  return client.delete(`quiz_branches/${id}`)
}
