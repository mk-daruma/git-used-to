import { Button, Card, CardHeader, makeStyles, Theme } from "@material-ui/core"
import { Link, useParams } from "react-router-dom"
import QuizTag from "./QuizTag"
import { motion } from "framer-motion"

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    padding: theme.spacing(3),
    margin: theme.spacing(6),
    maxWidth: 400,
    borderRadius: "2rem",
  },
  header: {
    textAlign: "center"
  },
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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      >
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Quiz Tag" />
        <QuizTag
          quizId={Number(id)}
          />
        <div>
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
            to="/home"
            >
            Home
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default QuizSetUp