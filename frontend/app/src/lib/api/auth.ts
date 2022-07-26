import client from "lib/api/client"
import Cookies from "js-cookie"

import { SignUpFormData, SignInParams } from "interfaces/index"

export const signUp = (data: SignUpFormData) => {
  return client.post("auth", data)
}

export const signIn = (params: SignInParams)  => {
  return client.post("auth/sign_in", params)
}

export const guestSignIn = ()  => {
  return client.post("auth/guest_sign_in")
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
