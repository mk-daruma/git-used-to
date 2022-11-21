import { getWeeklyRankingQuizzes } from "lib/api/quizzes"
import { useEffect, useState } from "react"

const QuizWeeklyRanking :React.FC = () => {
  const [rankingQuizzes, setRankingQuizzes] = useState([{
    id: 0,
    userId: 0,
    userName: "",
    userImage: "",
    quizTitle: "",
    quizIntroduction: "",
    bookmarkCount: 0
  }])

  const handleGetWeeklyRankingData = async() => {
    const weeklyRankingQuizzesRes = await getWeeklyRankingQuizzes()
    weeklyRankingQuizzesRes?.data.rankInQuizData.forEach((quiz :any) =>
      setRankingQuizzes(quizzes => [...quizzes,{
        id: quiz.rankInQuizData.id,
        userId: quiz.rankInQuizData.userId,
        userName: quiz.createUserName,
        userImage: quiz.createUserImage,
        quizTitle: quiz.rankInQuizData.quizTitle,
        quizIntroduction: quiz.rankInQuizData.quizIntroduction,
        bookmarkCount: quiz.bookmarkCount
      }]))
  }

  useEffect(() => {
    handleGetWeeklyRankingData()
  },[])

  useEffect(() => {
    console.log("rankingQuizzes", rankingQuizzes)
  },[rankingQuizzes])

  return(
    <>
      {rankingQuizzes.map((quiz, index) =>
        <p key={index}>{quiz.quizTitle}</p>
        )}
    </>
  )
}

export default QuizWeeklyRanking