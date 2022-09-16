import React, { useContext } from "react";

import { QuizContext } from "./CreateQuiz";

const QuizBranchArea: React.FC = () => {
  const { branches } = useContext(QuizContext)
  return (
    <>
    { branches.map((branch) => (
      <>
        {branch.branchName === "master" ? <>{ branch.branchName }</> : <>{ branch.branchName.substring(10) }</>}
        {/* {branch.worktreeFiles.fileName != ""  ? <>{ branch.worktreeFiles.fileName }ファイルを作成しました</> : <></>} */}
      </>
      ))}
    </>
  )
}

export default QuizBranchArea
