import { createQuizBookmarkData } from "interfaces"
import client from "lib/api/client"

export const createQuizBookmark = (data: createQuizBookmarkData) => {
  return client.post("quiz_bookmarks", data)
}

export const deleteQuizBookmark = (id: number | undefined | null) => {
  return client.delete(`quiz_bookmarks/${id}`)
}