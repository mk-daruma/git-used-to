import { Button, makeStyles, Theme } from "@material-ui/core";
import { AuthContext } from "App";
import { getAllQuizzes } from "lib/api/quizzes";
import { getAllQuizBookmarks } from "lib/api/quiz_boolmarks";
import { getUserQuizzes } from "lib/api/users"
import React, { useContext, useState, useEffect, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
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

const QuizList: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()

  const { currentUser } = useContext(AuthContext)
  const [quizzes, setQuizzes] = useState([{
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
        setQuizzes(resUserQuizzes?.data.data)
        setQuizBookmarks(resAllBookmarks?.data.data)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetQuizzes = async () => {
    try {
      const resQuizzes = await getAllQuizzes()
      const resAllBookmarks = await getAllQuizBookmarks()
      console.log(resQuizzes)
      if (resQuizzes?.status === 200) {
        setQuizzes(resQuizzes?.data.data)
        setQuizBookmarks(resAllBookmarks?.data.data)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleGetBookmarkedQuizzes = async () => {
    try {
      const resUserQuizzes = await getUserQuizzes(currentUser?.id)
      const resAllBookmarks = await getAllQuizBookmarks()
      console.log(resUserQuizzes)
      if (resUserQuizzes?.status === 200) {
        const allBookmarks = resAllBookmarks?.data.data
        const bookmarkedQuizzes =
          resUserQuizzes?.data.data.filter((res :any) =>
            allBookmarks.some((allBookmark :any) =>
              allBookmark.quizId === res.id)
            )
        setQuizzes(bookmarkedQuizzes)
        setQuizBookmarks(resAllBookmarks?.data.data)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const currentPath = (path :string) => location.pathname === (path)

    currentPath(`/user/quiz/list`) && handleGetUserQuizzes()
    currentPath(`/user/bookmark/list`) && handleGetBookmarkedQuizzes()
    currentPath(`/quiz/list`) && handleGetQuizzes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    console.log("quizzes", quizzes)
  }, [quizzes])

  useEffect(() => {
    console.log("quizBookmarks", quizBookmarks)
  }, [quizBookmarks])

  return (
    <>
    { quizzes.map((quiz) => (
      <>
        <p>{ quiz.id }</p>
        <p>{ quiz.quizTitle }</p>
        <p>{ quiz.quizIntroduction }</p>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/edit/${quiz.id}`}
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
          to={`/quiz/init/edit/${quiz.id}`}
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
          to={`/quiz/answer/${quiz.id}`}
        >
          解答する
        </Button>
        <QuizBookmarkContext.Provider
          value={{
            quizBookmarks, setQuizBookmarks,
          }}>
          <QuizBookmarkButton
            quizId={Number(quiz.id)}
            bookmarkId={
              quizBookmarks.some(bookmark => bookmark.quizId === quiz.id && Number(bookmark.userId) === currentUser?.id)
              ? quizBookmarks.filter(bookmark => bookmark.quizId === quiz.id && Number(bookmark.userId) === currentUser?.id)[0].id
              : undefined
            }
          />
        </QuizBookmarkContext.Provider>
      </>
      ))}
    </>
  )
}

export default QuizList
