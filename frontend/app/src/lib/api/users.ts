import { UpdateUserFormData } from "interfaces/index"
import client from "lib/api/client"

export const updateUser = (id: number | undefined | null, data: UpdateUserFormData) => {
  return client.put(`/users/${id}`, data)
}

