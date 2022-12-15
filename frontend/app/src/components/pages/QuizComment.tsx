import { Avatar, Button, createStyles, makeStyles, Modal, TextField, Theme } from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete';
import { AuthContext } from "App"
import { createQuizComment, deleteQuizComment } from "lib/api/quiz_comments"
import { useContext, useState } from "react"
import { QuizBookmarkContext } from "./QuizList"
import SmsIcon from '@material-ui/icons/Sms';
import ReccomendSignUpModal from "./RecommendSignUpModal";

const getModalStyle = () => {
  return {
    top: `50%`
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
  modal: {
    padding: theme.spacing(3),
    height: "20rem",
    overflow: 'scroll',
  },
  comment: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
  },
  commentedUser: {
    display: "flex",
    alignItems: "center",
  },
  commentedUserImage: {
    marginRight: theme.spacing(1),
  },
  commentForm: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  commentBtn: {
    height: "100%"
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

  const quizComments = quizCommentHistory.filter(commentHistory => commentHistory.comment.quizId === quizId)

  const handleCreateQuizCommentSubmit = async() => {
    try {
      const quizCommentData = {
        userId: currentUser?.id,
        quizId: quizId,
        comment: quizComment
      }
      const quizCommentRes = await createQuizComment(quizCommentData)
      setQuizCommentHistory((commentHistory) => [...commentHistory,{
        comment: {
          id: quizCommentRes.data.comment.id,
          userId: quizCommentRes.data.comment.userId,
          quizId: quizCommentRes.data.comment.quizId,
          comment: quizCommentRes.data.comment.comment,
        },
        commentedUserName: quizCommentRes.data.commentedUserName,
        commentedUserImage: quizCommentRes.data.commentedUserImage
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
      setQuizCommentHistory(quizCommentHistory.filter(comment => comment.comment.id !== commentId))
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
        <SmsIcon />
        {quizComments.length}
      </Button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={closeModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          {quizCommentHistory &&
            quizComments.map(comment =>
              <div key={comment.comment.id} className={classes.comment}>
                <div className={classes.commentedUser}>
                  <Avatar
                    className={classes.commentedUserImage}
                    src={comment.commentedUserImage}
                    />
                  {comment.commentedUserName}
                </div>
                <div>
                  コメント:<br /> {comment.comment.comment}
                  {comment.comment.userId === currentUser?.id &&
                    <Button
                      onClick={e => handleDeleteQuizCommentSubmit(e, comment.comment.id)}
                      >
                      <DeleteIcon />
                    </Button>
                  }
                </div>
              </div>
            )}
          <div className={classes.commentForm}>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                required
                multiline
                minRows="3"
                id="outlined-required"
                label="コメント(100文字まで)"
                variant="outlined"
                value={quizComment}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
                  setQuizComment(e.target.value)
                }}
              />
            </form>
            {currentUser?.email === "guest_user@git-used-to.com"
              ? <ReccomendSignUpModal
                  btnType="commentBtn"
                />
              : <Button
                  type="submit"
                  variant="contained"
                  color="default"
                  disabled={!quizComment || quizComment.length > 100}
                  className={classes.commentBtn}
                  onClick={handleCreateQuizCommentSubmit}
                  >
                  Submit
                </Button>
                }
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default QuizComment