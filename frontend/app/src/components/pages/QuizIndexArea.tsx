import { makeStyles } from "@material-ui/styles"
import { useContext } from "react"
import { QuizContext } from "./CreateQuiz"
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

const QuizIndexArea :React.FC = () => {
  const classes = useStyles()
  const { indexFiles, currentBranch } = useContext(QuizContext)
  const currentBranchIndexFiles = indexFiles.filter((indexFile) => indexFile.fileName && currentBranch.currentBranchName === indexFile.parentBranch)

  return(
    <div className={classes.area}>
      <h4 className={classes.title}>
        <DescriptionIcon className={classes.icon} />
        staging area (index)
      </h4>
      {currentBranchIndexFiles.map((indexFile, index) => (
          <div key={index} className={classes.form}>
            <DescriptionIcon className={classes.icon} />
            <div className={classes.fileName}>
              { indexFile.fileName } : { indexFile.textStatus }
            </div>
          </div>
          ))}
    </div>
  )
}

export default QuizIndexArea