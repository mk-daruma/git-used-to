import { makeStyles } from "@material-ui/styles"
import { useContext } from "react"
import { QuizContext } from "./CreateQuiz"
import SmsIcon from '@material-ui/icons/Sms';

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

const QuizCommitMessageArea :React.FC = () => {
  const classes = useStyles()
  const { commitMessages, currentBranch } = useContext(QuizContext)

  return(
    <div className={classes.area}>
      <h4 className={classes.title}>
        <SmsIcon className={classes.icon} />
        commit message
      </h4>
      {commitMessages.filter((commitMessage) => commitMessage.message && currentBranch.currentBranchName === commitMessage.parentBranch)
        .map((commitMessage, index) => (
          <div key={index} className={classes.form}>
            <SmsIcon className={classes.icon} />
            <div className={classes.fileName}> message: { commitMessage.message}</div>
          </div>
          ))}
    </div>
  )
}

export default QuizCommitMessageArea