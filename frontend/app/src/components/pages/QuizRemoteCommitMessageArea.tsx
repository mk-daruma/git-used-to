import { Box, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useContext } from "react"
import { QuizContext } from "./CreateQuiz"
import GitHubIcon from '@material-ui/icons/GitHub';
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

const QuizRemoteCoimmitMessageArea :React.FC = () => {
  const classes = useStyles()
  const { remoteCommitMessages, currentBranch } = useContext(QuizContext)

  return(
    <div className={classes.area}>
      <div>
        <h4 className={classes.title}>
          <GitHubIcon className={classes.icon} />
          remote commit message
        </h4>
      </div>
      {remoteCommitMessages.filter((commitMessage) => commitMessage.remoteMessage && currentBranch.currentBranchName === commitMessage.parentRemoteBranch)
        .map((commitMessage, index) => (
          <div key={index} className={classes.form}>
            <SmsIcon className={classes.icon} />
            <div className={classes.fileName}> message: { commitMessage.remoteMessage}</div>
          </div>
          ))}
    </div>
  )
}

export default QuizRemoteCoimmitMessageArea