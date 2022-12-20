import { makeStyles } from "@material-ui/core";
import React, { useContext } from "react";

import { QuizContext } from "./CreateQuiz";

const useStyles = makeStyles(() => ({
  branchList: {
    display: "flex"
  },
  currentBranch: {
    paddingLeft: "2rem",
  },
  notCurrentBranch: {
    paddingLeft: "1rem",
    color: "#696969"
  }
}))

const QuizBranchArea: React.FC = () => {
  const classes = useStyles()
  const { branches, currentBranch } = useContext(QuizContext)

  const exceptingCurrentBranches = branches.filter(branch => branch.branchName && branch.branchName !== currentBranch.currentBranchName)

  return (
    <div className={classes.branchList}>
      <h3 className={classes.currentBranch}>
        current branch : {currentBranch.currentBranchName}
      </h3>
      {exceptingCurrentBranches.map((branch) => (
        <h3 className={classes.notCurrentBranch}>
          { branch.branchName }
        </h3>
      ))}
    </div>
  )
}

export default QuizBranchArea
