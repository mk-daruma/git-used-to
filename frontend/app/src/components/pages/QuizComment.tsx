import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import { AuthContext } from "App"
import { createQuizComment, deleteQuizComment } from "lib/api/quiz_comments"
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

  const handleDeleteQuizCommentSubmit = async(e: React.MouseEvent<HTMLButtonElement>,commentId :any) => {
    try {
      deleteQuizComment(commentId)
      setQuizCommentHistory(quizCommentHistory.filter(comment => comment.id !== commentId))
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
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (quizComment) handleCreateQuizCommentSubmit()
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
            setQuizComment(e.target.value)
          }}
        />
      </form>
      <Button
        type="submit"
        variant="contained"
        size="large"
        color="default"
        disabled={!quizComment || quizComment.length > 100}
        className={classes.submitBtn}
        onClick={handleCreateQuizCommentSubmit}
        >
        Submit
      </Button>
      {quizCommentHistory &&
        quizCommentHistory
          .filter(commentHistory =>commentHistory.quizId === quizId)
          .map(comment =>
          <p key={comment.id}>
            {comment.comment}
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="default"
              className={classes.submitBtn}
              onClick={e => handleDeleteQuizCommentSubmit(e, comment.id)}
              >
              <DeleteIcon />
            </Button>
          </p>
        )}
    </>
  )
}

export default QuizComment