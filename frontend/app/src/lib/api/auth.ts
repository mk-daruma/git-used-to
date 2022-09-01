import client from "lib/api/client"
import Cookies from "js-cookie"
// import { useLocation } from "react-router-dom"

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

// 理想はこちらでapi通信の記述はまとめたいが、一旦動くこと優先でRedirectForgetPassword.tsxに移動をした。
// 消さずにわかりやすいようにコメントアウトで残す。
// export const redirectForgetCurrentUserPassword = (data: RedirectChangeUserPasswordDataFormData) => {
//   const search = useLocation().search;
//   const query = new URLSearchParams(search);
//   return client.put("auth", data, { headers: {
//     "access-token": query.get('access-token') || "",
//     "client": query.get('client')|| "",
//     "uid": query.get("uid") || "",
//     "reset_password_token": query.get('token') || "",
//   }})
// }

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
