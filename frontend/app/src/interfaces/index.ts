export interface SignUpParams {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
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
  userSelfIntroduction: string
  nickname?: string
  image?: string
  allowPasswordChange: boolean
  created_at: Date
  updated_at: Date
}
