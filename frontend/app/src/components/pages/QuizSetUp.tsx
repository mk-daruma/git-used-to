import { useParams } from "react-router-dom"
import QuizTag from "./QuizTag"

const QuizSetUp: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  return(
    <QuizTag
      quizId={Number(id)}
      />
  )
}

export default QuizSetUp