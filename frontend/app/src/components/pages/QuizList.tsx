import { Button, makeStyles, Theme } from "@material-ui/core";
import { AuthContext } from "App";
import { getAllQuizzes } from "lib/api/quizzes";
import { getAllQuizBookmarks } from "lib/api/quiz_boolmarks";
import { getAllQuizComments } from "lib/api/quiz_comments";
import { getAllQuizTags } from "lib/api/quiz_tags";
import { getUserQuizzes } from "lib/api/users"
import React, { useContext, useState, useEffect, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import QuizBookmarkButton from "./QuizBookmarkButton";
import QuizComment from "./QuizComment";
import QuizSearchForm from "./QuizSearchForm";

export const QuizBookmarkContext = createContext({} as {
  quizzes:{
    id: string,
    quizTitle: string,
    quizIntroduction: string
  }[]
  setQuizzes: React.Dispatch<React.SetStateAction<{
    id: string,
    quizTitle: string,
    quizIntroduction: string
  }[]>>
  quizzesForSearch:{
    id: string,
    quizTitle: string,
    quizIntroduction: string
  }[]
  setQuizzesForSearch: React.Dispatch<React.SetStateAction<{
    id: string,
    quizTitle: string,
    quizIntroduction: string
  }[]>>
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
  quizCommentHistory: {
    id: number,
    userId: number,
    quizId: number,
    comment: string
  }[]
  setQuizCommentHistory :React.Dispatch<React.SetStateAction<{
    id: number,
    userId: number,
    quizId: number,
    comment: string
  }[]>>
  quizTags: {
    id: number,
    quizId: number,
    tag: string
  }[]
  setQuizTags :React.Dispatch<React.SetStateAction<{
    id: number,
    quizId: number,
    tag: string
  }[]>>
  quizComment: string
  setQuizComment :React.Dispatch<React.SetStateAction<string>>
  text: string
  setText :React.Dispatch<React.SetStateAction<string>>
})

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
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
  const [text, setText] = useState("")
  const [quizzes, setQuizzes] = useState([{
    id: "",
    quizTitle: "",
    quizIntroduction: ""
  }])
  const [quizzesForSearch, setQuizzesForSearch] = useState([{
    id: "",
    quizTitle: "",
    quizIntroduction: ""
  }])
  const [quizBookmarks, setQuizBookmarks] = useState([{
    id: "",
    userId: "",
    quizId: "",
  }])
  const [quizCommentHistory, setQuizCommentHistory] = useState([{
    id: 0,
    userId: 0,
    quizId: 0,
    comment: ""
  }])
  const [quizTags, setQuizTags] = useState([{
    id: 0,
    quizId: 0,
    tag: ""
  }])
  const [quizComment, setQuizComment] = useState("")

  const handleGetUserQuizzes = async () => {
    try {
      const resUserQuizzes = await getUserQuizzes(currentUser?.id)
      const resAllBookmarks = await getAllQuizBookmarks()
      console.log(resUserQuizzes)
      if (resUserQuizzes?.status === 200) {
        setQuizzes(resUserQuizzes?.data.data)
        setQuizzesForSearch(resUserQuizzes?.data.data)
        setQuizBookmarks(resAllBookmarks?.data.data)
        setQuizCommentHistory(resUserQuizzes?.data.dataComments)
        setQuizTags(resUserQuizzes?.data.dataTags)
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
      const resQuizComments = await getAllQuizComments()
      const resAllTags = await getAllQuizTags()
      console.log(resQuizzes)
      if (resQuizzes?.status === 200) {
        setQuizzes(resQuizzes?.data.data)
        setQuizzesForSearch(resQuizzes?.data.data)
        setQuizBookmarks(resAllBookmarks?.data.data)
        setQuizCommentHistory(resQuizComments?.data.data)
        setQuizTags(resAllTags?.data.data)
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
        const QuizComments =
          resUserQuizzes?.data.dataComments.filter((res :any) =>
            bookmarkedQuizzes.some((allBookmark :any) =>
              allBookmark.id === res.quizId)
            )
        const QuizTags =
          resUserQuizzes?.data.dataTags.filter((res :any) =>
            bookmarkedQuizzes.some((allBookmark :any) =>
              allBookmark.id === res.quizId)
            )
        setQuizzes(bookmarkedQuizzes)
        setQuizzesForSearch(bookmarkedQuizzes)
        setQuizBookmarks(resAllBookmarks?.data.data)
        setQuizCommentHistory(QuizComments)
        setQuizTags(QuizTags)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getBookmarkId = (quizId :string) =>
    quizBookmarks.some(bookmark => bookmark.quizId === quizId && Number(bookmark.userId) === currentUser?.id)
    ? quizBookmarks.filter(bookmark => bookmark.quizId === quizId && Number(bookmark.userId) === currentUser?.id)[0].id
    : undefined

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
    console.log("quizzesForSearch", quizzesForSearch)
  }, [quizzesForSearch])

  useEffect(() => {
    console.log("quizBookmarks", quizBookmarks)
  }, [quizBookmarks])

  useEffect(() => {
    console.log("quizCommentHistory", quizCommentHistory)
  }, [quizCommentHistory])

  useEffect(() => {
    console.log("quizTags", quizTags)
  }, [quizTags])

  return (
    <>
    <QuizBookmarkContext.Provider
      value={{
        text, setText,
        quizzes, setQuizzes,
        quizzesForSearch, setQuizzesForSearch,
        quizBookmarks, setQuizBookmarks,
        quizCommentHistory, setQuizCommentHistory,
        quizComment, setQuizComment,
        quizTags, setQuizTags
      }}>
      <QuizSearchForm />
      {quizzes.map((quiz) => (
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
          <QuizBookmarkButton
            quizId={Number(quiz.id)}
            bookmarkId={getBookmarkId(quiz.id)}
          />
          <QuizComment
            quizId={Number(quiz.id)}
          />
        </>
        ))}
      </QuizBookmarkContext.Provider>
    </>
  )
}

export default QuizList
