import client from "lib/api/client"
import Cookies from "js-cookie"

import { UpdateUserFormData, ChangeUserPasswordFormData, ForgetUserPasswordFormData } from "interfaces/index"

export const getAllUsers = () => {
  return client.get("users")
}

export const updateUser = (id: number | undefined | null, data: UpdateUserFormData) => {
  return client.put(`/users/${id}`, data)
}

export const getUserQuizzes = (id: number | undefined | null) => {
  return client.get(`/users/${id}`)
}

export const getUserProfile = (id: number | undefined | null) => {
  return client.get(`/users/${id}/profile`)
}

export const updateUsertitle = (id: number | undefined | null) => {
  return client.post(`/users/${id}/give_title`)
}

export const getUserSelfBookmarked = (id: number | undefined | null) => {
  return client.get(`/users/${id}/self_bookmarked`)
}

export const getUserRanking = () => {
  return client.get(`users/user_ranking`)
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
