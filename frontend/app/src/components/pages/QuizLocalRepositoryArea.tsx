import { makeStyles } from "@material-ui/styles"
import { useContext } from "react"
import { QuizContext } from "./CreateQuiz"
import StorageIcon from '@material-ui/icons/Storage';

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    paddingLeft: "3rem",
  },
  fileName: {
    paddingRight: "1rem"
  },
  area: {
    display: "flex",
    flexFlow: "column",
  },
  title: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2rem",
    paddingBottom: "1.5rem",
    borderBottom: "solid",
  },
  icon: {
    marginRight: "1rem"
  }
}))

const QuizLocalRepositoryArea :React.FC = () => {
  const classes = useStyles()
  const { repositoryFiles, currentBranch } = useContext(QuizContext)

  return(
    <div className={classes.area}>
      <h4 className={classes.title}>
        <StorageIcon className={classes.icon} />
        local repository
      </h4>
      {repositoryFiles.filter((repositoryFile) => repositoryFile.fileName && currentBranch.currentBranchName === repositoryFile.parentBranch)
        .map((repositoryFile, index) => (
          <div key={index} className={classes.form}>
            <StorageIcon className={classes.icon} />
            <div className={classes.fileName}>
            { repositoryFile.fileName } : { repositoryFile.textStatus }
            </div>
          </div>
          ))}
    </div>
  )
}

export default QuizLocalRepositoryArea