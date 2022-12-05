import { makeStyles } from "@material-ui/styles"
import { useContext } from "react"
import { QuizContext } from "./CreateQuiz"

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
  },
  fileName: {
    paddingRight: "1rem"
  },
  area: {
    display: "flex",
    flexFlow: "column",
  },
}))

const QuizIndexArea :React.FC = () => {
  const classes = useStyles()
  const { indexFiles, currentBranch } = useContext(QuizContext)

  return(
    <div className={classes.area}>
      <h4>インデックスエリア</h4>
      {indexFiles.filter((indexFile) => indexFile.fileName && currentBranch.currentBranchName === indexFile.parentBranch)
        .map((indexFile, index) => (
          <div key={index} className={classes.form}>
            <h4 className={classes.fileName}>{ indexFile.fileName }</h4>
            <h4>{ indexFile.textStatus }</h4>
          </div>
          ))}
    </div>
  )
}

export default QuizIndexArea