import { Button, makeStyles, Theme } from "@material-ui/core";
import { AboutQuizzesData } from "interfaces";
import { useContext } from "react"
import { QuizBookmarkContext } from "./QuizList";

const useStyles = makeStyles((theme: Theme) => ({
  btn: {
    textTransform: 'none',
  }
}))

const QuizTagSearch :React.FC<{ tagName :string }> = ({tagName}) => {
  const classes = useStyles()
  const {
    quizTags,
    quizzesForSearch,
    setQuizzes
  } = useContext(QuizBookmarkContext)


  const filetedQuizTags = quizTags.filter(quizTag => quizTag.tag === tagName )
  const tagSearch = () =>  {
    setQuizzes(
      quizzesForSearch.filter((quiz :AboutQuizzesData) =>
        filetedQuizTags.some(filetedQuizTag =>
          filetedQuizTag.quizId === Number(quiz.id)
          )
        )
    )
  }

  return (
    filetedQuizTags.length > 0
    ? <Button
        type="submit"
        variant="contained"
        size="large"
        color="default"
        onClick={e => tagSearch()}
        className={classes.btn}
        >
        {tagName + filetedQuizTags.length + "件" }
      </Button>
    : <Button
        type="submit"
        variant="contained"
        size="large"
        color="default"
        className={classes.btn}
        >
        {tagName + filetedQuizTags.length + "件" }
      </Button>
  )
}

export default QuizTagSearch