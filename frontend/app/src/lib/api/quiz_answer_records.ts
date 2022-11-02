import { createQuizAnswerRecordData } from "interfaces"
import client from "lib/api/client"

export const createQuizAnswerRecord = (data: createQuizAnswerRecordData) => {
  return client.post("quiz_answer_records", data)
}