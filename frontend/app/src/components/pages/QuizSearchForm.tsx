import { IconButton, InputBase, makeStyles, Paper, Theme } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { AboutQuizzesData } from "interfaces";
import { useContext } from "react";
import { QuizBookmarkContext } from "./QuizList";
import QuizNewArrivalsOrderButton from "./QuizNewArrivalsOrderButton";
import QuizTagSearch from "./QuizTagSearchButton";

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

  const tagLists = [
    "add" ,
    "commit",
    "commit --amend",
    "push",
    "push -d",
    "branch",
    "branch -d",
    "branch -D",
    "branch -m",
    "checkout",
    "checkout -b",
    "touch",
    "rm",
    "rm --cashed",
    "reset",
    "reset --soft",
    "reset --mixed",
    "reset --hard"
  ];

  const searchQuizzes = (prop :string , text :string) => {
    setQuizzes(
      quizzesForSearch.filter((quiz :AboutQuizzesData) => quiz?.[prop].indexOf(text) != -1 )
    )
  }

  return(
    <>
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
              searchQuizzes("quizTitle", text)
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
            searchQuizzes("quizTitle", text)
          } }
          >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper
        component="form"
        className={classes.root}
        >
        <InputBase
          className={classes.input}
          placeholder="クイズ説明文検索"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={e =>{
            if (e.key === "Enter") {
              e.preventDefault()
              if(text === "") return
              setText("")
              searchQuizzes("quizIntroduction", text)
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
            searchQuizzes("quizIntroduction", text)
          } }
          >
          <SearchIcon />
        </IconButton>
      </Paper>
      <QuizNewArrivalsOrderButton />
      {tagLists.map((tagList) =>
        <QuizTagSearch
          key={tagList}
          tagName={tagList}
          />
        )}
    </>
  )
}

export default QuizSearchForm