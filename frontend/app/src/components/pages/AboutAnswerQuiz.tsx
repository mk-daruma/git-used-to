import React, { useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App";
import { QuizContext } from "./CreateQuiz";
import { TextField } from "@material-ui/core";
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';


const userStyles = makeStyles((theme: Theme) => createStyles({
    info: {
      margin: theme.spacing(2),
      marginTop: theme.spacing(0.5),
      flexGrow: 1,
      width: "90%",
      textTransform: "none",
    },
    title: {
      display: "flex",
      alignItems: "center",
      paddingLeft: "2rem",
      paddingBottom: "1.5rem",
      borderBottom: "solid",
    },
    icon: {
      marginRight: "1rem"
    }
}))

const AboutAnswerQuiz: React.FC = () => {
  const classes = userStyles()

  const { currentUser } = useContext(AuthContext)
  const { quizTitle, setQuizTitle, quizIntroduction, setQuizIntroduction } = useContext(QuizContext)

  return(
    <>
      <h4 className={classes.title}>
          <BackupOutlinedIcon className={classes.icon} />
          answer quiz
      </h4>
      <div className={classes.info}>
        【クイズ名】<br />
        {quizTitle}
      </div>
      <div className={classes.info}>
        【クイズ説明】<br />
        {quizIntroduction}
      </div>
    </>
  )
}

export default AboutAnswerQuiz
