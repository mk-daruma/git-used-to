export interface SignUpData {
  userName: string
  email: string
  password: string
  passwordConfirmation: string
  image: string
  confirmSuccessUrl: string
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
  image: {
    url: string
  }
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

export interface ChangeUserPasswordData {
  password: string
  passwordConfirmation: string
}

export interface ChangeUserPasswordFormData extends FormData {
  append(name: keyof ChangeUserPasswordData, value: String | Blob, fileName?: string): any
}

export interface ForgetUserPasswordData {
  email: string
  redirectUrl: string
}

export interface ForgetUserPasswordFormData extends FormData {
  append(name: keyof ChangeUserPasswordData, value: String | Blob, fileName?: string): any
}

export interface RedirectChangeUserPasswordData {
  password: string
  passwordConfirmation: string
  reset_password_token: string
  access_token: string
  client: string
  uid: string
}

export interface RedirectChangeUserPasswordFormData extends FormData {
  append(name: keyof RedirectChangeUserPasswordData, value: String | Blob, fileName?: string): any
}

export interface AboutQuizData {
  quizTitle: string
  quizIntroduction: string
  quizType: string
  userId: number | undefined
}

export interface QuizFirtsOrLastData {
  quizFirstOrLastStatus: string
  quizId : number
}

export interface CreateQuizBranch {
  quizBranchName: string
  quizFirstOrLastId : number
}

export interface CreateQuizWortreeFileData {
  quizWorktreeFileName: string
  quizWorktreeFileStatus: string
  quizBranchId: number
}

export interface CreateQuizCommitMessage {
  quizCommitMessage: string
  quizBranchId: number
}
