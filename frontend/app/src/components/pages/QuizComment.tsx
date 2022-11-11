import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core"
import { AuthContext } from "App"
import { createQuizComment } from "lib/api/quiz_comments"
import { useContext } from "react"
import { QuizBookmarkContext } from "./QuizList"

const userStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  }
}))

const QuizComment: React.FC<{ quizId: number }> = ({quizId}) => {
  const classes = userStyles()
  const { currentUser } = useContext(AuthContext)
  const {
    quizCommentHistory, setQuizCommentHistory,
    quizComment, setQuizComment
  } = useContext(QuizBookmarkContext)

  const handleCreateQuizCommentSubmit = async() => {
    try {
      const quizCommentData = {
        userId: currentUser?.id,
        quizId: quizId,
        comment: quizComment
      }
      const quizCommentRes = await createQuizComment(quizCommentData)

      setQuizCommentHistory((commentHistory) => [...commentHistory,{
        id: quizCommentRes.data.data.id,
        quizId: quizCommentRes.data.data.quizId,
        userId:quizCommentRes.data.data.userId,
        comment: quizCommentRes.data.data.comment
      }])

      setQuizComment("")

      console.log("quizCommentRes", quizCommentRes)
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="コメント"
          variant="outlined"
          value={quizComment}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
            setQuizComment(e.target.value)
          }}
        />
      </form>
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        color="default"
        disabled={!quizComment}
        className={classes.submitBtn}
        onClick={handleCreateQuizCommentSubmit}
        >
        Submit
      </Button>
    </>
  )
}

export default QuizComment