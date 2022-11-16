import { Button } from "@material-ui/core";
import { useContext } from "react"
import { QuizBookmarkContext } from "./QuizList";

const QuizBookmarkOrderButton :React.FC = () => {
  const {
    quizzes, setQuizzes,
    quizBookmarks
  } = useContext(QuizBookmarkContext)

  const handleSortByNumberOfBookmarkssubmit = () => {
    const bookmarksCount = (quizId :string) => quizBookmarks.filter(bookmark => bookmark.quizId === quizId).length
    const newArrivalsOrderQuizzes = quizzes.sort((a, b) => ((bookmarksCount(a.id) > (bookmarksCount(b.id)) ? -1 : 1)))

    setQuizzes(quizzes.filter(quiz => !quiz.id))
    newArrivalsOrderQuizzes.map(newArrivalsOrderQuiz =>
      setQuizzes(quizzes => [...quizzes,{
        id: newArrivalsOrderQuiz.id,
        userId: newArrivalsOrderQuiz.userId,
        parentUserName: newArrivalsOrderQuiz.parentUserName,
        parentUserImage: {
          url: newArrivalsOrderQuiz.parentUserImage.url
        },
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
      onClick={e => handleSortByNumberOfBookmarkssubmit()}
      >
      ブックマーク数順
    </Button>
  )
}

export default QuizBookmarkOrderButton