import { Button, makeStyles, Theme } from "@material-ui/core"
import { Link, useParams } from "react-router-dom"
import QuizTag from "./QuizTag"

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  }
}))

const QuizSetUp: React.FC = () => {
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()

  return(
    <>
      <QuizTag
        quizId={Number(id)}
        />
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        color="default"
        className={classes.submitBtn}
        component={Link}
        to={`/quiz/edit/${id}`}
      >
        もう一度編集する
      </Button>
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        color="default"
        className={classes.submitBtn}
        component={Link}
        to={`/quiz/init/edit/${id}`}
      >
        初期値を編集
      </Button>
      <Button
        variant="contained"
        fullWidth
        size="large"
        color="default"
        className={classes.submitBtn}
        component={Link}
        to="/"
        >
        Home
        </Button>
    </>
  )
}

export default QuizSetUp