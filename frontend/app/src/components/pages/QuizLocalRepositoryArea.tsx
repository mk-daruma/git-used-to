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

const QuizLocalRepositoryArea :React.FC = () => {
  const classes = useStyles()
  const { repositoryFiles, currentBranch } = useContext(QuizContext)

  return(
    <div className={classes.area}>
      <h4>repository file</h4>
      {repositoryFiles.filter((repositoryFile) => repositoryFile.fileName && currentBranch.currentBranchName === repositoryFile.parentBranch)
        .map((repositoryFile, index) => (
          <div key={index} className={classes.form}>
            <h4 className={classes.fileName}>{ repositoryFile.fileName }</h4>
            <h4>{ repositoryFile.textStatus }</h4>
          </div>
          ))}
    </div>
  )
}

export default QuizLocalRepositoryArea