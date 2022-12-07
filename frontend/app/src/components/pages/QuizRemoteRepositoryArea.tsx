import { makeStyles } from "@material-ui/styles"
import { useContext } from "react"
import { QuizContext } from "./CreateQuiz"
import GitHubIcon from '@material-ui/icons/GitHub';
import DescriptionIcon from '@material-ui/icons/Description';

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

const QuizRemoteRepositoryArea :React.FC = () => {
  const classes = useStyles()
  const { remoteRepositoryFiles, currentBranch } = useContext(QuizContext)

  return(
    <div className={classes.area}>
      <h4 className={classes.title}>
        <GitHubIcon className={classes.icon} />
        remote repository file
      </h4>
      {remoteRepositoryFiles.filter((repositoryFile) => repositoryFile.fileName && currentBranch.currentBranchName === repositoryFile.parentRemoteBranch)
        .map((repositoryFile, index) => (
          <div key={index} className={classes.form}>
            <DescriptionIcon className={classes.icon} />
            <div className={classes.fileName}>{ repositoryFile.fileName } : { repositoryFile.textStatus }</div>
          </div>
          ))}
    </div>
  )
}

export default QuizRemoteRepositoryArea