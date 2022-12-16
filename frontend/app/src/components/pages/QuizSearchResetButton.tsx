import { Button } from "@material-ui/core";
import { useContext } from "react"
import { QuizBookmarkContext } from "./QuizListPage";

const QuizResetSearchStatusButton :React.FC = () => {
  const {
    quizzes, setQuizzes,
    quizzesForSearch
  } = useContext(QuizBookmarkContext)

  const handleResetSearchStatusSubmit = () => {
    const resetSearchStatusQuizzes = quizzesForSearch.sort((a, b) => (a.id < b.id ? -1 : 1))

    setQuizzes(quizzes.filter(quiz => !quiz.id))
    resetSearchStatusQuizzes.map(resetSearchStatusQuiz =>
      setQuizzes(quizzes => [...quizzes,{
        id: resetSearchStatusQuiz.id,
        userId: resetSearchStatusQuiz.userId,
        parentUserName: resetSearchStatusQuiz.parentUserName,
        parentUserImage: {
          url: resetSearchStatusQuiz.parentUserImage.url
        },
        parentUserNickname: resetSearchStatusQuiz.parentUserNickname,
        quizTitle: resetSearchStatusQuiz.quizTitle,
        quizIntroduction: resetSearchStatusQuiz.quizIntroduction,
        createdAt: resetSearchStatusQuiz.createdAt
      }])
    )
  }

  return(
    <Button
      type="submit"
      variant="contained"
      size="large"
      color="default"
      onClick={e => handleResetSearchStatusSubmit()}
    >
      reset
    </Button>
  )
}

export default QuizResetSearchStatusButton