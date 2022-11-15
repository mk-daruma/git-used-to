import { IconButton, InputBase, makeStyles, Paper, Theme } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { AboutQuizzesData } from "interfaces";
import { useContext } from "react";
import QuizBookmarkOrderButton from "./QuizBookmarkOrderButton";
import { QuizBookmarkContext } from "./QuizList";
import QuizNewArrivalsOrderButton from "./QuizNewArrivalsOrderButton";
import QuizResetSearchStatusButton from "./QuizSearchResetButton";
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

  const quizInfoList = [
    {
      key: 1,
      placeholder: "クイズ名検索",
      quizProps: "quizTitle"
    },
    {
      key: 2,
      placeholder: "クイズ説明文検索",
      quizProps: "quizIntroduction"
    },
  ]

  const searchQuizzes = (prop :string , text :string) => {
    setQuizzes(
      quizzesForSearch.filter((quiz :AboutQuizzesData) => quiz?.[prop].indexOf(text) != -1 )
    )
  }

  return(
    <>
      {quizInfoList.map((quizInfo) =>
      <div key={quizInfo.key}>
        <Paper
          component="form"
          className={classes.root}
          >
          <InputBase
            className={classes.input}
            placeholder={quizInfo.placeholder}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyPress={e =>{
              if (e.key === "Enter") {
                e.preventDefault()
                if(text === "") return
                setText("")
                searchQuizzes(quizInfo.quizProps, text)
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
      </div>
      )}
      <QuizNewArrivalsOrderButton />
      <QuizBookmarkOrderButton />
      <QuizResetSearchStatusButton />
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