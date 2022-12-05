import { Box, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
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

const QuizCommitMessageArea :React.FC = () => {
  const classes = useStyles()
  const { commitMessages, currentBranch } = useContext(QuizContext)

  return(
    <div className={classes.area}>
      <h4>commit message</h4>
      {commitMessages.filter((commitMessage) => commitMessage.message && currentBranch.currentBranchName === commitMessage.parentBranch)
        .map((commitMessage, index) => (
          <div key={index} className={classes.form}>
            <h4 className={classes.fileName}>{ commitMessage.message}</h4>
          </div>
          ))}
    </div>
  )
}

export default QuizCommitMessageArea