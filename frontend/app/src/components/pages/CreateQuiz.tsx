import React, { useState, createContext, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion"

import AboutQuiz from "./AboutQuiz";

import { getQuiz } from "lib/api/quizzes";
import Terminal from "./Terminal";
import QuizBranchArea from "./QuizBranchArea";
import { getQuizFirstOrLast } from "lib/api/quiz_first_or_lasts";
import { getQuizBranch } from "lib/api/quiz_branches";
import QuizWorktreeFiles from "./QuizWorkingTreeArea";

import { getQuizCommitMessage } from "lib/api/quiz_commit_messages";
import { getQuizRemoteBranch } from "lib/api/quiz_remote_branches";
import { getQuizRemoteCommitMessage } from "lib/api/quiz_remote_commit_messages";
import CreateOrUpdateQuizButton from "./CreateQuizButton";
import { AuthContext } from "App";
import ReccomendSignUpModal from "./RecommendSignUpModal";
import { getUserQuizzes, updateUsertitle } from "lib/api/users";
import { makeStyles } from "@material-ui/core";
import QuizIndexArea from "./QuizIndexArea";
import QuizCommitMessageArea from "./QuizCommitMessageArea";
import QuizLocalRepositoryArea from "./QuizLocalRepositoryArea";
import QuizRemoteRepositoryArea from "./QuizRemoteRepositoryArea";
import QuizRemoteCoimmitMessageArea from "./QuizRemoteCommitMessageArea";
import AboutAnswerQuiz from "./AboutAnswerQuiz";
import {
  QuizBranchData,
  QuizCommitMessageData,
  QuizIndexFileData,
  QuizRepositoryFileData,
  QuizWorktreeFileData,
  UseStateBranchData,
  UseStateCommitMessageData,
  UseStateIndexFileData,
  UseStateRepositoryFileData,
  UseStateWorktreeFileData,
  UseStateFileHistoryForCansellCommitData,
  QuizHistoryOfCommittedFileData,
  UseStateRemoteBranchData,
  QuizRemoteBranchData,
  QuizRemoteCommitMessageData,
  UseStateRemoteRepositoryFileData,
  QuizRemoteRepositoryFileData,
  UseStateRemoteCommitMessageData,
  AnswerBranchData,
  AnswerWorktreeFileData,
  AnswerIndexFileData,
  AnswerRemoteBranchData,
  AnswerCommitMessageData,
  AnswerRepositoryFileData,
  AnswerRemoteRepositoryFileData
} from "interfaces";

const useStyles = makeStyles(() => ({
  position: {
    display: "flex",
    flexWrap: "wrap"
  },
  branch: {
    maxWidth: "76rem",
    width: "100%",
    border: "solid",
    borderRadius: "2rem",
    backgroundColor: "black",
  },
  area: {
    width: "19rem",
    height: "25rem",
    border: "solid",
    borderRadius: "2rem",
    backgroundColor: "black",
    overflow: 'scroll',
  },
  borderForm: {
    width: "19rem",
    height: "25rem",
    border: "solid",
    borderRadius: "2rem",
    backgroundColor: "#a9a9a9",
    overflow: 'scroll',
  },
}))

export const QuizContext = createContext({} as {
  userQuizzesCount: number
  setUserQuizzesCount: React.Dispatch<React.SetStateAction<number>>
  userTitle: string
  setUserTitle: React.Dispatch<React.SetStateAction<string>>
  quizTitle: string
  setQuizTitle: React.Dispatch<React.SetStateAction<string>>
  quizIntroduction: string
  setQuizIntroduction: React.Dispatch<React.SetStateAction<string>>
  quizFirstOrLastId: string
  setQuizFirstOrLastId: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  addText: string
  setAddText :React.Dispatch<React.SetStateAction<string>>
  gitInit: string
  setGitInit :React.Dispatch<React.SetStateAction<string>>
  remoteAdd: string
  setRemoteAdd :React.Dispatch<React.SetStateAction<string>>

  currentBranch: {
    currentBranchName: string
    currentBranchId :string
  }

  setCurrentBranch :React.Dispatch<React.SetStateAction<{
    currentBranchName: string
    currentBranchId :string
  }>>

  worktreeFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    worktreeFileId: string
  }[]

  setWorktreeFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    worktreeFileId: string
  }[]>>

  indexFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    indexFileId: string
  }[]

  setIndexFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    indexFileId: string
  }[]>>

  repositoryFiles: {
    fileName: string
    textStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    repositoryFileId: string
  }[]

  setRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    textStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    repositoryFileId: string
  }[]>>

  fileHistoryForCansellCommits: {
    fileName: string
    fileStatus: string
    textStatus: string
    pastTextStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentPastCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    historyFileId: string
  }[]

  setFileHistoryForCansellCommits:React.Dispatch<React.SetStateAction<{
    fileName: string
    fileStatus: string
    textStatus: string
    pastTextStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentPastCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    historyFileId: string
  }[]>>

  remoteRepositoryFiles: {
    fileName: string
    textStatus: string
    parentRemoteBranch: string
    parentRemoteCommitMessage: string
    parentRemoteBranchId: string
    parentRemoteCommitMessageId: string
    remoteRepositoryFileId: string
  }[]

  setRemoteRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    textStatus: string
    parentRemoteBranch: string
    parentRemoteCommitMessage: string
    parentRemoteBranchId: string
    parentRemoteCommitMessageId: string
    remoteRepositoryFileId: string
  }[]>>

  commitMessages: {
    message: string
    parentBranch: string
    parentBranchId: string
    commitMessageId: string
  }[]

  setCommitMessages: React.Dispatch<React.SetStateAction<{
    message: string
    parentBranch: string
    parentBranchId: string
    commitMessageId: string
  }[]>>

  remoteCommitMessages: {
    remoteMessage: string
    parentRemoteBranch: string
    parentRemoteBranchId: string
    remoteCommitMessageId: string
  }[]

  setRemoteCommitMessages: React.Dispatch<React.SetStateAction<{
    remoteMessage: string
    parentRemoteBranch: string
    parentRemoteBranchId: string
    remoteCommitMessageId: string
  }[]>>

  branches: {
    branchName: string
    branchId: string
  }[]

  setBranches: React.Dispatch<React.SetStateAction<{
    branchName: string
    branchId: string
  }[]>>

  remoteBranches: {
    remoteBranchName: string
    remoteBranchId: string
  }[]

  setRemoteBranches: React.Dispatch<React.SetStateAction<{
    remoteBranchName: string
    remoteBranchId: string
  }[]>>

  initialWorktreeFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    worktreeFileId: string
  }[]

  setInitialWorktreeFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    worktreeFileId: string
  }[]>>

  initialIndexFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    indexFileId: string
  }[]

  setInitialIndexFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
    parentBranchId: string
    indexFileId: string
  }[]>>

  initialRepositoryFiles: {
    fileName: string
    textStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    repositoryFileId: string
  }[]

  setInitialRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    textStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    repositoryFileId: string
  }[]>>

  initialFileHistoryForCansellCommits: {
    fileName: string
    fileStatus: string
    textStatus: string
    pastTextStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentPastCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    historyFileId: string
  }[]

  setInitialFileHistoryForCansellCommits:React.Dispatch<React.SetStateAction<{
    fileName: string
    fileStatus: string
    textStatus: string
    pastTextStatus: string
    parentBranch: string
    parentCommitMessage: string
    parentPastCommitMessage: string
    parentBranchId: string
    parentCommitMessageId: string
    historyFileId: string
  }[]>>

  initialRemoteRepositoryFiles: {
    fileName: string
    textStatus: string
    parentRemoteBranch: string
    parentRemoteCommitMessage: string
    parentRemoteBranchId: string
    parentRemoteCommitMessageId: string
    remoteRepositoryFileId: string
  }[]

  setInitialRemoteRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    textStatus: string
    parentRemoteBranch: string
    parentRemoteCommitMessage: string
    parentRemoteBranchId: string
    parentRemoteCommitMessageId: string
    remoteRepositoryFileId: string
  }[]>>

  initialCommitMessages: {
    message: string
    parentBranch: string
    parentBranchId: string
    commitMessageId: string
  }[]

  setInitialCommitMessages: React.Dispatch<React.SetStateAction<{
    message: string
    parentBranch: string
    parentBranchId: string
    commitMessageId: string
  }[]>>

  initialRemoteCommitMessages: {
    remoteMessage: string
    parentRemoteBranch: string
    parentRemoteBranchId: string
    remoteCommitMessageId: string
  }[]

  setInitialRemoteCommitMessages: React.Dispatch<React.SetStateAction<{
    remoteMessage: string
    parentRemoteBranch: string
    parentRemoteBranchId: string
    remoteCommitMessageId: string
  }[]>>

  initialBranches: {
    branchName: string
    branchId: string
  }[]

  setInitialBranches: React.Dispatch<React.SetStateAction<{
    branchName: string
    branchId: string
  }[]>>

  initialRemoteBranches: {
    remoteBranchName: string
    remoteBranchId: string
  }[]

  setInitialRemoteBranches: React.Dispatch<React.SetStateAction<{
    remoteBranchName: string
    remoteBranchId: string
  }[]>>

  answerBranches: {
    branchName: string
  }[]

  setAnswerBranches: React.Dispatch<React.SetStateAction<{
    branchName: string
  }[]>>

  answerRemoteBranches: {
    remoteBranchName: string
  }[]

  setAnswerRemoteBranches: React.Dispatch<React.SetStateAction<{
    remoteBranchName: string
  }[]>>

  answerWorktreeFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
  }[]

  setAnswerWorktreeFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
  }[]>>

  answerIndexFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
  }[]

  setAnswerIndexFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
  }[]>>

  answerRepositoryFiles: {
    fileName: string
    textStatus: string
    parentBranch: string
  }[]

  setAnswerRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    textStatus: string
    parentBranch: string
  }[]>>

  answerRemoteRepositoryFiles: {
    fileName: string
    textStatus: string
    parentRemoteBranch: string
  }[]

  setAnswerRemoteRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    textStatus: string
    parentRemoteBranch: string
  }[]>>

  commands: {
    text: string
    addText: string
  }[]

  setCommands: React.Dispatch<React.SetStateAction<{
    text: string
    addText: string
  }[]>>
  })

const CreateQuiz: React.FC = () => {
  const location = useLocation()
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  const { currentUser } = useContext(AuthContext)

  const [userTitle, setUserTitle] = useState<string>("")
  const [userQuizzesCount, setUserQuizzesCount] = useState(0)
  const [quizTitle, setQuizTitle] = useState<string>("")
  const [quizIntroduction, setQuizIntroduction] = useState<string>("")
  const [quizFirstOrLastId, setQuizFirstOrLastId] = useState<string>("")
  const [text, setText] = useState("");
  const [addText, setAddText] = useState("");
  const [gitInit, setGitInit] = useState<string>("not a git repository")
  const [remoteAdd, setRemoteAdd] = useState<string>("not added remote")
  const [currentBranch, setCurrentBranch] = useState({
    currentBranchName: "",
    currentBranchId : ""
  })
  const [worktreeFiles, setWorktreeFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: "",
    parentBranchId: "",
    worktreeFileId: ""
  }])
  const [indexFiles, setIndexFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: "",
    parentBranchId: "",
    indexFileId: ""
  }])
  const [repositoryFiles, setRepositoryFiles] = useState([{
    fileName: "",
    textStatus: "",
    parentBranch: "",
    parentCommitMessage: "",
    parentBranchId: "",
    parentCommitMessageId: "",
    repositoryFileId: ""
  }])
  const [fileHistoryForCansellCommits, setFileHistoryForCansellCommits] = useState([{
    fileName: "",
    fileStatus: "",
    textStatus: "",
    pastTextStatus: "",
    parentBranch: "",
    parentCommitMessage: "",
    parentPastCommitMessage: "",
    parentBranchId: "",
    parentCommitMessageId: "",
    historyFileId: ""
  }])
  const [remoteRepositoryFiles, setRemoteRepositoryFiles] = useState([{
    fileName: "",
    textStatus: "",
    parentRemoteBranch: "",
    parentRemoteCommitMessage: "",
    parentRemoteBranchId: "",
    parentRemoteCommitMessageId: "",
    remoteRepositoryFileId: ""
  }])
  const [commitMessages, setCommitMessages] = useState([{
    message: "",
    parentBranch: "",
    parentBranchId: "",
    commitMessageId: ""
  }])
  const [remoteCommitMessages, setRemoteCommitMessages] = useState([{
    remoteMessage: "",
    parentRemoteBranch: "",
    parentRemoteBranchId: "",
    remoteCommitMessageId: ""
  }])
  const [branches, setBranches] = useState([{
    branchName: "",
    branchId: ""
    }])
  const [remoteBranches, setRemoteBranches] = useState([{
    remoteBranchName: "",
    remoteBranchId: ""
    }])
  const [initialWorktreeFiles, setInitialWorktreeFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: "",
    parentBranchId: "",
    worktreeFileId: ""
  }])
  const [initialIndexFiles, setInitialIndexFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: "",
    parentBranchId: "",
    indexFileId: ""
  }])
  const [initialRepositoryFiles, setInitialRepositoryFiles] = useState([{
    fileName: "",
    textStatus: "",
    parentBranch: "",
    parentCommitMessage: "",
    parentBranchId: "",
    parentCommitMessageId: "",
    repositoryFileId: ""
  }])
  const [initialFileHistoryForCansellCommits, setInitialFileHistoryForCansellCommits] = useState([{
    fileName: "",
    fileStatus: "",
    textStatus: "",
    pastTextStatus: "",
    parentBranch: "",
    parentCommitMessage: "",
    parentPastCommitMessage: "",
    parentBranchId: "",
    parentCommitMessageId: "",
    historyFileId: ""
  }])
  const [initialRemoteRepositoryFiles, setInitialRemoteRepositoryFiles] = useState([{
    fileName: "",
    textStatus: "",
    parentRemoteBranch: "",
    parentRemoteCommitMessage: "",
    parentRemoteBranchId: "",
    parentRemoteCommitMessageId: "",
    remoteRepositoryFileId: ""
  }])
  const [initialCommitMessages, setInitialCommitMessages] = useState([{
    message: "",
    parentBranch: "",
    parentBranchId: "",
    commitMessageId: ""
  }])
  const [initialRemoteCommitMessages, setInitialRemoteCommitMessages] = useState([{
    remoteMessage: "",
    parentRemoteBranch: "",
    parentRemoteBranchId: "",
    remoteCommitMessageId: ""
  }])
  const [initialBranches, setInitialBranches] = useState([{
    branchName: "",
    branchId: ""
    }])
  const [initialRemoteBranches, setInitialRemoteBranches] = useState([{
    remoteBranchName: "",
    remoteBranchId: ""
    }])
  const [answerBranches, setAnswerBranches] = useState([{
    branchName: ""
    }])
  const [answerRemoteBranches, setAnswerRemoteBranches] = useState([{
    remoteBranchName: ""
    }])
  const [answerRemoteRepositoryFiles, setAnswerRemoteRepositoryFiles] = useState([{
    fileName: "",
    textStatus: "",
    parentRemoteBranch: "",
  }])
  const [answerWorktreeFiles, setAnswerWorktreeFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: ""
  }])
  const [answerIndexFiles, setAnswerIndexFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: ""
  }])
  const [answerRepositoryFiles, setAnswerRepositoryFiles] = useState([{
    fileName: "",
    textStatus: "",
    parentBranch: ""
  }])
  const [commands, setCommands] = useState([{
    text:"play with git-used-to!!",
    addText:""
  }]);

  const addBranches = (array :any, branchName :string, branchId :number) => {
    array((branches :UseStateBranchData[]) => [...branches,{
      branchName: branchName,
      branchId: branchId
    }])
  }
  const addWorktreeFiles = (array :any, fileName :string, parentBranch :string, textStatus :string, parentBranchId :number, worktreeFileId :number) => {
    array((worktreeFile :UseStateWorktreeFileData[]) => [...worktreeFile,{
      fileName: fileName,
      parentBranch: parentBranch,
      textStatus: textStatus,
      parentBranchId: parentBranchId,
      worktreeFileId: worktreeFileId
    }])
  }
  const addIndexFile = (array :any, fileName :string, parentBranch :string, textStatus :string, parentBranchId :number, worktreeFileId :number) => {
    array((indexFile :UseStateIndexFileData[]) => [...indexFile,{
      fileName: fileName,
      parentBranch: parentBranch,
      textStatus: textStatus,
      parentBranchId: parentBranchId,
      indexFileId: worktreeFileId
    }])
  }
  const addCommitMessages = (array :any, message :string, parentBranch :string, parentBranchId :number, commitMessageId :number) => {
    array((commitMessage :UseStateCommitMessageData[]) => [...commitMessage,{
      message: message,
      parentBranch: parentBranch,
      parentBranchId: parentBranchId,
      commitMessageId: commitMessageId
    }])
  }
  const addRepositoryFiles = (array :any, fileName :string, textStatus :string, parentBranch :string, parentCommitMessage :string, parentBranchId :number, parentCommitMessageId :number, repositoryFileId: number) => {
    array((repositoryFile :UseStateRepositoryFileData[]) => [...repositoryFile,{
      fileName: fileName,
      textStatus: textStatus,
      parentBranch: parentBranch,
      parentCommitMessage: parentCommitMessage,
      parentBranchId: parentBranchId,
      parentCommitMessageId: parentCommitMessageId,
      repositoryFileId: repositoryFileId
    }])
  }
  const addFileHistoryForCansellCommits = (array :any, fileName :string, fileStatus :string, textStatus :string, pastTextStatus :string, parentBranch :string, parentCommitMessage :string, parentPastCommitMessage :string, parentBranchId :number, parentCommitMessageId :number, historyFileId: number) => {
    array((historyFiles :UseStateFileHistoryForCansellCommitData[]) => [...historyFiles,{
      fileName: fileName,
      fileStatus: fileStatus,
      textStatus: textStatus,
      pastTextStatus: pastTextStatus,
      parentBranch: parentBranch,
      parentCommitMessage: parentCommitMessage,
      parentPastCommitMessage: parentPastCommitMessage,
      parentBranchId: parentBranchId,
      parentCommitMessageId: parentCommitMessageId,
      historyFileId: historyFileId
    }])
  }
  const addRemoteBranches = (array :any, remoteBranchName :string, remoteBranchId :number) => {
    array((branches :UseStateRemoteBranchData[]) => [...branches,{
      remoteBranchName: remoteBranchName,
      remoteBranchId: remoteBranchId
    }])
  }
  const addRemoteCommitMessages = (array :any, remoteMessage :string, parentRemoteBranch :string, parentRemoteBranchId :number, remoteCommitMessageId :number) => {
    array((commitMessage :UseStateRemoteCommitMessageData[]) => [...commitMessage,{
      remoteMessage: remoteMessage,
      parentRemoteBranch: parentRemoteBranch,
      parentRemoteBranchId: parentRemoteBranchId,
      remoteCommitMessageId: remoteCommitMessageId
    }])
  }
  const addRemoteRepositoryFiles = (array :any, fileName :string, textStatus :string, parentRemoteBranch :string, parentRemoteCommitMessage :string, parentRemoteBranchId :number, parentRemoteCommitMessageId :number, remoteRepositoryFileId :number) => {
    array((repositoryFile :UseStateRemoteRepositoryFileData[]) => [...repositoryFile,{
      fileName: fileName,
      textStatus: textStatus,
      parentRemoteBranch: parentRemoteBranch,
      parentRemoteCommitMessage: parentRemoteCommitMessage,
      parentRemoteBranchId: parentRemoteBranchId,
      parentRemoteCommitMessageId: parentRemoteCommitMessageId,
      remoteRepositoryFileId: remoteRepositoryFileId
    }])
  }

  const getBranches = [setBranches, setInitialBranches]
  const getWorktreeFiles = [setWorktreeFiles, setInitialWorktreeFiles]
  const getIndexFiles = [setIndexFiles, setInitialIndexFiles]
  const getCommitMessages = [setCommitMessages, setInitialCommitMessages]
  const getRepositoryFiles = [setRepositoryFiles, setInitialRepositoryFiles]
  const getFileHistoryForCansellCommits = [setFileHistoryForCansellCommits, setInitialFileHistoryForCansellCommits]
  const getRemoteBranches = [setRemoteBranches, setInitialRemoteBranches]
  const getRemoteCommitMessages = [setRemoteCommitMessages, setInitialRemoteCommitMessages]
  const getRemoteRepositoryFiles = [setRemoteRepositoryFiles, setInitialRemoteRepositoryFiles]

  const handleGetQuizData = async (quizFirstOrLastStatus :number) => {
    try {
      const ResQuiz = await getQuiz(Number(id))

      setQuizTitle(ResQuiz.data.quizData.quizTitle)
      setQuizIntroduction(ResQuiz.data.quizData.quizIntroduction)

      const ResQuizOfLast = await getQuizFirstOrLast(ResQuiz.data.quizFirstOrLastsData[quizFirstOrLastStatus].id)
      setQuizFirstOrLastId(ResQuiz.data.quizFirstOrLastsData[quizFirstOrLastStatus].id)

      if (ResQuizOfLast.data.dataBranches[0]) {
        setGitInit("Initialized empty Git repository")
        setCurrentBranch({
          currentBranchName: ResQuizOfLast.data.dataBranches[0].quizBranchName,
          currentBranchId: ResQuizOfLast.data.dataBranches[0].id
        })
      }

      await Promise.all(
        await ResQuizOfLast.data.dataBranches.map(async (branch :QuizBranchData) => {
          getBranches.forEach(getBranch =>
            addBranches(
              getBranch,
              branch.quizBranchName,
              branch.id
            )
          )
          const ResQuizBranches = await getQuizBranch(branch.id)
          ResQuizBranches.data.dataWorktreeFiles.forEach((worktree :QuizWorktreeFileData) => {
            getWorktreeFiles.forEach(getWorktreeFile =>
              addWorktreeFiles(
                getWorktreeFile,
                worktree.quizWorktreeFileName,
                branch.quizBranchName,
                worktree.quizWorktreeFileTextStatus,
                worktree.quizBranchId,
                worktree.id
              )
            )
          })
          ResQuizBranches.data.dataIndexFiles.forEach((indexFile :QuizIndexFileData) => {
            getIndexFiles.forEach(getIndexFile =>
              addIndexFile(
                getIndexFile,
                indexFile.quizIndexFileName,
                branch.quizBranchName,
                indexFile.quizIndexFileTextStatus,
                indexFile.quizBranchId,
                indexFile.id
              )
            )
          })
          ResQuizBranches.data.dataMessages.forEach(async (message :QuizCommitMessageData) => {
            getCommitMessages.forEach(getCommitMessage =>
              addCommitMessages(
                getCommitMessage,
                message.quizCommitMessage,
                branch.quizBranchName,
                message.quizBranchId,
                message.id
              )
            )
            const ResQuizCommitMessages = await getQuizCommitMessage(message.id)
            await Promise.all(
              ResQuizCommitMessages.data.dataRepositoryFiles.map((data :QuizRepositoryFileData) => {
                return getRepositoryFiles.forEach(getRepositoryFile =>
                  addRepositoryFiles(
                    getRepositoryFile,
                    data.quizRepositoryFileName,
                    data.quizRepositoryFileTextStatus,
                    branch.quizBranchName,
                    message.quizCommitMessage,
                    data.quizBranchId,
                    message.id,
                    data.id
                  )
                )
              })
            )
            await Promise.all(
              ResQuizCommitMessages.data.dataHistoryOfCommittedFiles.map((historyFile :QuizHistoryOfCommittedFileData) => {
                return getFileHistoryForCansellCommits.forEach(getFileHistoryForCansellCommit =>
                  addFileHistoryForCansellCommits(
                    getFileHistoryForCansellCommit,
                    historyFile.quizHistoryOfCommittedFileName,
                    historyFile.quizHistoryOfCommittedFileStatus,
                    historyFile.quizHistoryOfCommittedFileTextStatus,
                    historyFile.quizHistoryOfCommittedFilePastTextStatus,
                    branch.quizBranchName, message.quizCommitMessage,
                    historyFile.quizHistoryOfCommittedFileParentPastCommitMessage,
                    message.quizBranchId,
                    message.id,
                    historyFile.id
                  )
                )
              })
            )
          }
        )})
      )
      await ResQuizOfLast.data.dataRemoteBranches.map(async (remoteBranch :QuizRemoteBranchData) => {
        getRemoteBranches.forEach(getRemoteBranch =>
          addRemoteBranches(
            getRemoteBranch,
            remoteBranch.quizRemoteBranchName,
            remoteBranch.id
          )
        )
        const ResQuizRemoteBranches = await getQuizRemoteBranch(remoteBranch.id)
        ResQuizRemoteBranches.data.dataRemoteMessages.map(async (message :QuizRemoteCommitMessageData) => {
          getRemoteCommitMessages.forEach(getRemoteCommitMessage =>
            addRemoteCommitMessages(
              getRemoteCommitMessage,
              message.quizRemoteCommitMessage,
              remoteBranch.quizRemoteBranchName,
              message.quizRemoteBranchId,
              message.id
            )
          )
          const ResQuizRemoteCommitMessages = await getQuizRemoteCommitMessage(message.id)
          await Promise.all(
            ResQuizRemoteCommitMessages.data.dataRemoteRepositoryFiles.map((data :QuizRemoteRepositoryFileData) => {
              return getRemoteRepositoryFiles.forEach(getRemoteRepositoryFile =>
                addRemoteRepositoryFiles(
                  getRemoteRepositoryFile,
                  data.quizRemoteRepositoryFileName,
                  data.quizRemoteRepositoryFileTextStatus,
                  remoteBranch.quizRemoteBranchName,
                  message.quizRemoteCommitMessage,
                  message.quizRemoteBranchId,
                  message.id,
                  data.id
                )
              )
            })
          )
        })
      })
      if (ResQuizOfLast.data.dataRemoteBranches[0]) setRemoteAdd("added remote")
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetQuizAnswer = async () => {
    try {
      const ResQuiz = await getQuiz(Number(id))

      const ResQuizOfLast = await getQuizFirstOrLast(ResQuiz.data.quizFirstOrLastsData[0].id)

      console.log("ResQuiz",ResQuiz)
      console.log("ResQuizOfLast",ResQuizOfLast)

      await ResQuizOfLast.data.dataBranches.forEach(async (branch :AnswerBranchData) => {
        setAnswerBranches(branches => [...branches,{
          branchName: branch.quizBranchName,
        }])
        const ResQuizBranches = await getQuizBranch(branch.id)
        ResQuizBranches.data.dataWorktreeFiles.forEach((worktree :AnswerWorktreeFileData) => {
          setAnswerWorktreeFiles(worktreeFile => [...worktreeFile,{
            fileName: worktree.quizWorktreeFileName,
            parentBranch: branch.quizBranchName,
            textStatus: worktree.quizWorktreeFileTextStatus
          }])
        })
        ResQuizBranches.data.dataIndexFiles.forEach((indexFile :AnswerIndexFileData) => {
          setAnswerIndexFiles(indexFiles => [...indexFiles,{
            fileName: indexFile.quizIndexFileName,
            parentBranch: branch.quizBranchName,
            textStatus: indexFile.quizIndexFileTextStatus
          }])
        })
        ResQuizBranches.data.dataMessages.forEach(async (message :AnswerCommitMessageData) => {
          const ResQuizCommitMessages = await getQuizCommitMessage(message.id)
          await Promise.all(
            ResQuizCommitMessages.data.dataRepositoryFiles.map((data :AnswerRepositoryFileData) => {
              return setAnswerRepositoryFiles(repositoryFile => [...repositoryFile,{
                fileName: data.quizRepositoryFileName,
                textStatus: data.quizRepositoryFileTextStatus,
                parentBranch: branch.quizBranchName
              }])
            })
          )
        }
      )})
      await ResQuizOfLast.data.dataRemoteBranches.map(async (remoteBranch :AnswerRemoteBranchData) => {
        setAnswerRemoteBranches(branches => [...branches,{
          remoteBranchName: remoteBranch.quizRemoteBranchName
        }])
        const ResQuizRemoteBranches = await getQuizRemoteBranch(remoteBranch.id)
        ResQuizRemoteBranches.data.dataRemoteMessages.map(async (message :AnswerCommitMessageData) => {
          const ResQuizRemoteCommitMessages = await getQuizRemoteCommitMessage(message.id)
          await Promise.all(
            ResQuizRemoteCommitMessages.data.dataRemoteRepositoryFiles.map((data :AnswerRemoteRepositoryFileData) => {
              return setAnswerRemoteRepositoryFiles(repositoryFile => [...repositoryFile,{
                fileName: data.quizRemoteRepositoryFileName,
                textStatus: data.quizRemoteRepositoryFileTextStatus,
                parentRemoteBranch: remoteBranch.quizRemoteBranchName,
              }])
            })
          )
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetUserTitle = async() => {
    try {
      const resGetUserTitle = await updateUsertitle(currentUser?.id)
      setUserTitle(resGetUserTitle.data.userData)
      const resGetUserQuizzesCount = await getUserQuizzes(currentUser?.id)
      setUserQuizzesCount(resGetUserQuizzesCount.data.data.length)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    location.pathname === (`/quiz`) && handleGetUserTitle()
    location.pathname === (`/quiz/edit/${id}`) && handleGetQuizData(0)
    location.pathname === (`/quiz/init/edit/${id}`) && handleGetQuizData(1)
    if (location.pathname === (`/quiz/answer/${id}`)) {
      handleGetQuizData(1)
      handleGetQuizAnswer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("userTitle", userTitle)
  },[userTitle])

  useEffect(() => {
    console.log("userQuizzesCount", userQuizzesCount)
  },[userQuizzesCount])

  useEffect(() => {
    console.log("commitMessages", commitMessages)
  },[commitMessages])

  useEffect(() => {
    console.log("repositoryFiles", repositoryFiles)
  },[repositoryFiles])

  useEffect(() => {
    console.log("worktreeFiles", worktreeFiles)
  },[worktreeFiles])

  useEffect(() => {
    console.log("indexFiles", indexFiles)
  },[indexFiles])

  useEffect(() => {
    console.log("branches", branches)
  },[branches])

  useEffect(() => {
    console.log("currentBranch", currentBranch)
  },[currentBranch])

  useEffect(() => {
    console.log("fileHistoryForCansellCommit", fileHistoryForCansellCommits)
  },[fileHistoryForCansellCommits])

  useEffect(() => {
    console.log("remoteBranches", remoteBranches)
  },[remoteBranches])

  useEffect(() => {
    console.log("remoteCommitMessages", remoteCommitMessages)
  },[remoteCommitMessages])

  useEffect(() => {
    console.log("remoteRepositoryFiles", remoteRepositoryFiles)
  },[remoteRepositoryFiles])

  useEffect(() => {
    console.log("answerBranches", answerBranches)
  },[answerBranches])

  useEffect(() => {
    console.log("answerRemoteBranches", answerRemoteBranches)
  },[answerRemoteBranches])

  useEffect(() => {
    console.log("answerWorktreeFiles", answerWorktreeFiles)
  },[answerWorktreeFiles])

  useEffect(() => {
    console.log("answerIndexFiles", answerIndexFiles)
  },[answerIndexFiles])

  useEffect(() => {
    console.log("answerRepositoryFiles", answerRepositoryFiles)
  },[answerRepositoryFiles])

  useEffect(() => {
    console.log("answerRemoteRepositoryFiles", answerRemoteRepositoryFiles)
  },[answerRemoteRepositoryFiles])

  useEffect(() => {
    console.log("remoteadd", remoteAdd)
  },[remoteAdd])

  const areaList = [
    {
      class: classes.area,
      area: <QuizWorktreeFiles />
    },
    {
      class: classes.area,
      area: <QuizIndexArea />
    },
    {
      class: classes.area,
      area: <QuizCommitMessageArea />
    },
    {
      class: classes.area,
      area: <QuizLocalRepositoryArea />
    },
    {
      class: classes.area,
      area: <QuizRemoteCoimmitMessageArea />
    },
    {
      class: classes.area,
      area: <QuizRemoteRepositoryArea />
    },
    {
      class: classes.area,
      area: <Terminal />
    },
    {
      class: classes.borderForm,
      area: location.pathname === (`/quiz/answer/${id}`) ? <AboutAnswerQuiz /> : <AboutQuiz />,
      area2: currentUser?.email === "guest_user@git-used-to.com" ? <ReccomendSignUpModal /> : <CreateOrUpdateQuizButton />
    }
  ]

  return(
    <QuizContext.Provider
      value={{
        userTitle, setUserTitle,
        userQuizzesCount, setUserQuizzesCount,
        quizTitle, setQuizTitle,
        quizIntroduction, setQuizIntroduction,
        quizFirstOrLastId, setQuizFirstOrLastId,
        text, setText,
        addText, setAddText,
        gitInit,setGitInit,
        remoteAdd, setRemoteAdd,
        currentBranch, setCurrentBranch,
        branches, setBranches,
        remoteBranches, setRemoteBranches,
        worktreeFiles, setWorktreeFiles,
        indexFiles, setIndexFiles,
        repositoryFiles, setRepositoryFiles,
        remoteRepositoryFiles, setRemoteRepositoryFiles,
        fileHistoryForCansellCommits, setFileHistoryForCansellCommits,
        commitMessages, setCommitMessages,
        remoteCommitMessages, setRemoteCommitMessages,
        initialRemoteCommitMessages, setInitialRemoteCommitMessages,
        initialBranches,setInitialBranches,
        initialRemoteBranches,setInitialRemoteBranches,
        initialWorktreeFiles, setInitialWorktreeFiles,
        initialIndexFiles,setInitialIndexFiles,
        initialRepositoryFiles,setInitialRepositoryFiles,
        initialRemoteRepositoryFiles,setInitialRemoteRepositoryFiles,
        initialFileHistoryForCansellCommits,setInitialFileHistoryForCansellCommits,
        initialCommitMessages,setInitialCommitMessages,
        answerBranches, setAnswerBranches,
        answerRemoteBranches, setAnswerRemoteBranches,
        answerWorktreeFiles, setAnswerWorktreeFiles,
        answerIndexFiles, setAnswerIndexFiles,
        answerRepositoryFiles, setAnswerRepositoryFiles,
        answerRemoteRepositoryFiles, setAnswerRemoteRepositoryFiles,
        commands, setCommands
        }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        >
        <motion.div
          className={classes.branch}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <QuizBranchArea />
        </motion.div>
      </motion.div>
      <div className={classes.position}>
        {areaList.map((area, index) =>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              delay: index/10 + 0.3,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <motion.div
              className={area.class}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {area.area}
              {area.area2 && area.area2}
            </motion.div>
          </motion.div>
        )}
      </div>
    </QuizContext.Provider>
  )
}

export default CreateQuiz
