import { makeStyles, Theme } from "@material-ui/core"
import { getWeeklyRankingQuizzes } from "lib/api/quizzes"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Ranking from "./Ranking"
import { QuizWeeklyRankingData } from "interfaces"

const useStyles = makeStyles((theme: Theme) => ({
  weeklyRankingTitle: {
    fontSize: "3rem"
  },
  fullPage: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  rankingList: {
    padding: theme.spacing(7),
    height: "50rem",
    overflow: 'scroll',
  },
  noQuiz: {
    fontSize: "2rem"
  }
}))

const QuizWeeklyRanking :React.FC = () => {
  const classes = useStyles()
  const [rankingQuizzes, setRankingQuizzes] = useState([{
    id: 0,
    userId: 0,
    userName: "",
    userImage: "",
    userTitle: "",
    quizTitle: "",
    quizIntroduction: "",
    bookmarkCount: 0
  }])

  const handleGetWeeklyRankingData = async() => {
    const weeklyRankingQuizzesRes = await getWeeklyRankingQuizzes()
    weeklyRankingQuizzesRes?.data.rankInQuizData.forEach((quiz: QuizWeeklyRankingData) =>
      setRankingQuizzes(quizzes => [...quizzes,{
        id: quiz.rankInQuizData.id,
        userId: quiz.rankInQuizData.userId,
        userName: quiz.createUserName,
        userImage: quiz.createUserImage,
        userTitle: quiz.createUserTitle,
        quizTitle: quiz.rankInQuizData.quizTitle,
        quizIntroduction: quiz.rankInQuizData.quizIntroduction,
        bookmarkCount: quiz.bookmarkCount
      }]))
  }

  const checkRankinQuizzes = rankingQuizzes.filter(quiz => quiz.id)

  useEffect(() => {
    handleGetWeeklyRankingData()
  },[])

  useEffect(() => {
    console.log("rankingQuizzes", rankingQuizzes)
  },[rankingQuizzes])

  return(
    <div className={classes.fullPage}>
      <div className={classes.weeklyRankingTitle}>
        週間ブックマーク数ランキング
      </div>
      <div>
      <motion.div
        className={classes.rankingList}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 1.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        >
        {checkRankinQuizzes.length > 0
        ? checkRankinQuizzes.map((quiz, index) =>
          <Ranking
            index={index}
            bookmarkCount={quiz.bookmarkCount}
            userId={quiz.userId}
            image={quiz.userImage}
            userTitle={quiz.userTitle}
            userName={quiz.userName}
            introduction={quiz.quizIntroduction}
            quizTitle={quiz.quizTitle}
            link={`/quiz/answer/${quiz.id}`}
            btnTitle={"解答する"}
          />
          )
        : <div className={classes.noQuiz}>
            ランクインしているクイズはありません。
          </div>
        }
      </motion.div>
      </div>
    </div>
  )
}

export default QuizWeeklyRanking