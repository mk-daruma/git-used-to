import { Button } from "@material-ui/core";
import { useContext } from "react"
import { QuizBookmarkContext } from "./QuizListPage";

const QuizNewArrivalsOrderButton :React.FC = () => {
  const {
    quizzes, setQuizzes,
  } = useContext(QuizBookmarkContext)

  const handleSortByDateQuizzessubmit = () => {
    const newArrivalsOrderQuizzes = quizzes.sort((a, b) => ((a.createdAt > b.createdAt) ? -1 : 1))
    setQuizzes(quizzes.filter(quiz => !quiz.id))
    newArrivalsOrderQuizzes
    .filter(newArrivalsOrderQuiz => newArrivalsOrderQuiz.id)
    .map(newArrivalsOrderQuiz =>
      setQuizzes(quizzes => [...quizzes,{
        id: newArrivalsOrderQuiz.id,
        userId: newArrivalsOrderQuiz.userId,
        parentUserName: newArrivalsOrderQuiz.parentUserName,
        parentUserImage: {
          url: newArrivalsOrderQuiz.parentUserImage.url
        },
        parentUserNickname: newArrivalsOrderQuiz.parentUserNickname,
        quizTitle: newArrivalsOrderQuiz.quizTitle,
        quizIntroduction: newArrivalsOrderQuiz.quizIntroduction,
        createdAt: newArrivalsOrderQuiz.createdAt
      }])
    )
  }

  return(
    <Button
      type="submit"
      variant="contained"
      size="large"
      color="default"
      onClick={e => handleSortByDateQuizzessubmit()}
      >
      新着順
    </Button>
  )
}

export default QuizNewArrivalsOrderButton