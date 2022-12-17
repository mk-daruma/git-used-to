import { makeStyles, Theme } from "@material-ui/core";
import { getAllQuizzes } from "lib/api/quizzes";
import { getAllQuizBookmarks } from "lib/api/quiz_boolmarks";
import { getAllQuizComments } from "lib/api/quiz_comments";
import { getAllQuizTags } from "lib/api/quiz_tags";
import { getUserQuizzes, getUserSelfBookmarked } from "lib/api/users"
import React, { useState, useEffect, createContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import QuizSearchForm from "./QuizSearchForm";
import { motion } from "framer-motion"
import QuizList from "./QuizList";

export const QuizBookmarkContext = createContext({} as {
  quizzes:{
    id: string,
    userId: string,
    parentUserName: string,
    parentUserImage: {
      url: string
    },
    parentUserNickname: string,
    quizTitle: string,
    quizIntroduction: string,
    createdAt: string
  }[]
  setQuizzes: React.Dispatch<React.SetStateAction<{
    id: string,
    userId: string,
    parentUserName: string,
    parentUserImage: {
      url: string
    },
    parentUserNickname: string,
    quizTitle: string,
    quizIntroduction: string,
    createdAt: string
  }[]>>
  quizzesForSearch:{
    id: string,
    userId: string,
    parentUserName: string,
    parentUserImage: {
      url: string
    },
    parentUserNickname: string,
    quizTitle: string,
    quizIntroduction: string,
    createdAt: string
  }[]
  setQuizzesForSearch: React.Dispatch<React.SetStateAction<{
    id: string,
    userId: string,
    parentUserName: string,
    parentUserImage: {
      url: string
    },
    parentUserNickname: string,
    quizTitle: string,
    quizIntroduction: string,
    createdAt: string
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
    comment: {
      id: number,
      userId: number,
      quizId: number,
      comment: string,
    },
    commentedUserName: string,
    commentedUserImage: string
  }[]
  setQuizCommentHistory :React.Dispatch<React.SetStateAction<{
    comment: {
      id: number,
      userId: number,
      quizId: number,
      comment: string,
    },
    commentedUserName: string,
    commentedUserImage: string
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
  searchQuiztitle: string
  setSearchQuiztitle :React.Dispatch<React.SetStateAction<string>>
  searchQuizIntroduction: string
  setSearchQuizIntroduction :React.Dispatch<React.SetStateAction<string>>
})

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    textAlign: "center",
    fontSize: "3rem",
    fontWeight: "bold",
  },
  list: {
    display: "flex",
    padding: theme.spacing(3),
  },
  searchForm: {
    maxWidth: 1000,
    minWidth: 1,
    width: "35%",
    padding: theme.spacing(8),
    height: "25rem",
    overflow: 'scroll',
  },
  quizList: {
    maxWidth: 1000,
    minWidth: 1,
    width: "65%",
    padding: theme.spacing(3),
    height: "50rem",
    overflow: 'scroll',
  },
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

const QuizListPage: React.FC = () => {
  const classes = useStyles()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()

  const [searchQuiztitle, setSearchQuiztitle] = useState("")
  const [searchQuizIntroduction, setSearchQuizIntroduction] = useState("")
  const [quizzes, setQuizzes] = useState([{
    id: "",
    userId: "",
    parentUserName: "",
    parentUserImage: {
      url: ""
    },
    parentUserNickname: "",
    quizTitle: "",
    quizIntroduction: "",
    createdAt: ""
  }])
  const [quizzesForSearch, setQuizzesForSearch] = useState([{
    id: "",
    userId: "",
    parentUserName: "",
    parentUserImage: {
      url: ""
    },
    parentUserNickname: "",
    quizTitle: "",
    quizIntroduction: "",
    createdAt: ""
  }])
  const [quizBookmarks, setQuizBookmarks] = useState([{
    id: "",
    userId: "",
    quizId: "",
  }])
  const [quizCommentHistory, setQuizCommentHistory] = useState([{
    comment: {
      id: 0,
      userId: 0,
      quizId: 0,
      comment: "",
    },
    commentedUserName: "",
    commentedUserImage: ""
  }])
  const [quizTags, setQuizTags] = useState([{
    id: 0,
    quizId: 0,
    tag: ""
  }])
  const [quizComment, setQuizComment] = useState("")
  const quizStates = [setQuizzes, setQuizzesForSearch]

  const handleGetUserQuizzes = async (userId :number) => {
    try {
      const resUserQuizzes = await getUserQuizzes(userId)
      console.log(resUserQuizzes)
      if (resUserQuizzes?.status === 200) {
        resUserQuizzes.data.data
          .map((resQuiz :any) =>
          quizStates.map(quizState =>
            quizState(quizzes => [...quizzes,{
              id: resQuiz.id,
              userId: resQuiz.userId,
              parentUserName: resUserQuizzes.data.createdUserName,
              parentUserImage: {
                  url: resUserQuizzes.data.createdUserImage
              },
              parentUserNickname: resUserQuizzes.data.createdUserTitle,
              quizTitle: resQuiz.quizTitle,
              quizIntroduction: resQuiz.quizIntroduction,
              createdAt: resQuiz.createdAt,
            }])))
        setQuizBookmarks(resUserQuizzes?.data.dataBookmarks)
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
        resQuizzes.data.data
          .map((resQuiz :any) =>
          quizStates.map(quizState =>
            quizState(quizzes => [...quizzes,{
              id: resQuiz.quiz.id,
              userId: resQuiz.quiz.userId,
              parentUserName: resQuiz.createdUserName,
              parentUserImage: {
                  url: resQuiz.createdUserImage
              },
              parentUserNickname: resQuiz.createdUserNickname,
              quizTitle: resQuiz.quiz.quizTitle,
              quizIntroduction: resQuiz.quiz.quizIntroduction,
              createdAt: resQuiz.quiz.createdAt,
            }])))
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

  const handleGetSelfBookmarkedQuizzes = async (userId :number) => {
    const resUserSelf = await getUserSelfBookmarked(userId)

    if (resUserSelf?.status === 200) {
      resUserSelf.data.data.selfBookmarkedQuizzes
        .map((resUserSelf :any) =>
        quizStates.map(quizState =>
          quizState(quizzes => [...quizzes,{
            id: resUserSelf.quiz.id,
            userId: resUserSelf.quiz.userId,
            parentUserName: resUserSelf.createdUserName,
            parentUserImage: {
                url: resUserSelf.createdUserImage
            },
            parentUserNickname: resUserSelf.createdUserNickname,
            quizTitle: resUserSelf.quiz.quizTitle,
            quizIntroduction: resUserSelf.quiz.quizIntroduction,
            createdAt: resUserSelf.quiz.createdAt,
          }])))
      setQuizBookmarks(resUserSelf?.data.data.selfBookmarkedQuizBookmarks)
      setQuizCommentHistory(resUserSelf?.data.data.selfBookmarkedQuizComments)
      setQuizTags(resUserSelf?.data.data.selfBookmarkedQuizTags)
      console.log(resUserSelf)
    } else {
      console.log("No likes")
    }
  }

  const currentPath = (path :string) => location.pathname === (path)

  useEffect(() => {
    currentPath(`/quiz/list`) && handleGetQuizzes()
    currentPath(`/user/${id}/quiz/list`) && handleGetUserQuizzes(Number(id))
    currentPath(`/user/${id}/quiz/bookmark/list`) && handleGetSelfBookmarkedQuizzes(Number(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const quizListTitle =
    currentPath(`/quiz/list`)
    ? "クイズ一覧"
    : currentPath(`/user/${id}/quiz/list`)
    ? `作成クイズ一覧`
    : currentPath(`/user/${id}/quiz/bookmark/list`)
    ? `ブックマークしたクイズ一覧`
    : currentPath("/quiz/lesson/elementary")
    ? "git used to道場 初級"
    : currentPath("/quiz/lesson/intermediate")
    ? "git used to道場 中級"
    : currentPath("/quiz/lesson/advanced")
    ? "git used to道場 上級"
    : ""

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
          searchQuiztitle, setSearchQuiztitle,
          searchQuizIntroduction, setSearchQuizIntroduction,
          quizzes, setQuizzes,
          quizzesForSearch, setQuizzesForSearch,
          quizBookmarks, setQuizBookmarks,
          quizCommentHistory, setQuizCommentHistory,
          quizComment, setQuizComment,
          quizTags, setQuizTags
        }}>
        <div className={classes.title}>
          {quizListTitle}
        </div>
        <motion.div
          className={classes.list}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.5,
            delay: 1.2,
            ease: [0, 0.71, 0.2, 1.01]
          }}
        >
          <div className={classes.searchForm}>
            <QuizSearchForm />
          </div>
          <div className={classes.quizList}>
            <QuizList />
          </div>
        </motion.div>
      </QuizBookmarkContext.Provider>
    </>
  )
}

export default QuizListPage
