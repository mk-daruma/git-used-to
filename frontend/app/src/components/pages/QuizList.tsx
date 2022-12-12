import { Button, makeStyles, Theme } from "@material-ui/core";
import { AuthContext } from "App";
import AvatarImage from "components/layouts/Avatar";
import { getAllQuizzes } from "lib/api/quizzes";
import { getAllQuizBookmarks } from "lib/api/quiz_boolmarks";
import { getAllQuizComments } from "lib/api/quiz_comments";
import { getAllQuizTags } from "lib/api/quiz_tags";
import { getAllUsers, getUserQuizzes, getUserSelfBookmarked } from "lib/api/users"
import React, { useContext, useState, useEffect, createContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import QuizBookmarkButton from "./QuizBookmarkButton";
import QuizComment from "./QuizComment";
import QuizSearchForm from "./QuizSearchForm";
import ReccomendSignUpModal from "./RecommendSignUpModal";
import { motion } from "framer-motion"

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
  list: {
    display: "flex",
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
  const location = useLocation()
  const { id } = useParams<{ id: string }>()

  const { currentUser } = useContext(AuthContext)
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

  const handleGetUserQuizzes = async (userId :number) => {
    try {
      const resUserQuizzes = await getUserQuizzes(userId)
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
      const quizStates = [setQuizzes, setQuizzesForSearch]
      const resUsers = await getAllUsers()
      const resQuizzes = await getAllQuizzes()
      const resAllBookmarks = await getAllQuizBookmarks()
      const resQuizComments = await getAllQuizComments()
      const resAllTags = await getAllQuizTags()
      console.log(resQuizzes)
      if (resQuizzes?.status === 200) {
        resUsers?.data.data.forEach((resUser :any) =>
          resQuizzes.data.data
          .filter((resQuiz :any) => resQuiz.userId === resUser.id)
          .map((resQuiz :any) =>
          quizStates.map(quizState =>
            quizState(quizzes => [...quizzes,{
              id: resQuiz.id,
              userId: resUser.id,
              parentUserName: resUser.userName,
              parentUserImage: {
                  url: resUser.image.url
              },
              parentUserNickname: resUser.nickname,
              quizTitle: resQuiz.quizTitle,
              quizIntroduction: resQuiz.quizIntroduction,
              createdAt: resQuiz.createdAt,
            }])))
          )
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
      setQuizzes(resUserSelf?.data.selfBookmarkedQuizzes)
      setQuizzesForSearch(resUserSelf?.data.selfBookmarkedQuizzes)
      setQuizBookmarks(resUserSelf?.data.selfBookmarkedQuizBookmarks)
      setQuizCommentHistory(resUserSelf?.data.selfBookmarkedQuizCommnets)
      setQuizTags(resUserSelf?.data.selfBookmarkedQuizTags)
      console.log(resUserSelf)
    } else {
      console.log("No likes")
    }
  }

  const getBookmarkId = (quizId :string) =>
    quizBookmarks.some(bookmark => bookmark.quizId === quizId && Number(bookmark.userId) === currentUser?.id)
    ? quizBookmarks.filter(bookmark => bookmark.quizId === quizId && Number(bookmark.userId) === currentUser?.id)[0].id
    : undefined

  const currentPath = (path :string) => location.pathname === (path)

  useEffect(() => {
    currentPath(`/user/quiz/list`) && handleGetUserQuizzes(Number(currentUser?.id))
    currentPath(`/user/bookmark/list`) && handleGetSelfBookmarkedQuizzes(Number(currentUser?.id))
    currentPath(`/quiz/list`) && handleGetQuizzes()
    currentPath(`/user/${id}/quiz/list`) && handleGetUserQuizzes(Number(id))
    currentPath(`/user/${id}/quiz/bookmark/list`) && handleGetSelfBookmarkedQuizzes(Number(id))
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
          searchQuiztitle, setSearchQuiztitle,
          searchQuizIntroduction, setSearchQuizIntroduction,
          quizzes, setQuizzes,
          quizzesForSearch, setQuizzesForSearch,
          quizBookmarks, setQuizBookmarks,
          quizCommentHistory, setQuizCommentHistory,
          quizComment, setQuizComment,
          quizTags, setQuizTags
        }}>
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
                  <Button
                    type="submit"
                    variant="contained"
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
                    color="default"
                    className={classes.submitBtn}
                    component={Link}
                    to={`/quiz/answer/${quiz.id}`}
                  >
                    解答する
                  </Button>
                  {currentUser?.email === "guest_user@git-used-to.com"
                  ? <ReccomendSignUpModal />
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
            </div>
        </motion.div>
      </QuizBookmarkContext.Provider>
    </>
  )
}

export default QuizList
