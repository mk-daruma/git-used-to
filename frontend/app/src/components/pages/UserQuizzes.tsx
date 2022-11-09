import { Button, makeStyles, Theme } from "@material-ui/core";
import { AuthContext } from "App";
import { getAllQuizBookmarks } from "lib/api/quiz_boolmarks";
import { getUserQuizzes } from "lib/api/users"
import React, { useContext, useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import QuizBookmarkButton from "./QuizBookmarkButton";

export const QuizBookmarkContext = createContext({} as {
  quizBookmarks: {
    id: string,
    userId: string,
    quizId: string,
  }[]
  setQuizBookmarks :React.Dispatch<React.SetStateAction<{
    id: string,
    userId: string,
    quizId: string,
  }[]>>
})

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  }
}))

const UserQuizzes: React.FC = () => {
  const classes = useStyles()

  const { currentUser } = useContext(AuthContext)
  const [userQuizzes, setUserQuizzes] = useState([{
    id: "",
    quizTitle: "",
    quizIntroduction: ""
  }])
  const [quizBookmarks, setQuizBookmarks] = useState([{
    id: "",
    userId: "",
    quizId: "",
  }])

  const handleGetUserQuizzes = async () => {
    try {
      const resUserQuizzes = await getUserQuizzes(currentUser?.id)
      const resAllBookmarks = await getAllQuizBookmarks()
      console.log(resUserQuizzes)
      if (resUserQuizzes?.status === 200) {
        setUserQuizzes(resUserQuizzes?.data.data)
        setQuizBookmarks(resAllBookmarks?.data.data)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetUserQuizzes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("userQuizzes", userQuizzes)
  }, [userQuizzes])

  useEffect(() => {
    console.log("userQuizBookmarks", quizBookmarks)
  }, [quizBookmarks])

  return (
    <>
    { userQuizzes.map((userQuiz) => (
      <>
        <p>{ userQuiz.id }</p>
        <p>{ userQuiz.quizTitle }</p>
        <p>{ userQuiz.quizIntroduction }</p>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/edit/${userQuiz.id}`}
        >
          編集
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/init/edit/${userQuiz.id}`}
        >
          初期値を編集
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/answer/${userQuiz.id}`}
        >
          解答する
        </Button>
        <QuizBookmarkContext.Provider
          value={{
            quizBookmarks, setQuizBookmarks,
          }}>
          <QuizBookmarkButton
            quizId={Number(userQuiz.id)}
            bookmarkId={
              quizBookmarks.some(bookmark => bookmark.quizId === userQuiz.id && Number(bookmark.userId) === currentUser?.id)
              ? quizBookmarks.filter(bookmark => bookmark.quizId === userQuiz.id && Number(bookmark.userId) === currentUser?.id)[0].id
              : undefined
            }
          />
        </QuizBookmarkContext.Provider>
      </>
      ))}
    </>
  )
}

export default UserQuizzes