import client from "lib/api/client"
import Cookies from "js-cookie"

import { UpdateUserFormData, ChangeUserPasswordFormData, ForgetUserPasswordFormData } from "interfaces/index"

export const updateUser = (id: number | undefined | null, data: UpdateUserFormData) => {
  return client.put(`/users/${id}`, data)
}

export const changeCurrentUserPassword = (data: ChangeUserPasswordFormData) => {
  return client.put("auth", data, { headers: {
    "access-token": Cookies.get("_access_token") || "",
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
}

export const forgetCurrentUserPassword = (data: ForgetUserPasswordFormData) => {
  return client.post("auth/password", data)
}

export const deleteUser = () => {
  return client.delete("auth", { headers: {
    "access-token": Cookies.get("_access_token") || "",
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
}
