import { Button } from "@material-ui/core";
import { useContext } from "react"
import { QuizBookmarkContext } from "./QuizListPage";

const QuizBookmarkOrderButton :React.FC = () => {
  const {
    quizzes, setQuizzes,
    quizBookmarks
  } = useContext(QuizBookmarkContext)

  const handleSortByNumberOfBookmarksSubmit = () => {
    const bookmarksCount = (quizId :string) => quizBookmarks.filter(bookmark => bookmark.quizId === quizId).length
    const sortByNumberOfBookmarks = quizzes.sort((a, b) => ((bookmarksCount(a.id) > (bookmarksCount(b.id)) ? -1 : 1)))

    setQuizzes(quizzes.filter(quiz => !quiz.id))

    sortByNumberOfBookmarks
      .filter(sortByNumberOfBookmark => sortByNumberOfBookmark.id)
      .map(sortByNumberOfBookmark =>
      setQuizzes(quizzes => [...quizzes,{
        id: sortByNumberOfBookmark.id,
        userId: sortByNumberOfBookmark.userId,
        parentUserName: sortByNumberOfBookmark.parentUserName,
        parentUserImage: {
          url: sortByNumberOfBookmark.parentUserImage.url
        },
        parentUserNickname: sortByNumberOfBookmark.parentUserNickname,
        quizTitle: sortByNumberOfBookmark.quizTitle,
        quizIntroduction: sortByNumberOfBookmark.quizIntroduction,
        createdAt: sortByNumberOfBookmark.createdAt
      }])
    )
  }

  return(
    <Button
      type="submit"
      variant="contained"
      size="large"
      color="default"
      onClick={e => handleSortByNumberOfBookmarksSubmit()}
      >
      ブックマーク数順
    </Button>
  )
}

export default QuizBookmarkOrderButton