import React, { useContext } from "react";

import { QuizContext } from "./CreateQuiz";

const QuizBranchArea: React.FC = () => {
  const { branches } = useContext(QuizContext)
  return (
    <>
    { branches.map((branch) => (
      <>
        {branch.text === "master" ? <>{ branch.text }</> : <>{ branch.text.substring(10) }</>}
      </>
      ))}
    </>
  )
}

export default QuizBranchArea
