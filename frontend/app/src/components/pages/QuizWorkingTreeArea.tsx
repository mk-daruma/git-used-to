import { Box, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { useContext } from "react"
import { QuizContext } from "./CreateQuiz"
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

const useStyles = makeStyles(() => ({
  form: {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem",
    paddingLeft: "3rem",
  },
  selectForm: {
    borderRadius: "0.5rem",
    backgroundColor: "white"
  },
  fileName: {
    paddingRight: "1rem",
    paddingLeft: "1rem"
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

const QuizWorktreeFiles :React.FC = () => {
  const classes = useStyles()
  const { worktreeFiles, setWorktreeFiles, currentBranch } = useContext(QuizContext)

  const handleChangeTextStatus = (fileName: string, changeTextStatus :string) => {
    setWorktreeFiles(
      worktreeFiles.map(worktreeFile =>
        worktreeFile.fileName === fileName
        && worktreeFile.parentBranch === currentBranch.currentBranchName
        ? {
          fileName: worktreeFile.fileName,
          parentBranch: worktreeFile.parentBranch,
          textStatus: changeTextStatus,
          parentBranchId: worktreeFile.parentBranchId,
          worktreeFileId: worktreeFile.worktreeFileId
          }
        : worktreeFile
      )
    )
  }


  return(
    <div className={classes.area}>
      <h4 className={classes.title}>
        <InsertDriveFileIcon className={classes.icon} />
        workingtree area
      </h4>
      {worktreeFiles.filter((worktreeFile) => worktreeFile.fileName && currentBranch.currentBranchName === worktreeFile.parentBranch)
        .map((worktreeFile, index) => (
          <Box key={index} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <div className={classes.form}>
                <InsertDriveFileIcon className={classes.icon} />
                <div className={classes.fileName}>{ worktreeFile.fileName }</div>
                <Select
                  className={classes.selectForm}
                  value={worktreeFile.textStatus}
                  label="text status"
                  onChange={e => {handleChangeTextStatus(worktreeFile.fileName, String(e.target.value))}}
                >
                  <MenuItem value={"おはよう"}>おはよう</MenuItem>
                  <MenuItem value={"こんにちは"}>こんにちは</MenuItem>
                  <MenuItem value={"おやすみ"}>おやすみ</MenuItem>
                </Select>
              </div>
            </FormControl>
          </Box>
          ))}
    </div>
  )
}

export default QuizWorktreeFiles