import React, { useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App";
import { QuizContext } from "./CreateQuiz";
import { TextField } from "@material-ui/core";


const userStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    }
}))

const AboutQuiz: React.FC = () => {
  const classes = userStyles()

  const { currentUser } = useContext(AuthContext)
  const { quizTitle, setQuizTitle, quizIntroduction, setQuizIntroduction } = useContext(QuizContext)

  return(
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        required
        id="outlined-required"
        label="クイズ名"
        variant="outlined"
        value={quizTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
          setQuizTitle(e.target.value)
        }}
      />
      <TextField
        required
        multiline
        minRows="10"
        id="outlined-required"
        label="クイズ説明文"
        variant="outlined"
        value={quizIntroduction}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
          setQuizIntroduction(e.target.value)
        }}
      />
      <div>
        <input
          type="hidden"
          id="currentUserId"
          name="currentUserId"
          value={currentUser?.id}
        />
      </div>
    </form>
  )
}

export default AboutQuiz
