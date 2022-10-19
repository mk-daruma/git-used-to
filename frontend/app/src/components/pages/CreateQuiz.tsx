import React, { useContext, useState, createContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button"

import AboutQuiz from "./AboutQuiz";
import { AuthContext } from "App";
import { AboutQuizData, QuizFirtsOrLastData } from "interfaces";
import { createQuiz, getQuiz } from "lib/api/quizzes";
import Terminal from "./Terminal";
import QuizBranchArea from "./QuizBranchArea";
import { createQuizFirstOrLast, getQuizFirstOrLast } from "lib/api/quiz_first_or_lasts";
import { createQuizBranch, getQuizBranch } from "lib/api/quiz_branches";
import { createQuizWorktreeFile } from "lib/api/quiz_worktree_files";
import { createQuizCommitMessage, getQuizCommitMessage } from "lib/api/quiz_commit_messages";
import { createQuizRepositoryFile } from "lib/api/quiz_repository_files";
import { createQuizIndexFile } from "lib/api/quiz_index_files";
import { CreateQuizHistoryOfCommittedFile } from "lib/api/quiz_history_of_committed_files";
import { createQuizRemoteBranch, getQuizRemoteBranch } from "lib/api/quiz_remote_branches";
import { createQuizRemoteCommitMessage, getQuizRemoteCommitMessage } from "lib/api/quiz_remote_commit_messages";
import { createQuizRemoteRepositoryFile } from "lib/api/quiz_remote_repository_file";

export const QuizContext = createContext({} as {
  quizTitle: string
  setQuizTitle: React.Dispatch<React.SetStateAction<string>>
  quizIntroduction: string
  setQuizIntroduction: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  addText: string
  setAddText :React.Dispatch<React.SetStateAction<string>>

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

  commands: {
    text: string
    addText: string
  }[]

  setCommands: React.Dispatch<React.SetStateAction<{
    text: string
    addText: string
  }[]>>
  })

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  }
}))

const CreateQuiz: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const history = useHistory()
  const classes = useStyles()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()

  const [quizTitle, setQuizTitle] = useState<string>("")
  const [quizIntroduction, setQuizIntroduction] = useState<string>("")
  const [text, setText] = useState("");
  const [addText, setAddText] = useState("");
  const [currentBranch, setCurrentBranch] = useState({
    currentBranchName: "master",
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
    branchName: "master",
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
    branchName: "master",
    branchId: ""
    }])
  const [initialRemoteBranches, setInitialRemoteBranches] = useState([{
    remoteBranchName: "",
    remoteBranchId: ""
    }])
  const [commands, setCommands] = useState([{
    text:"play with git-used-to!!",
    addText:""
  }]);

  const quizType = "user"

  const aboutQuizData: AboutQuizData = {
    quizTitle: quizTitle,
    quizIntroduction: quizIntroduction,
    quizType: quizType,
    userId: currentUser?.id
  }

  const handleCreateQuizSubmit = (argBranches :any, argsWorktreeFiles :any, argIndexFiles :any, argCommitMessages :any, argFileHistoryForCansellCommits :any, argRepositoryFiles :any, argRemoteBranches :any, argRemoteCommitMessages :any, argRemoteRepositoryFiles :any) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const quizFirtsOrLastStatus = "last"

    try {
      const aboutQuizRes = await createQuiz(aboutQuizData)

      const quizFirtsOrLastData: QuizFirtsOrLastData = {
        quizFirstOrLastStatus: quizFirtsOrLastStatus,
        quizId: aboutQuizRes.data.data.id
      }
      const quizFirtsOrLastRes = await createQuizFirstOrLast(quizFirtsOrLastData)

      const quizBranchData = argBranches.map((branch :any) => ({
        quizBranchName: branch.branchName,
        quizFirstOrLastId: quizFirtsOrLastRes.data.data.id
      }
      ))

      const quizBranchRes = await createQuizBranch(quizBranchData)

      const quizWorktreeFileData = quizBranchRes !== undefined
      ? quizBranchRes.data.data.map((branch :any) =>(
          argsWorktreeFiles
          .filter((worktreeFile :any) => worktreeFile.parentBranch === branch.quizBranchName)
          .map((filteredWorktreeFile :any) =>({
            quizWorktreeFileName: filteredWorktreeFile.fileName,
            quizWorktreeFileTextStatus: filteredWorktreeFile.textStatus,
            quizBranchId: branch.id
          }))
        ))
      : []

      const quizWorktreeFileRes = await createQuizWorktreeFile(quizWorktreeFileData.flat())

      const quizIndexFileData = quizBranchRes !== undefined
      ? quizBranchRes.data.data.map((branch :any) =>(
          argIndexFiles
          .filter((indexFile :any) => indexFile.parentBranch === branch.quizBranchName)
          .map((filteredIndexFile :any) =>({
            quizIndexFileName: filteredIndexFile.fileName,
            quizIndexFileTextStatus: filteredIndexFile.textStatus,
            quizBranchId: branch.id
          }))
        ))
      : []

      const quizIndexFileRes = await createQuizIndexFile(quizIndexFileData.flat())

      const QuizCommitMessageData = quizBranchRes !== undefined
      ? quizBranchRes.data.data.map((branch :any) =>(
          argCommitMessages
          .filter((commitMessage :any) => commitMessage.parentBranch === branch.quizBranchName)
          .map((commitMessage :any) =>({
            quizCommitMessage: commitMessage.message,
            quizBranchId: branch.id
          }))
        ))
      : []

      const QuizCommitMessageRes = await createQuizCommitMessage(QuizCommitMessageData.flat())

      const quizHistoryOfCommittedFileData = QuizCommitMessageRes !== undefined
      ? QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
        argFileHistoryForCansellCommits
        .filter((historyFile :any) =>
          historyFile.parentCommitMessage === commitMessage.quizCommitMessage
          && historyFile.fileName !== "")
        .map((filteredHistoryFile :any) =>({
          quizHistoryOfCommittedFileName: filteredHistoryFile.fileName,
          quizHistoryOfCommittedFileTextStatus: filteredHistoryFile.textStatus,
          quizHistoryOfCommittedFilePastTextStatus: filteredHistoryFile.pastTextStatus,
          quizHistoryOfCommittedFileParentPastCommitMessage: filteredHistoryFile.parentPastCommitMessage,
          quizCommitMessageId: commitMessage.id,
          quizBranchId: commitMessage.quizBranchId,
        }))
      ))
      : []

      const flatedQuizHistoryOfCommittedFileData = quizHistoryOfCommittedFileData.flat()

      const removeDuplicateQuizHistoryOfCommittedFileData = flatedQuizHistoryOfCommittedFileData.filter((e :any, index :any, self :any) => {
        return self.findIndex((el :any) =>
          el.quizHistoryOfCommittedFileName === e.quizHistoryOfCommittedFileName
          && el.quizHistoryOfCommittedFileTextStatus === e.quizHistoryOfCommittedFileTextStatus
          && el.quizHistoryOfCommittedFilePastTextStatus === e.quizHistoryOfCommittedFilePastTextStatus
          && el.quizHistoryOfCommittedFileParentPastCommitMessage === e.quizHistoryOfCommittedFileParentPastCommitMessage
          && el.quizCommitMessageId === e.quizCommitMessageId
          && el.quizBranchId === e.quizBranchId
        ) === index;
      });

      const quizHistoryOfCommittedFileRes = await CreateQuizHistoryOfCommittedFile(removeDuplicateQuizHistoryOfCommittedFileData)

      const quizRepositoryFileData = QuizCommitMessageRes !== undefined
      ? QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
        argRepositoryFiles
        .filter((repositoryFile :any) =>
          repositoryFile.parentCommitMessage === commitMessage.quizCommitMessage
          && repositoryFile.fileName !== "")
        .map((filteredRepositoryFile :any) =>({
          quizRepositoryFileName: filteredRepositoryFile.fileName,
          quizRepositoryFileTextStatus: filteredRepositoryFile.textStatus,
          quizCommitMessageId: commitMessage.id,
          quizBranchId: commitMessage.quizBranchId
        }))
      ))
      : []

      const flatedQuizRepositoryFileData = quizRepositoryFileData.flat()

      const removeDuplicateQuizRepositoryFileData = flatedQuizRepositoryFileData.filter((e :any, index :any, self :any) => {
        return self.findIndex((el :any) =>
          el.quizRepositoryFileName === e.quizRepositoryFileName
          && el.quizRepositoryFileTextStatus === e.quizRepositoryFileTextStatus
          && el.quizCommitMessageId === e.quizCommitMessageId
          && el.quizBranchId === e.quizBranchId
        ) === index;
      });

      const quizRepositoryFileRes = await createQuizRepositoryFile(removeDuplicateQuizRepositoryFileData)

      const quizRemoteBranchData =
        argRemoteBranches
        .filter((branch :any) => branch.remoteBranchName)
        .map((branch :any) => ({
          quizRemoteBranchName: branch.remoteBranchName,
          quizFirstOrLastId: quizFirtsOrLastRes.data.data.id
        }
      ))

      const quizRemoteBranchRes = await createQuizRemoteBranch(quizRemoteBranchData)

      const QuizRemoteCommitMessageData = quizRemoteBranchRes !== undefined
      ? quizRemoteBranchRes.data.data.map((branch :any) =>(
          argRemoteCommitMessages
          .filter((commitMessage :any) => commitMessage.parentRemoteBranch === branch.quizRemoteBranchName)
          .map((commitMessage :any) =>({
            quizRemoteCommitMessage: commitMessage.remoteMessage,
            quizRemoteBranchId: branch.id
          }))
        ))
      : []

      const QuizRemoteCommitMessageRes = await createQuizRemoteCommitMessage(QuizRemoteCommitMessageData.flat())

      const quizRemoteRepositoryFileData = QuizRemoteCommitMessageRes !== undefined
      ? QuizRemoteCommitMessageRes.data.data.map((commitMessage :any) =>(
        argRemoteRepositoryFiles
        .filter((repositoryFile :any) =>
          repositoryFile.parentRemoteCommitMessage === commitMessage.quizRemoteCommitMessage
          && repositoryFile.fileName !== "")
        .map((filteredRepositoryFile :any) =>({
          quizRemoteRepositoryFileName: filteredRepositoryFile.fileName,
          quizRemoteRepositoryFileTextStatus: filteredRepositoryFile.textStatus,
          quizRemoteCommitMessageId: commitMessage.id,
          quizRemoteBranchId: commitMessage.quizRemoteBranchId
        }))
      ))
      : []

      const flatedQuizRemoteRepositoryFileData = quizRemoteRepositoryFileData.flat()

      const removeDuplicateQuizRemoteRepositoryFileData = flatedQuizRemoteRepositoryFileData.filter((e :any, index :any, self :any) => {
        return self.findIndex((el :any) =>
          el.quizRemoteRepositoryFileName === e.quizRemoteRepositoryFileName
          && el.quizRemoteRepositoryFileTextStatus === e.quizRemoteRepositoryFileTextStatus
          && el.quizRemoteCommitMessageId === e.quizRemoteCommitMessageId
          && el.quizRemoteBranchId === e.quizRemoteBranchId
        ) === index;
      });

      const quizRemoteRepositoryFileRes = await createQuizRemoteRepositoryFile(removeDuplicateQuizRemoteRepositoryFileData)

      console.log(aboutQuizRes)
      console.log(quizFirtsOrLastRes)
      console.log(quizBranchRes)
      console.log(quizWorktreeFileRes)
      console.log(quizIndexFileRes)
      console.log(QuizCommitMessageRes)
      console.log(quizHistoryOfCommittedFileRes)
      console.log(quizRepositoryFileRes)
      console.log(quizRemoteBranchRes)
      console.log(QuizRemoteCommitMessageRes)
      console.log(quizRemoteRepositoryFileRes)
      console.log("create quiz success!!")

      history.push("/")

    } catch (err) {
      console.log(err)
    }
  }

  const addBranches = (useState :any, branchName :any, branchId :any) => {
    useState((branches :any) => [...branches,{
      branchName: branchName,
      branchId: branchId
    }])
  }

  const addWorktreeFiles = (useState :any, fileName :any, parentBranch :any, textStatus :any, parentBranchId :any,worktreeFileId :any) => {
    useState((worktreeFile :any) => [...worktreeFile,{
      fileName: fileName,
      parentBranch: parentBranch,
      textStatus: textStatus,
      parentBranchId: parentBranchId,
      worktreeFileId: worktreeFileId
    }])
  }

  const addIndexFile = (useState :any, fileName :any, parentBranch :any, textStatus :any, parentBranchId :any, worktreeFileId :any) => {
    useState((indexFile :any) => [...indexFile,{
      fileName: fileName,
      parentBranch: parentBranch,
      textStatus: textStatus,
      parentBranchId: parentBranchId,
      indexFileId: worktreeFileId
    }])
  }

  const addCommitMessages = (useState :any, message :any, parentBranch :any, parentBranchId :any, commitMessageId :any) => {
    useState((commitMessage :any) => [...commitMessage,{
      message: message,
      parentBranch: parentBranch,
      parentBranchId: parentBranchId,
      commitMessageId: commitMessageId
    }])
  }

  const addRepositoryFiles = (useState :any, fileName :any, textStatus :any, parentBranch :any, parentCommitMessage :any, parentBranchId :any, parentCommitMessageId :any, repositoryFileId: any) => {
    useState((repositoryFile :any) => [...repositoryFile,{
      fileName: fileName,
      textStatus: textStatus,
      parentBranch: parentBranch,
      parentCommitMessage: parentCommitMessage,
      parentBranchId: parentBranchId,
      parentCommitMessageId: parentCommitMessageId,
      repositoryFileId: repositoryFileId
    }])
  }

  const addFileHistoryForCansellCommits = (useState :any, fileName :any, textStatus :any, pastTextStatus :any, parentBranch :any, parentCommitMessage :any, parentPastCommitMessage :any, parentBranchId :any, parentCommitMessageId :any, historyFileId: any) => {
    useState((historyFiles :any) => [...historyFiles,{
      fileName: fileName,
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

  const addRemoteBranches = (useState :any, remoteBranchName :any, remoteBranchId :any) => {
    useState((branches :any) => [...branches,{
      remoteBranchName: remoteBranchName,
      remoteBranchId: remoteBranchId
    }])
  }

  const addRemoteCommitMessages = (useState :any, remoteMessage :any, parentRemoteBranch :any, parentRemoteBranchId :any, remoteCommitMessageId :any) => {
    useState((commitMessage :any) => [...commitMessage,{
      remoteMessage: remoteMessage,
      parentRemoteBranch: parentRemoteBranch,
      parentRemoteBranchId: parentRemoteBranchId,
      remoteCommitMessageId: remoteCommitMessageId
    }])
  }

  const addRemoteRepositoryFiles = (useState :any, fileName :any, textStatus :any, parentRemoteBranch :any, parentRemoteCommitMessage :any, parentRemoteBranchId :any, parentRemoteCommitMessageId :any, remoteRepositoryFileId: any) => {
    useState((repositoryFile :any) => [...repositoryFile,{
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

  const handleGetQuizData = async () => {
    try {
      const ResQuiz = await getQuiz(Number(id))

      setQuizTitle(ResQuiz.data.quizData.quizTitle)
      setQuizIntroduction(ResQuiz.data.quizData.quizIntroduction)

      const ResQuizOfLast = await getQuizFirstOrLast(ResQuiz.data.quizFirstOrLastsData[0].id)

      await Promise.all(
        await ResQuizOfLast.data.dataBranches.map(async (branch :any) => {
          getBranches.forEach(getBranch =>
            addBranches(
              getBranch,
              branch.quizBranchName,
              branch.id
            )
          )
          const ResQuizBranches = await getQuizBranch(branch.id)
          ResQuizBranches.data.dataWorktreeFiles.map((worktree :any) => {
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
          ResQuizBranches.data.dataIndexFiles.map((indexFile :any) => {
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
          ResQuizBranches.data.dataMessages.map(async (message :any) => {
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
              ResQuizCommitMessages.data.dataRepositoryFiles.map((data :any) => {
                getRepositoryFiles.forEach(getRepositoryFile =>
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
              ResQuizCommitMessages.data.dataHistoryOfCommittedFiles.map((historyFile :any) => {
                getFileHistoryForCansellCommits.forEach(getFileHistoryForCansellCommit =>
                  addFileHistoryForCansellCommits(
                    getFileHistoryForCansellCommit,
                    historyFile.quizHistoryOfCommittedFileName,
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
      await ResQuizOfLast.data.dataRemoteBranches.map(async (remoteBranch :any) => {
        getRemoteBranches.forEach(getRemoteBranch =>
          addRemoteBranches(
            getRemoteBranch,
            remoteBranch.quizRemoteBranchName,
            remoteBranch.id
          )
        )
        const ResQuizRemoteBranches = await getQuizRemoteBranch(remoteBranch.id)
        ResQuizRemoteBranches.data.dataRemoteMessages.map(async (message :any) => {
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
            ResQuizRemoteCommitMessages.data.dataRemoteRepositoryFiles.map((data :any) => {
              getRemoteRepositoryFiles.forEach(getRemoteRepositoryFile =>
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
    } catch (err) {
      console.log(err)
    }
  }

  const handleUpdateQuizData = async () => {
    try {
      //棲み分け用
      const createWorktreeFiles = worktreeFiles.filter(worktreeFile => !worktreeFile.worktreeFileId)
      const createIndexFiles = indexFiles.filter(indexFile => !indexFile.indexFileId)
      const createRepositoryFile = repositoryFiles.filter(repositoryFile => !repositoryFile.repositoryFileId)
      const createBranches = branches.filter(branch => !branch.branchId)
      const createFileHistoryForCansellCommit = fileHistoryForCansellCommits.filter(historyFile => !historyFile.historyFileId)
      const createRemoteBranches = remoteBranches.filter(remoteBranch => !remoteBranch.remoteBranchId)
      const createRemoteCommitMessages = remoteCommitMessages.filter(remoteCommitMessage => !remoteCommitMessage.remoteCommitMessageId)
      const createRemoteRepositoryFiles = remoteRepositoryFiles.filter(remoteRepositoryFile => !remoteRepositoryFile.remoteRepositoryFileId)

      const updateWorktreeFiles =
        worktreeFiles.filter(worktreeFile => initialWorktreeFiles.some(initWorkfile =>
          initWorkfile.fileName === worktreeFile.fileName
          && initWorkfile.parentBranch === worktreeFile.parentBranch
          && initWorkfile.textStatus !== worktreeFile.textStatus
          && initWorkfile.worktreeFileId === worktreeFile.worktreeFileId
        ))

      const deleteWorktreeFiles =
        initialWorktreeFiles.filter(initWorkfile => !worktreeFiles.some(worktreeFile =>
          initWorkfile.worktreeFileId === worktreeFile.worktreeFileId
        ))

        const deleteCommitMessages =
        initialCommitMessages.filter(initCommit => !commitMessages.some(commitMessage =>
          initCommit.commitMessageId === commitMessage.commitMessageId
        ))

      const updateIndexFiles =
        indexFiles.filter(indexFile => initialIndexFiles.some(initialIndexFile =>
          indexFile.fileName === initialIndexFile.fileName
          && indexFile.parentBranch === initialIndexFile.parentBranch
          && indexFile.textStatus !== initialIndexFile.textStatus
          && indexFile.indexFileId === initialIndexFile.indexFileId
        ))

      console.log("作成",createWorktreeFiles)
      console.log("更新",updateWorktreeFiles)
      console.log("削除",deleteWorktreeFiles)

      //作成用の関数

      //更新用の関数
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    location.pathname === (`/quiz/edit/${id}`) && handleGetQuizData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("commitMessages", commitMessages)
    console.log("repositoryFiles", repositoryFiles)
    console.log("worktreeFiles", worktreeFiles)
    console.log("indexFiles", indexFiles)
    console.log("branches", branches)
    console.log("currentBranch", currentBranch)
    console.log("fileHistoryForCansellCommit", fileHistoryForCansellCommits)
    console.log("remoteBranches", remoteBranches)
    console.log("remoteCommitMessages", remoteCommitMessages)
    console.log("remoteRepositoryFiles", remoteRepositoryFiles)
  },[commitMessages, indexFiles, repositoryFiles, worktreeFiles, branches, currentBranch, fileHistoryForCansellCommits, remoteBranches, remoteCommitMessages, remoteRepositoryFiles])

  return(
    <QuizContext.Provider
      value={{
        quizTitle, setQuizTitle,
        quizIntroduction, setQuizIntroduction,
        text, setText,
        addText, setAddText,
        currentBranch, setCurrentBranch,
        branches, setBranches,
        initialBranches,setInitialBranches,
        remoteBranches, setRemoteBranches,
        initialRemoteBranches,setInitialRemoteBranches,
        worktreeFiles, setWorktreeFiles,
        initialWorktreeFiles, setInitialWorktreeFiles,
        indexFiles, setIndexFiles,
        initialIndexFiles,setInitialIndexFiles,
        repositoryFiles, setRepositoryFiles,
        initialRepositoryFiles,setInitialRepositoryFiles,
        remoteRepositoryFiles, setRemoteRepositoryFiles,
        initialRemoteRepositoryFiles,setInitialRemoteRepositoryFiles,
        fileHistoryForCansellCommits, setFileHistoryForCansellCommits,
        initialFileHistoryForCansellCommits,setInitialFileHistoryForCansellCommits,
        commitMessages, setCommitMessages,
        initialCommitMessages,setInitialCommitMessages,
        remoteCommitMessages, setRemoteCommitMessages,
        initialRemoteCommitMessages, setInitialRemoteCommitMessages,
        commands, setCommands
        }}>
      <QuizBranchArea />
    {/* <layout 5つのコンポーネントを横並びにする> */}
      {/* <QuizWorktreeIndexArea />
      <QuizCommitMessageArea />
      <QuizRepositoryArea /> */}
    {/* </layout> */}

    {/* <layout 2つのコンポーネントを横並びにする> */}
      <AboutQuiz />
      <Terminal />
    {/* </layout> */}
      {location.pathname === "/quiz" &&
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={!quizTitle || !quizIntroduction || !quizType ? true : false}
          className={classes.submitBtn}
          onClick={
            handleCreateQuizSubmit(
              branches,
              worktreeFiles,
              indexFiles,
              commitMessages,
              fileHistoryForCansellCommits,
              repositoryFiles,
              remoteBranches,
              remoteCommitMessages,
              remoteRepositoryFiles
              )
            }
        >
          Submit
        </Button>
      }
      {location.pathname === (`/quiz/edit/${id}`) &&
      <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={!quizTitle || !quizIntroduction || !quizType ? true : false}
          className={classes.submitBtn}
          onClick={handleUpdateQuizData}
        >
          Submit
        </Button>
        }
        <>
        {/* ↓配列の中身確認用 */}
        <p>[branch]</p>
        { branches.filter((branch) => currentBranch.currentBranchName === branch.branchName)
          .map((branch) => (
          <p>
            { branch.branchName }
          </p>
          ))}
          <p>[work]</p>
        { worktreeFiles.filter((worktreeFile) => currentBranch.currentBranchName === worktreeFile.parentBranch)
        .map((worktreeFile) => (
          <p>
            { worktreeFile.fileName } text: { worktreeFile.textStatus }
          </p>
          ))}
          <p>[index]</p>
        { indexFiles.filter((indexFile) => currentBranch.currentBranchName === indexFile.parentBranch)
        .map((indexFile) => (
          <p>
            { indexFile.fileName } text: { indexFile.textStatus }
          </p>
          ))}
          <p>[repo]</p>
        { repositoryFiles.filter((repositoryFile) => currentBranch.currentBranchName === repositoryFile.parentBranch)
        .map((repositoryFile) => (
          <p>
            { repositoryFile.fileName } text: { repositoryFile.textStatus }
          </p>
          ))}
          <p>[commit]</p>
        { commitMessages.filter((commitMessage) => currentBranch.currentBranchName === commitMessage.parentBranch)
        .map((commitMessage) => (
          <p>
            { commitMessage.message }
          </p>
          ))}
          <p>[remoteRepo]</p>
        { remoteRepositoryFiles.filter((repositoryFile) => currentBranch.currentBranchName === repositoryFile.parentRemoteBranch)
        .map((repositoryFile) => (
          <p>
            { repositoryFile.fileName } text: { repositoryFile.textStatus }
          </p>
          ))}
      </>
    </QuizContext.Provider>
  )
}

export default CreateQuiz
