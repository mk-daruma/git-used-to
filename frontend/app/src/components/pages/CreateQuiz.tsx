import React, { useContext, useState, createContext, useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core";

import AboutQuiz from "./AboutQuiz";
import { AuthContext } from "App";

import { getQuiz } from "lib/api/quizzes";
import Terminal from "./Terminal";
import QuizBranchArea from "./QuizBranchArea";
import { getQuizFirstOrLast } from "lib/api/quiz_first_or_lasts";
import { getQuizBranch } from "lib/api/quiz_branches";

import { getQuizCommitMessage } from "lib/api/quiz_commit_messages";
import { getQuizRemoteBranch } from "lib/api/quiz_remote_branches";
import { getQuizRemoteCommitMessage } from "lib/api/quiz_remote_commit_messages";
import CreateOrUpdateQuizButton from "./CreateQuizButton";

export const QuizContext = createContext({} as {
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
  const { id } = useParams<{ id: string }>()

  const [quizTitle, setQuizTitle] = useState<string>("")
  const [quizIntroduction, setQuizIntroduction] = useState<string>("")
  const [quizFirstOrLastId, setQuizFirstOrLastId] = useState<string>("")
  const [text, setText] = useState("");
  const [addText, setAddText] = useState("");
  const [gitInit, setGitInit] = useState<string>("not a git repository")
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

  const addBranches = (array :any, branchName :any, branchId :any) => {
    array((branches :any) => [...branches,{
      branchName: branchName,
      branchId: branchId
    }])
  }
  const addWorktreeFiles = (array :any, fileName :any, parentBranch :any, textStatus :any, parentBranchId :any,worktreeFileId :any) => {
    array((worktreeFile :any) => [...worktreeFile,{
      fileName: fileName,
      parentBranch: parentBranch,
      textStatus: textStatus,
      parentBranchId: parentBranchId,
      worktreeFileId: worktreeFileId
    }])
  }
  const addIndexFile = (array :any, fileName :any, parentBranch :any, textStatus :any, parentBranchId :any, worktreeFileId :any) => {
    array((indexFile :any) => [...indexFile,{
      fileName: fileName,
      parentBranch: parentBranch,
      textStatus: textStatus,
      parentBranchId: parentBranchId,
      indexFileId: worktreeFileId
    }])
  }
  const addCommitMessages = (array :any, message :any, parentBranch :any, parentBranchId :any, commitMessageId :any) => {
    array((commitMessage :any) => [...commitMessage,{
      message: message,
      parentBranch: parentBranch,
      parentBranchId: parentBranchId,
      commitMessageId: commitMessageId
    }])
  }
  const addRepositoryFiles = (array :any, fileName :any, textStatus :any, parentBranch :any, parentCommitMessage :any, parentBranchId :any, parentCommitMessageId :any, repositoryFileId: any) => {
    array((repositoryFile :any) => [...repositoryFile,{
      fileName: fileName,
      textStatus: textStatus,
      parentBranch: parentBranch,
      parentCommitMessage: parentCommitMessage,
      parentBranchId: parentBranchId,
      parentCommitMessageId: parentCommitMessageId,
      repositoryFileId: repositoryFileId
    }])
  }
  const addFileHistoryForCansellCommits = (array :any, fileName :any, fileStatus :any, textStatus :any, pastTextStatus :any, parentBranch :any, parentCommitMessage :any, parentPastCommitMessage :any, parentBranchId :any, parentCommitMessageId :any, historyFileId: any) => {
    array((historyFiles :any) => [...historyFiles,{
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
  const addRemoteBranches = (array :any, remoteBranchName :any, remoteBranchId :any) => {
    array((branches :any) => [...branches,{
      remoteBranchName: remoteBranchName,
      remoteBranchId: remoteBranchId
    }])
  }
  const addRemoteCommitMessages = (array :any, remoteMessage :any, parentRemoteBranch :any, parentRemoteBranchId :any, remoteCommitMessageId :any) => {
    array((commitMessage :any) => [...commitMessage,{
      remoteMessage: remoteMessage,
      parentRemoteBranch: parentRemoteBranch,
      parentRemoteBranchId: parentRemoteBranchId,
      remoteCommitMessageId: remoteCommitMessageId
    }])
  }
  const addRemoteRepositoryFiles = (array :any, fileName :any, textStatus :any, parentRemoteBranch :any, parentRemoteCommitMessage :any, parentRemoteBranchId :any, parentRemoteCommitMessageId :any, remoteRepositoryFileId: any) => {
    array((repositoryFile :any) => [...repositoryFile,{
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
      setGitInit("Initialized empty Git repository")

      const ResQuiz = await getQuiz(Number(id))

      setQuizTitle(ResQuiz.data.quizData.quizTitle)
      setQuizIntroduction(ResQuiz.data.quizData.quizIntroduction)

      const ResQuizOfLast = await getQuizFirstOrLast(ResQuiz.data.quizFirstOrLastsData[0].id)
      setQuizFirstOrLastId(ResQuiz.data.quizFirstOrLastsData[0].id)

      setCurrentBranch({
        currentBranchName: ResQuizOfLast.data.dataBranches[0].quizBranchName,
        currentBranchId: ResQuizOfLast.data.dataBranches[0].id
      })

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
          ResQuizBranches.data.dataWorktreeFiles.forEach((worktree :any) => {
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
          ResQuizBranches.data.dataIndexFiles.forEach((indexFile :any) => {
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
          ResQuizBranches.data.dataMessages.forEach(async (message :any) => {
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
              ResQuizCommitMessages.data.dataHistoryOfCommittedFiles.map((historyFile :any) => {
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

  return(
    <QuizContext.Provider
      value={{
        quizTitle, setQuizTitle,
        quizIntroduction, setQuizIntroduction,
        quizFirstOrLastId, setQuizFirstOrLastId,
        text, setText,
        addText, setAddText,
        gitInit,setGitInit,
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
      <CreateOrUpdateQuizButton />
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
