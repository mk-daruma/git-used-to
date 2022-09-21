import React, { useContext, useState, createContext } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button"

import AboutQuiz from "./AboutQuiz";
import { AuthContext } from "App";
import { AboutQuizData, QuizFirtsOrLastData } from "interfaces";
import { createQuiz } from "lib/api/quizzes";
import Terminal from "./Terminal";
import QuizBranchArea from "./QuizBranchArea";
import { createQuizFirstOrLast } from "lib/api/quiz_first_or_lasts";
import { createQuizBranch } from "lib/api/quiz_branches";
import { createQuizWorktreeFile } from "lib/api/quiz_worktree_files";
import { createQuizCommitMessage } from "lib/api/quiz_commit_messages";
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

  worktreeFiles: {
    fileName: string
    parentBranch: string
    status: string
  }[]

  setWorktreeFiles: React.Dispatch<React.SetStateAction<{
    fileName: string
    parentBranch: string
    status: string
  }[]>>

  repositoryFiles: {
    fileName: string
    repositoryStatus: string
    parentCommitMessage: string
  }[]

  setRepositoryFiles:React.Dispatch<React.SetStateAction<{
    fileName: string
    repositoryStatus: string
    parentCommitMessage: string
  }[]>>

  commitMessages: {
    message: string
    parentBranch: string
  }[]

  setCommitMessages: React.Dispatch<React.SetStateAction<{
    message: string
    parentBranch: string
  }[]>>

  branches: {
    branchName: string
  }[]

  setBranches: React.Dispatch<React.SetStateAction<{
    branchName: string
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

  const [quizTitle, setQuizTitle] = useState<string>("")
  const [quizIntroduction, setQuizIntroduction] = useState<string>("")
  const [text, setText] = useState("");
  const [currentBranch, setCurrentBranch] = useState("master");
  const [worktreeFiles, setWorktreeFiles] = useState([{
    fileName: "sample.rb",
    parentBranch: "master",
    status: "worktree"
  }])
  const [repositoryFiles, setRepositoryFiles] = useState([{
    fileName: "",
    repositoryStatus: "",
    parentCommitMessage: ""
  }])
  const [commitMessages, setCommitMessages] = useState([{
    message: "",
    parentBranch: ""
  }])
  const [branches, setBranches] = useState([{
    branchName: "master"
    }]
  )

  const quizType = "user"

  const aboutQuizData: AboutQuizData = {
    quizTitle: quizTitle,
    quizIntroduction: quizIntroduction,
    quizType: quizType,
    userId: currentUser?.id
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
          quizWorktreeFileStatus: filteredWorktreeFile.status,
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

      const quizRepositoryFileData = QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
        repositoryFiles
        .filter(repositoryFile => repositoryFile.parentCommitMessage === commitMessage.quizCommitMessage)
        .map((filteredRepositoryFile :any) =>({
          quizRepositoryFileName: filteredRepositoryFile.fileName,
          quizRepositoryFileStatus: filteredRepositoryFile.repositoryStatus,
          quizCommitMessageId: commitMessage.id
        }))
      ))

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

  return(
    <QuizContext.Provider
      value={{
        quizTitle, setQuizTitle,
        quizIntroduction, setQuizIntroduction,
        text, setText,
        currentBranch, setCurrentBranch,
        branches, setBranches,
        worktreeFiles, setWorktreeFiles,
        repositoryFiles, setRepositoryFiles,
        commitMessages, setCommitMessages
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
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        color="default"
        disabled={!quizTitle || !quizIntroduction || !quizType ? true : false}
        className={classes.submitBtn}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </QuizContext.Provider>
  )
}

export default CreateQuiz
