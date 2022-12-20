import React, { useContext } from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App";
import { QuizContext } from "./CreateQuiz";
import { TextField } from "@material-ui/core";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import BackupOutlinedIcon from '@material-ui/icons/BackupOutlined';


const userStyles = makeStyles((theme: Theme) => createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(2),
        display: "flex",
        justifyContent: "center"
      }
    },
    form: {
      width: "90%",
      backgroundColor: "#a9a9a9",
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

const AboutQuiz: React.FC = () => {
  const classes = userStyles()

  const { currentUser } = useContext(AuthContext)
  const { quizTitle, setQuizTitle, quizIntroduction, setQuizIntroduction } = useContext(QuizContext)

  return(
    <>
      <h4 className={classes.title}>
          <BackupOutlinedIcon className={classes.icon} />
          about quiz
      </h4>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          className={classes.form}
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
          className={classes.form}
          minRows="6"
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
    </>
  )
}

export default AboutQuiz
