import { Button, makeStyles, Modal } from "@material-ui/core"
import { AuthContext } from "App";
import Cookies from "js-cookie";
import { signOut } from "lib/api/auth";
import { useContext, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { QuizBookmarkContext } from "./QuizListPage";

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

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    textTransform: "none"
  },
  quizButton: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    flexGrow: 1,
    width: "90%",
    textTransform: "none",
    backgroundColor: "#f5f5f5",
  }
}));

const ReccomendSignUpModal :React.FC<{ btnType? :string, quizId?: number }> = ({btnType, quizId}) => {
  const classes = useStyles()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const { setIsSignedIn, currentUser } = useContext(AuthContext)
  const { quizBookmarks } = useContext(QuizBookmarkContext)
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signup")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const quizListPath =
    location.pathname === "/quiz/list"
    || location.pathname === `/user/${id}/quiz/bookmark/list`
    || location.pathname === `/user/${id}/quiz/list`

  const bookmarkBtn = quizListPath && btnType === "bookmarkBtn"
  const commentBtn = quizListPath && btnType === "commentBtn"

  return(
    <>
      {bookmarkBtn &&
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submitBtn}
          onClick={handleOpen}
          >
          <BookmarkBorderIcon />
          {quizBookmarks.filter(bookmark => Number(bookmark.quizId) === quizId).length}
        </Button>
      }
      {commentBtn &&
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submitBtn}
          onClick={handleOpen}
          >
          ゲストログイン中はここまで
        </Button>
      }
      {location.pathname === "/quiz" &&
        <Button
          onClick={handleOpen}
          className={classes.quizButton}
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          >
          ゲストログイン中はここまで
        </Button>
      }
      {location.pathname === `/user/${currentUser?.id}/edit` &&
        <Button
          variant="contained"
          size="large"
          color="default"
          fullWidth
          className={classes.submitBtn}
          onClick={handleOpen}
          >
          ゲストログイン中はここまで
        </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">遊んでくれてありがとう！</h2>
          <p id="simple-modal-description">
            ゲストログイン中はこの先の機能を使用できません。
            是非アカウントを作成の上、お楽しみください！
          </p>
          <Button
            onClick={handleSignOut}
            className={classes.submitBtn}
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="default"
          >
            アカウント作成へ進む
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ReccomendSignUpModal