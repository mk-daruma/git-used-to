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

export interface AboutQuizzesData {
  id: string
  userId: string
  parentUserName: string
  parentUserImage: {
    url: string
  }
  quizTitle: string
  quizIntroduction: string
  // [key: string]: string;
}

export interface QuizFirtsOrLastData {
  quizFirstOrLastStatus: string
  quizId : number
}

export interface CreateQuizBranch {
  quizBranchName: string
  quizFirstOrLastId : number
}

export interface QuizWortreeFileData {
  quizWorktreeFileName: string
  quizWorktreeFileTextStatus: string
  quizBranchId: number | string
}

export interface CreateQuizIndexFileData {
  quizIndexFileName: string
  quizIndexFileTextStatus: string
  quizBranchId: number | string
}

export interface CreateQuizHistoryOfCommittedFileData {
  quizHistoryOfCommittedFileName: string
  quizHistoryOfCommittedFileTextStatus: string
  quizHistoryOfCommittedFilePastTextStatus: string
  quizHistoryOfCommittedFileParentPastCommitMessage: string
  quizBranchId: number
  quizCommitMessageId: number
}

export interface CreateQuizCommitMessage {
  quizCommitMessage: string
  quizBranchId: number | string
}

export interface CreateQuizRepositoryFileData {
  quizRepositoryFileName: string
  quizRepositoryFileStatus: string
  quizRepositoryFileTextStatus: string
  quizCommitMessageId: number
}

export interface CreateQuizRemoteCommitMessage {
  quizRemoteCommitMessage: string
  quizRemoteBranchId: number | string
}

export interface CreateQuizRemoteRepositoryFileData {
  quizRemoteRepositoryFileName: string
  quizRemoteRepositoryFileStatus: string
  quizRemoteRepositoryFileTextStatus: string
  quizRemoteCommitMessageId: number
}

export interface createQuizAnswerRecordData {
  userId: number
  quizId: number
}

export interface createQuizBookmarkData {
  userId: number
  quizId: number
}

export interface createQuizCommentData {
  userId: number | undefined
  quizId: number
  comment: string
}

export interface createQuizTagData {
  quizId: number
  tag: string
}

export interface getLessonQuizzes {
  quizType: string
}

export interface UserRankingData {
  createUserId: number;
  createUserName: string;
  createUserIntroduction: string;
  createUserTitle: string;
  createUserImage: string;
  bookmarkCount: number;
}

interface QuizData {
  id: number;
  userId: number;
  quizTitle: string;
  quizIntroduction: string;
  quizType: string;
}

export interface QuizWeeklyRankingData {
  rankInQuizData: QuizData;
  createUserName: string;
  createUserTitle: string;
  createUserImage: string;
  bookmarkCount: number;
}

export interface UseStateBranchData {
  branchName: string;
  branchId?: string | number;
}

export interface QuizBranchData {
  id: number;
  quizBranchName: string
  quizFirstOrLastId : number
}

export interface QuizWorktreeFileData {
  id: number
  quizWorktreeFileName: string
  quizBranchName: string
  quizWorktreeFileTextStatus: string
  quizBranchId: number
}

export interface UseStateWorktreeFileData {
  fileName: string;
  parentBranch: string;
  textStatus: string;
  parentBranchId?: number | string;
  worktreeFileId?: number | string;
}

export interface QuizIndexFileData {
  id: number
  quizIndexFileName: string
  quizBranchName: string
  quizIndexFileTextStatus: string
  quizBranchId: number
}


export interface UseStateIndexFileData {
  fileName: string;
  parentBranch: string;
  textStatus: string;
  parentBranchId: string | number;
  indexFileId: string | number;
}

export interface QuizCommitMessageData {
  id: number;
  quizBranchId: number;
  quizCommitMessage: string;
  quizBranchName: string;
}

export interface UseStateCommitMessageData {
  message: string;
  parentBranch: string;
  parentBranchId: string | number;
  commitMessageId: string | number;
}

export interface QuizRepositoryFileData {
  id: number;
  quizRepositoryFileName: string;
  quizRepositoryFileTextStatus: string;
  quizBranchName: string;
  quizCommitMessage: string;
  quizBranchId: number;
  quizCommitMessageId: number;
}

export interface UseStateRepositoryFileData {
  fileName: string;
  textStatus: string;
  parentBranch: string;
  parentCommitMessage: string;
  parentBranchId: string |number;
  parentCommitMessageId: string |number;
  repositoryFileId: string | number;
}

export interface QuizHistoryOfCommittedFileData {
  id: number;
  quizHistoryOfCommittedFileName: string;
  quizHistoryOfCommittedFileStatus: string;
  quizHistoryOfCommittedFileTextStatus: string;
  quizHistoryOfCommittedFilePastTextStatus: string;
  quizBranchName: string;
  quizCommitMessage: string;
  quizHistoryOfCommittedFileParentPastCommitMessage: string;
  quizBranchId: number;
  quizCommitMessageId: number;
}

export interface UseStateFileHistoryForCansellCommitData {
  fileName: string;
  fileStatus: string;
  textStatus: string;
  pastTextStatus: string;
  parentBranch: string;
  parentCommitMessage: string;
  parentPastCommitMessage: string;
  parentBranchId: string | number;
  parentCommitMessageId: string | number;
  historyFileId: string | number;
}

export interface QuizRemoteBranchData {
  id: number
  quizRemoteBranchName: string
}

export interface UseStateRemoteBranchData {
  remoteBranchName: string;
  remoteBranchId?: string | number;
}

export interface QuizRemoteCommitMessageData {
  id: number;
  quizRemoteBranchId: number;
  quizRemoteCommitMessage: string;
  quizRemoteBranchName: string;
}

export interface UseStateRemoteCommitMessageData {
  remoteMessage: string;
  parentRemoteBranch: string;
  parentRemoteBranchId: string | number;
  remoteCommitMessageId: string | number;
}

export interface QuizRemoteRepositoryFileData {
  id: number;
  quizRemoteRepositoryFileName: string;
  quizRemoteRepositoryFileTextStatus: string;
  quizRemoteBranchName: string;
  quizRemoteCommitMessage: string;
  quizRemoteBranchId: number;
  quizRemoteCommitMessageId: number;
}

export interface UseStateRemoteRepositoryFileData {
  fileName: string;
  textStatus: string;
  parentRemoteBranch: string;
  parentRemoteCommitMessage?: string;
  parentRemoteBranchId?: string | number;
  parentRemoteCommitMessageId?: string | number;
  remoteRepositoryFileId?: string | number;
}

export interface AnswerBranchData {
  id: number;
  quizBranchName: string;
}

export interface AnswerWorktreeFileData {
  quizWorktreeFileName: string;
  quizWorktreeFileTextStatus: string;
  quizBranchName: string;
}

export interface AnswerIndexFileData {
  quizIndexFileName: string;
  quizIndexFileTextStatus: string;
  quizBranchName: string;
}

export interface AnswerCommitMessageData {
  id: number
}

export interface AnswerRepositoryFileData {
  quizRepositoryFileName: string;
  quizRepositoryFileTextStatus: string;
  quizBranchName: string;
}

export interface AnswerRemoteBranchData {
  id: number;
  quizRemoteBranchName: string;
}

export interface AnswerRemoteRepositoryFileData {
  quizRemoteRepositoryFileName: string;
  quizRemoteRepositoryFileTextStatus: string;
  quizRemoteBranchName: string;
}

type QuizUseStateArray  = UseStateBranchData | UseStateWorktreeFileData | UseStateIndexFileData | UseStateRepositoryFileData | UseStateRemoteBranchData | UseStateRemoteRepositoryFileData

export interface CheckTheAnswer {
  [key: string]: string | QuizUseStateArray;
}

export interface AnswerRecords {
  userId: number
  quizId: number
}

export type CheckDataCountArray = UseStateWorktreeFileData | UseStateIndexFileData | UseStateRepositoryFileData | UseStateCommitMessageData | UseStateRemoteBranchData | UseStateRemoteCommitMessageData | UseStateRemoteRepositoryFileData

export interface CheckDataCount {
  [key: string]: string | CheckDataCountArray | number;
}

export interface QuizBookmarkData {
  id: string
  userId: string
  quizId: string
}

export interface UserQuizListData {
  id: string
  userId: string
  createdUserName: string
  createdUserImage: string
  createdUserTitle: string
  quizTitle: string
  quizIntroduction: string
  createdAt: string
}

export interface QuizListData {
  quiz: {
    id: string
    userId: string
    quizTitle: string
    quizIntroduction: string
    createdAt: string
  }
  createdUserName: string
  createdUserImage: string
  createdUserNickname: string
}

export interface LessonQuizListData {
  id: string
  userId: string
  quizTitle: string
  quizIntroduction: string
  createdAt: string
}

export interface QuizTagData {
  id: string
  tag: string
  quizTitle: string
}
