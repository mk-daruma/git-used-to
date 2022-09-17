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

export const QuizContext = createContext({} as {
  quizTitle: string
  setQuizTitle: React.Dispatch<React.SetStateAction<string>>
  quizIntroduction: string
  setQuizIntroduction: React.Dispatch<React.SetStateAction<string>>
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>

  worktreeFiles: {
    fileName :string
    staus :string
  }[]

  setWorktreeFiles:React.Dispatch<React.SetStateAction<{
    fileName :string
    staus :string
  }[]>>

  commitMessages :{
    message :string
  }[]

  setCommitMessages: React.Dispatch<React.SetStateAction<{
    message :string
  }[]>>

  branches: {
    branchName :string
  }[]

  setBranches: React.Dispatch<React.SetStateAction<{
    branchName :string
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
  const [worktreeFiles, setWorktreeFiles] = useState([{
    fileName :"sample.rb",
    staus : ""
  }])
  const [commitMessages, setCommitMessages] = useState([{
    message : ""
  }])
  const [branches, setBranches] = useState([{
    branchName :"master"
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
        quizBranchName: branch.branchName === "master" ? branch.branchName : branch.branchName.substring(11),
        quizFirstOrLastId: quizFirtsOrLastRes.data.data.id
      }
      ))

      const quizBranchRes = await createQuizBranch(quizBranchData)

      console.log(aboutQuizRes)
      console.log(quizFirtsOrLastRes)
      console.log(quizBranchRes)

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
        branches, setBranches,
        worktreeFiles, setWorktreeFiles,
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
