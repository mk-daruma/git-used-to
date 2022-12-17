import { Button, makeStyles, Theme } from "@material-ui/core"
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useContext } from "react"
import { QuizBookmarkContext } from "./QuizListPage"
import AvatarImage from "components/layouts/Avatar";
import { AuthContext } from "App";
import ReccomendSignUpModal from "./RecommendSignUpModal";
import QuizBookmarkButton from "./QuizBookmarkButton";
import QuizComment from "./QuizComment";
import { deleteQuiz } from "lib/api/quizzes";
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) => ({
  quiz: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent:"space-between",
    maxWidth: 1000,
    minWidth: 1,
    width: "90%",
    backgroundColor: "white",
    borderRadius: "2rem",
    margin: theme.spacing(1),
    padding: theme.spacing(2)
  },
  rightPosition: {
    display: "flex",
    flexFlow: "column",
    justifyContent:"space-around",
    width: "10rem"
  },
  leftPosition: {
    width: "10rem"
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  },
  userName: {
    paddingLeft: theme.spacing(2)
  },
  quizName: {
    color: "black"
  },
  quizIntro: {
    flexFlow: "column",
    color: "black",
    overflowWrap: "break-word"
  },
  bookmarkAndCommentButton: {
    display: "flex",
    alignItems: "center"
  }
}))

const QuizList: React.FC = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const {
    quizzes, setQuizzes,
    quizzesForSearch, setQuizzesForSearch,
    quizTags, setQuizTags,
    quizBookmarks
  } = useContext(QuizBookmarkContext)

  const getBookmarkId = (quizId :string) =>
    quizBookmarks.some(bookmark => bookmark.quizId === quizId && Number(bookmark.userId) === currentUser?.id)
    ? quizBookmarks.filter(bookmark => bookmark.quizId === quizId && Number(bookmark.userId) === currentUser?.id)[0].id
    : undefined

  const handleDeleteQuiz = (quizId :number) => {
    try{
      console.log(deleteQuiz(quizId))
      setQuizzes(quizzes.filter(quiz => Number(quiz.id) !== quizId))
      setQuizzesForSearch(quizzesForSearch.filter(quiz => Number(quiz.id) !== quizId))
      setQuizTags(quizTags.filter(quiz => quiz.quizId === quizId))
    } catch(err) {
      console.log(err)
    }
  }

  const QuizEditButton :React.FC<{quizId :number}> = ({quizId}) => {
    return(
      <>
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/edit/${quizId}`}
        >
          編集
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/init/edit/${quizId}`}
        >
          初期値を編集
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submitBtn}
          onClick={e => handleDeleteQuiz(quizId)}
        >
          <DeleteIcon />
        </Button>
      </>
    )
  }


  return(
    <>
      {quizzes
        .filter(quiz => quiz.id)
        .map((quiz, index) => (
          <motion.div
            className={classes.quiz}
            key={index}
            whileHover={{ scale: 1.1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 10
            }}
            variants={{
              offscreen: {
                y: 100,
                opacity: 0,
              },
              onscreen: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              },
            }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: false, amount: 0 }}
            >
            <div className={classes.leftPosition}>
              <Button
                component={Link}
                to={`/user/${quiz.userId}/edit`}
                >
                <AvatarImage image={quiz.parentUserImage.url} rank={quiz.parentUserNickname} />
                <div className={classes.userName}>
                  {quiz.parentUserName}
                </div>
              </Button>
              <div className={classes.quizName}>
                【クイズ】<br />
                { quiz.quizTitle }
              </div>
              <div className={classes.quizIntro}>
                【紹介文】<br/>
                { quiz.quizIntroduction }
              </div>
            </div>
            <div className={classes.rightPosition}>
              {Number(quiz.userId) === currentUser?.id && <QuizEditButton quizId={Number(quiz.id)}/>}
              <Button
                type="submit"
                variant="contained"
                color="default"
                className={classes.submitBtn}
                component={Link}
                to={`/quiz/answer/${quiz.id}`}
              >
                解答する
              </Button>
              {currentUser?.email === "guest_user@git-used-to.com"
              ? <ReccomendSignUpModal
                  btnType="bookmarkBtn"
                  quizId={Number(quiz.id)}
                />
              : <QuizBookmarkButton
                  quizId={Number(quiz.id)}
                  bookmarkId={getBookmarkId(quiz.id)}
                />
                }
              <QuizComment
                quizId={Number(quiz.id)}
              />
            </div>
          </motion.div>
          ))}
    </>
  )
}

export default QuizList