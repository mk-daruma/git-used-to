import React, { useContext, useState } from "react";
import { createContext } from "react";

import { makeStyles, Theme } from "@material-ui/core";
import Button from "@material-ui/core/Button"

import AboutQuiz from "./AboutQuiz";
import { AuthContext } from "App";
import { AboutQuizData } from "interfaces";
import { createQuiz } from "lib/api/quizzes";


export const QuizContext = createContext({} as {
  quizTitle: string
  setQuizTitle: React.Dispatch<React.SetStateAction<string>>
  quizIntroduction: string
  setQuizIntroduction: React.Dispatch<React.SetStateAction<string>>
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
  const classes = useStyles()

  const [quizTitle, setQuizTitle] = useState<string>("")
  const [quizIntroduction, setQuizIntroduction] = useState<string>("")
  const quizType = "user"

  const data: AboutQuizData = {
    quizTitle: quizTitle,
    quizIntroduction: quizIntroduction,
    quizType: quizType,
    userId: currentUser?.id
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const res = await createQuiz(data)
      console.log(res)

      console.log("create quiz success!!")
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <QuizContext.Provider value={{ quizTitle, setQuizTitle, quizIntroduction, setQuizIntroduction}}>
      {/* <layout 5つのコンポーネントを横並びにする> */}
        {/* <Worktree />
        <Index />
        <CommitMessage />
        <LocalRepository />
        <RemoteRepository /> */}
      {/* </layout> */}

      {/* <layout 2つのコンポーネントを横並びにする> */}
        <AboutQuiz />
        {/* <Tarminal /> */}
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
