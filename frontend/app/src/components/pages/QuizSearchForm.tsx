import { IconButton, InputBase, makeStyles, Paper, Theme } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useContext } from "react";
import { QuizBookmarkContext } from "./QuizList";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  }
}))

const QuizSearchForm :React.FC = () => {
  const classes = useStyles()
  const {
    text, setText,
    setQuizzes,
    quizzesForSearch
  } = useContext(QuizBookmarkContext)

  const searchQuizzes = (text :string) => {
    setQuizzes(
      quizzesForSearch.filter(quiz => quiz.quizTitle.indexOf(text) != -1 )
    )
  }

  return(
    <Paper
      component="form"
      className={classes.root}
      >
          <InputBase
              className={classes.input}
              placeholder="クイズ名検索"
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={e =>{
                if (e.key === "Enter") {
                  e.preventDefault()
                  if(text === "") return
                  setText("")
                  searchQuizzes(text)
                }
              }}
            />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={e =>{
              e.preventDefault()
              if(text === "") return
              searchQuizzes(text)
            } }
            >
            <SearchIcon />
          </IconButton>
        </Paper>
  )
}

export default QuizSearchForm