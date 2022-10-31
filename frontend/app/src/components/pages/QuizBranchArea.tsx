import React, { useContext } from "react";

import { QuizContext } from "./CreateQuiz";

const QuizBranchArea: React.FC = () => {
  const { branches } = useContext(QuizContext)
  return (
    <>
    { branches.map((branch) => (
      <>
        { branch.branchName }
      </>
      ))}
    </>
  )
}

export default QuizBranchArea
