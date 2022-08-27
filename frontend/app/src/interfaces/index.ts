export interface SignUpData {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  image: string
}

export interface SignUpFormData extends FormData {
  append(name: keyof SignUpData, value: String | Blob, fileName?: string): any
}

export interface SignInParams {
  email: string
  password: string
}

export interface User {
  id: number
  uid: string
  provider: string
  email: string
  userName: string
  userSelfIntroduction?: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}

export interface UpdateUserData {
  id: number | undefined | null
  userName?: string
  userSelfIntroduction?: string
  image?: string
}

export interface UpdateUserFormData extends FormData {
  append(name: keyof UpdateUserData, value: String | Blob, fileName?: string): any
}