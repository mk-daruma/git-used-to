import { IconButton, InputBase, makeStyles, Paper, Theme } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import { useContext } from "react";
import QuizBookmarkOrderButton from "./QuizBookmarkOrderButton";
import { QuizBookmarkContext } from "./QuizList";
import QuizNewArrivalsOrderButton from "./QuizNewArrivalsOrderButton";
import QuizResetSearchStatusButton from "./QuizSearchResetButton";
import QuizTagSearch from "./QuizTagSearchButton";
import { motion } from "framer-motion"

const useStyles = makeStyles((theme: Theme) => ({
  searchForm: {
    display: "flex",
    flexFlow: "column",
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
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
    searchQuiztitle, setSearchQuiztitle,
    searchQuizIntroduction, setSearchQuizIntroduction,
    setQuizzes,
    quizzesForSearch
  } = useContext(QuizBookmarkContext)

  const quizInfoList = [
    {
      key: 1,
      placeholder: "クイズ名検索",
      quizProps: "quizTitle",
      searchState: searchQuiztitle,
      searchSetState: setSearchQuiztitle
    },
    {
      key: 2,
      placeholder: "クイズ説明文検索",
      quizProps: "quizIntroduction",
      searchState: searchQuizIntroduction,
      searchSetState: setSearchQuizIntroduction
    },
  ]

  const searchButtonList = [
    <QuizNewArrivalsOrderButton />,
    <QuizBookmarkOrderButton />,
    <QuizResetSearchStatusButton />,
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

  const searchQuizzes = (prop :string, text :string) => {
    setQuizzes(
      quizzesForSearch.filter((quiz :any) => quiz?.[prop].indexOf(text) != -1 )
    )
  }

  return(
    <div className={classes.searchForm}>
    {quizInfoList.map((quizInfo) =>
      <div key={quizInfo.key}>
        <Paper
          component="form"
          className={classes.root}
          >
          <InputBase
            className={classes.input}
            placeholder={quizInfo.placeholder}
            value={quizInfo.searchState}
            onChange={(event) => quizInfo.searchSetState(event.target.value)}
            onKeyPress={e =>{
              if (e.key === "Enter") {
                e.preventDefault()
                if(quizInfo.searchState === "") return
                quizInfo.searchSetState("")
                searchQuizzes(quizInfo.quizProps, quizInfo.searchState)
              }
            }}
            />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
            onClick={e =>{
              e.preventDefault()
              if(quizInfo.searchState === "") return
              searchQuizzes(quizInfo.quizProps, quizInfo.searchState)
            } }
            >
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      )}
      {searchButtonList.map((searchButton, index) =>
        <motion.div
          className={classes.searchForm}
          whileHover={{ scale: 1.1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 10
          }}
          variants={{
            offscreen: {
              y: 100,
              opacity: 0,
            },
            onscreen: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
              },
            },
          }}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: false, amount: 0 }}
          >
          {typeof searchButton === "string"
            ? <QuizTagSearch
                key={index}
                tagName={searchButton}
                />
            : searchButton
          }
        </motion.div>
        )}
    </div>
  )
}

export default QuizSearchForm