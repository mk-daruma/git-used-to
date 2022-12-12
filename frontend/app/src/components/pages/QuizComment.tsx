import { Button, createStyles, makeStyles, Modal, TextField, Theme } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import { AuthContext } from "App"
import { createQuizComment, deleteQuizComment } from "lib/api/quiz_comments"
import { useContext, useState } from "react"
import { QuizBookmarkContext } from "./QuizList"
import SmsIcon from '@material-ui/icons/Sms';

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const userStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  comment: {
    display: "flex",
    flexFlow: "column",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    width: "100%",
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  }
}))

const QuizComment: React.FC<{ quizId: number }> = ({quizId}) => {
  const classes = userStyles()
  const [modalStyle] = useState(getModalStyle);
  const { currentUser } = useContext(AuthContext)
  const {
    quizCommentHistory, setQuizCommentHistory,
    quizComment, setQuizComment
  } = useContext(QuizBookmarkContext)
  const [open, setOpen] = useState(false)

  const opneModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const quizComments = quizCommentHistory.filter(commentHistory => commentHistory.quizId === quizId)

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
    <div >
      <Button
        type="submit"
        variant="contained"
        color="default"
        onClick={opneModal}
        className={classes.submitBtn}
      >
        <SmsIcon /> {quizComments.length}
      </Button>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              required
              id="outlined-required"
              label="コメント(100文字まで)"
              variant="outlined"
              value={quizComment}
              onKeyDown={e => {e.key === 'Enter' && e.preventDefault()}}
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
            quizComments.map(comment =>
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
        </div>
      </Modal>
    </div>
  )
}

export default QuizComment