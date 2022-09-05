import client from "lib/api/client"
import Cookies from "js-cookie"

import { SignUpFormData, SignInParams, ChangeUserPasswordFormData, ForgetUserPasswordFormData } from "interfaces/index" //RedirectChangeUserPasswordDataFormData

export const signUp = (data: SignUpFormData) => {
  return client.post("auth", data)
}

export const signIn = (params: SignInParams)  => {
  return client.post("auth/sign_in", params)
}

export const signOut = () => {
  return client.delete("auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token") || "",
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
}

export const getCurrentUser = () => {
  if (!Cookies.get("_access_token") || !Cookies.get("_client") || !Cookies.get("_uid")) return
  return client.get("/auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token") || "",
    "client": Cookies.get("_client") || "",
    "uid": Cookies.get("_uid") || ""
  }})
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
