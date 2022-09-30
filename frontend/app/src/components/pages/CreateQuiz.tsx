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

export const QuizContext = createContext({} as {
  quizTitle: string
  setQuizTitle: React.Dispatch<React.SetStateAction<string>>
  quizIntroduction: string
  setQuizIntroduction: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>
  currentBranch: string
  setCurrentBranch :React.Dispatch<React.SetStateAction<string>>
  addText: string
  setAddText :React.Dispatch<React.SetStateAction<string>>

  worktreeFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
    worktreeFileId: string
  }[]

  setWorktreeFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
    worktreeFileId: string
  }[]>>

  indexFiles: {
    fileName: string
    parentBranch: string
    textStatus: string
    indexFileId: string
  }[]

  setIndexFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    textStatus: string
    indexFileId: string
  }[]>>

  repositoryFiles: {
    fileName: string
    repositoryStatus: string
    textStatus: string
    parentCommitMessage: string
    repositoryFileId: string
  }[]

  setRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    repositoryStatus: string
    textStatus: string
    parentCommitMessage: string
    repositoryFileId: string
  }[]>>

  commitMessages: {
    message: string
    parentBranch: string
    commitMessageId: string
  }[]

  setCommitMessages: React.Dispatch<React.SetStateAction<{
    message: string
    parentBranch: string
    commitMessageId: string
  }[]>>

  branches: {
    branchName: string
    branchId: string
  }[]

  setBranches: React.Dispatch<React.SetStateAction<{
    branchName: string
    branchId: string
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
  const [currentBranch, setCurrentBranch] = useState("master");
  const [worktreeFiles, setWorktreeFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: "",
    worktreeFileId: ""
  }])
  const [indexFiles, setIndexFiles] = useState([{
    fileName: "",
    parentBranch: "",
    textStatus: "",
    indexFileId: ""
  }])
  const [repositoryFiles, setRepositoryFiles] = useState([{
    fileName: "",
    repositoryStatus: "",
    textStatus: "",
    parentCommitMessage: "",
    repositoryFileId: ""
  }])
  const [commitMessages, setCommitMessages] = useState([{
    message: "",
    parentBranch: "",
    commitMessageId: ""
  }])
  const [branches, setBranches] = useState([{
    branchName: "master",
    branchId: ""
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

  const handleCreateQuizSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const quizFirtsOrLastStatus = "last"

    try {
      const aboutQuizRes = await createQuiz(aboutQuizData)

      const quizFirtsOrLastData: QuizFirtsOrLastData = {
        quizFirstOrLastStatus: quizFirtsOrLastStatus,
        quizId: aboutQuizRes.data.data.id
      }
      const quizFirtsOrLastRes = await createQuizFirstOrLast(quizFirtsOrLastData)

      const quizBranchData = branches.map((branch) => ({
        quizBranchName: branch.branchName,
        quizFirstOrLastId: quizFirtsOrLastRes.data.data.id
      }
      ))

      const quizBranchRes = await createQuizBranch(quizBranchData)

      const quizWorktreeFileData = quizBranchRes.data.data.map((branch :any) =>(
        worktreeFiles
        .filter(worktreeFile => worktreeFile.parentBranch === branch.quizBranchName)
        .map((filteredWorktreeFile :any) =>({
          quizWorktreeFileName: filteredWorktreeFile.fileName,
          quizWorktreeFileTextStatus: filteredWorktreeFile.textStatus,
          quizBranchId: branch.id
        }))
      ))

      const quizWorktreeFileRes = await createQuizWorktreeFile(quizWorktreeFileData.flat())

      const QuizCommitMessageData = quizBranchRes.data.data.map((branch :any) =>(
        commitMessages
        .filter(commitMessage => commitMessage.parentBranch === branch.quizBranchName)
        .map((commitMessage :any) =>({
          quizCommitMessage: commitMessage.message,
          quizBranchId: branch.id
        }))
      ))

      const QuizCommitMessageRes = await createQuizCommitMessage(QuizCommitMessageData.flat())

      const quizRepositoryFileData = QuizCommitMessageRes !== undefined
      ? QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
        repositoryFiles
        .filter(repositoryFile => repositoryFile.parentCommitMessage === commitMessage.quizCommitMessage)
        .map((filteredRepositoryFile :any) =>({
          quizRepositoryFileName: filteredRepositoryFile.fileName,
          quizRepositoryFileStatus: filteredRepositoryFile.repositoryStatus,
          quizRepositoryFileTextStatus: filteredRepositoryFile.textStatus,
          quizCommitMessageId: commitMessage.id
        }))
      ))
      : []

      const quizRepositoryFileRes = await createQuizRepositoryFile(quizRepositoryFileData.flat())

      console.log(aboutQuizRes)
      console.log(quizFirtsOrLastRes)
      console.log(quizBranchRes)
      console.log(quizWorktreeFileRes)
      console.log(QuizCommitMessageRes)
      console.log(quizRepositoryFileRes)

      console.log("create quiz success!!")

      history.push("/")

    } catch (err) {
      console.log(err)
    }
  }

  const handleGetQuizData = async () => {
    try {
      const ResQuiz = await getQuiz(Number(id))

      setQuizTitle(ResQuiz.data.quizData.quizTitle)
      setQuizIntroduction(ResQuiz.data.quizData.quizIntroduction)

      const ResQuizOfLast = await getQuizFirstOrLast(ResQuiz.data.quizFirstOrLastsData[0].id)

      await Promise.all(
        await ResQuizOfLast.data.data.map(async (branch :any) => {
        setBranches(branches => [...branches,{
          branchName: branch.quizBranchName,
          branchId: branch.id
        }])
        const ResQuizBranches = await getQuizBranch(branch.id)
        ResQuizBranches.data.dataWorktreeFiles.map((wortktree :any) => {
          setWorktreeFiles(worktreeFile => [...worktreeFile,{
            fileName: wortktree.quizWorktreeFileName,
            parentBranch: branch.quizBranchName,
            textStatus: wortktree.quizWorktreeFileTextStatus,
            worktreeFileId: wortktree.id
          }])
        })
        ResQuizBranches.data.dataMessages.map(async (message :any) => {
          setCommitMessages(commitMessage => [...commitMessage,{
            message: message.quizCommitMessage,
            parentBranch: branch.quizBranchName,
            commitMessageId: message.id
          }])
          const ResQuizRepositoryFiles = await getQuizCommitMessage(message.id)
          await Promise.all(
            ResQuizRepositoryFiles.data.data.map((data :any) => {
            setRepositoryFiles(repositoryFile => [...repositoryFile,{
              fileName: data.quizRepositoryFileName,
              repositoryStatus: data.quizRepositoryFileStatus,
              textStatus: data.quizRepositoryFileTextStatus,
              parentCommitMessage: message.quizCommitMessage,
              repositoryFileId: data.id
            }])
          }))
        }
      )}))
      console.log(ResQuiz)
      console.log(ResQuizOfLast)
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
  },[commitMessages, indexFiles, repositoryFiles, worktreeFiles, branches, currentBranch])

  return(
    <QuizContext.Provider
      value={{
        quizTitle, setQuizTitle,
        quizIntroduction, setQuizIntroduction,
        text, setText,
        addText, setAddText,
        currentBranch, setCurrentBranch,
        branches, setBranches,
        worktreeFiles, setWorktreeFiles,
        indexFiles, setIndexFiles,
        repositoryFiles, setRepositoryFiles,
        commitMessages, setCommitMessages,
        commands, setCommands
        }}>
      {location.pathname === "/quiz" &&
      <>
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
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={!quizTitle || !quizIntroduction || !quizType ? true : false}
          className={classes.submitBtn}
          onClick={handleCreateQuizSubmit}
        >
          Submit
        </Button>
      </>
      }
      {location.pathname === (`/quiz/edit/${id}`) &&
      <>
      <QuizBranchArea />
      <AboutQuiz />
      <Terminal />
      <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={!quizTitle || !quizIntroduction || !quizType ? true : false}
          className={classes.submitBtn}
          // onClick={handleUpdateQuizData}
        >
          Submit
        </Button>

        {/* ↓配列の中身確認用 */}
        <p>[branch]</p>
        { branches.map((branch) => (
          <p>
            { branch.branchName }
          </p>
          ))}
          <p>[work]</p>
        { worktreeFiles.map((worktreeFile) => (
          <p>
            { worktreeFile.fileName }
          </p>
          ))}
          <p>[repo]</p>
        { repositoryFiles.map((repositoryFile) => (
          <p>
            { repositoryFile.fileName }
          </p>
          ))}
          <p>[commit]</p>
        { commitMessages.map((commitMessage) => (
          <p>
            { commitMessage.message }
          </p>
          ))}
      </>
      }
    </QuizContext.Provider>
  )
}

export default CreateQuiz
