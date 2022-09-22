import { AuthContext } from "App";
import { getUserQuizzes } from "lib/api/users"
import React, { useContext, useState, useEffect } from "react";

const UserQuizzes: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const [userQuizzes, setUserQuizzes] = useState([{
    id: "",
    quizTitle: "",
    quizIntroduction: ""
  }])

  const handleGetUserQuizzes = async () => {
    try {
      const res = await getUserQuizzes(currentUser?.id)
      console.log(res)
      if (res?.status === 200) {
          setUserQuizzes(res?.data.data)
      } else {
        console.log("No likes")
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetUserQuizzes()
  }, [])

  return (
    <>
    { userQuizzes.map((userQuiz) => (
      <>
        <p>{ userQuiz.id }</p>
        <p>{ userQuiz.quizTitle }</p>
        <p>{ userQuiz.quizIntroduction }</p>
      </>
      ))}
    </>
  )
}

export default UserQuizzes