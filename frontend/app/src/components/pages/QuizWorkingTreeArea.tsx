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
      <h4>ワーキングエリア</h4>
      {worktreeFiles.filter((worktreeFile) => worktreeFile.fileName && currentBranch.currentBranchName === worktreeFile.parentBranch)
        .map((worktreeFile, index) => (
          <Box key={index} sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <div className={classes.form}>
                <h4 className={classes.fileName}>{ worktreeFile.fileName }</h4>
                <Select
                  value={worktreeFile.textStatus}
                  label="text status"
                  onChange={e => {handleChangeTextStatus(worktreeFile.fileName, String(e.target.value))}}
                >
                  <MenuItem value={"こんにちは"}>こんにちは</MenuItem>
                  <MenuItem value={"こんばんわ"}>こんばんわ</MenuItem>
                  <MenuItem value={"おはようございます"}>おはようございます</MenuItem>
                </Select>
              </div>
            </FormControl>
          </Box>
          ))}
    </div>
  )
}

export default QuizWorktreeFiles