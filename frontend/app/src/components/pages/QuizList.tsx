import { Button, makeStyles, Modal, Theme } from "@material-ui/core";
import { AuthContext } from "App";
import { getAllQuizzes } from "lib/api/quizzes";
import { getAllQuizBookmarks } from "lib/api/quiz_boolmarks";
import { getAllQuizComments } from "lib/api/quiz_comments";
import { getUserQuizzes } from "lib/api/users"
import React, { useContext, useState, useEffect, createContext } from "react";
import { Link, useLocation } from "react-router-dom";
import QuizBookmarkButton from "./QuizBookmarkButton";
import QuizComment from "./QuizComment";

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
  quizComment: string
  setQuizComment :React.Dispatch<React.SetStateAction<string>>
})

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  },
  modal: {
    backgroundColor: "#f5f5f5",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: 400,
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
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
  const [quizCommentHistory, setQuizCommentHistory] = useState([{
    id: 0,
    userId: 0,
    quizId: 0,
    comment: ""
  }])
  const [quizComment, setQuizComment] = useState("")
  const [modal, setModal] = useState(false)

  const handleGetUserQuizzes = async () => {
    try {
      const resUserQuizzes = await getUserQuizzes(currentUser?.id)
      const resAllBookmarks = await getAllQuizBookmarks()
      console.log(resUserQuizzes)
      if (resUserQuizzes?.status === 200) {
        setQuizzes(resUserQuizzes?.data.data)
        setQuizBookmarks(resAllBookmarks?.data.data)
        setQuizCommentHistory(resUserQuizzes?.data.dataComments)
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
      console.log(resQuizzes)
      if (resQuizzes?.status === 200) {
        setQuizzes(resQuizzes?.data.data)
        setQuizBookmarks(resAllBookmarks?.data.data)
        setQuizCommentHistory(resQuizComments?.data.data)
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
        setQuizzes(bookmarkedQuizzes)
        setQuizBookmarks(resAllBookmarks?.data.data)
        setQuizCommentHistory(QuizComments)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleModalOpen = () => setModal(true)
  const handleModalclose = () => setModal(false)

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
    console.log("quizBookmarks", quizBookmarks)
  }, [quizBookmarks])

  useEffect(() => {
    console.log("quizCommentHistory", quizCommentHistory)
  }, [quizCommentHistory])

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
            quizCommentHistory, setQuizCommentHistory,
            quizComment, setQuizComment
          }}>
          <QuizBookmarkButton
            quizId={Number(quiz.id)}
            bookmarkId={getBookmarkId(quiz.id)}
          />
          <Button onClick={handleModalOpen}>
            Open Modal
          </Button>
          <Modal
            open={modal}
            onClose={handleModalclose}
            className={classes.modal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <QuizComment
              quizId={Number(quiz.id)}
            />
          </Modal>
        </QuizBookmarkContext.Provider>
      </>
      ))}
    </>
  )
}

export default QuizList
