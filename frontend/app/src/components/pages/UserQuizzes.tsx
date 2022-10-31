import { Button, makeStyles, Theme } from "@material-ui/core";
import { AuthContext } from "App";
import { getUserQuizzes } from "lib/api/users"
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  }
}))

const UserQuizzes: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const classes = useStyles()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
    { userQuizzes.map((userQuiz) => (
      <>
        <p>{ userQuiz.id }</p>
        <p>{ userQuiz.quizTitle }</p>
        <p>{ userQuiz.quizIntroduction }</p>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/edit/${userQuiz.id}`}
        >
          編集
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/init/${userQuiz.id}`}
        >
          初期値を設定
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          className={classes.submitBtn}
          component={Link}
          to={`/quiz/init/edit/${userQuiz.id}`}
        >
          初期値を編集
        </Button>
      </>
      ))}
    </>
  )
}

export default UserQuizzes