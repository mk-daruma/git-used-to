import { makeStyles, Theme } from "@material-ui/core"
import { getUserRanking } from "lib/api/users"
import { useEffect, useState } from "react"
import Ranking from "./Ranking"
import { motion } from "framer-motion"
import QuizHelpModal from "./QuizHelpModal";
import { UserRankingData } from "interfaces"

const useStyles = makeStyles((theme: Theme) => ({
  weeklyRankingTitle: {
    fontSize: "3rem",
    display: "flex"
  },
  fullPage: {
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
  },
  rankingList: {
    padding: theme.spacing(7),
    height: "50rem",
    overflow: 'scroll',
  },
  noQuiz: {
    fontSize: "2rem"
  },
  userRankingHelp: {
    paddingLeft: theme.spacing(2)
  }
}))

const UserRanking :React.FC = () => {
  const classes = useStyles()
  const [rankingUsers, setRankingUSers] = useState([{
    userId: 0,
    userName: "",
    userIntroduction: "",
    userTitle: "",
    userImage: "",
    bookmarkCount: 0
  }])

  const handleGetUserRankingData = async() => {
    const weeklyRankingQuizzesRes = await getUserRanking()
    weeklyRankingQuizzesRes?.data.userRanking.forEach((user :UserRankingData) =>
      setRankingUSers(users => [...users,{
        userId: user.createUserId,
        userName: user.createUserName,
        userIntroduction: user.createUserIntroduction,
        userTitle: user.createUserTitle,
        userImage: user.createUserImage,
        bookmarkCount: user.bookmarkCount
      }]))
  }

  useEffect(() => {
    handleGetUserRankingData()
  },[])

  useEffect(() => {
    console.log("rankingUsers", rankingUsers)
  },[rankingUsers])

  const checkRankinUsers = rankingUsers.filter(rankinUser => rankinUser.userId)

  return(
    <div className={classes.fullPage}>
      <div className={classes.weeklyRankingTitle}>
        USERランキング(ブックマーク数)
        <div className={classes.userRankingHelp}>
          <QuizHelpModal modalType="userRanking" />
        </div>
      </div>
      <div>
      <motion.div
        className={classes.rankingList}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 1.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        >
        {checkRankinUsers.length > 0
        ? checkRankinUsers.map((user, index) =>
          <Ranking
            index={index}
            bookmarkCount={user.bookmarkCount}
            userId={user.userId}
            image={user.userImage}
            userTitle={user.userTitle}
            userName={user.userName}
            introduction={user.userIntroduction}
            quizTitle={undefined}
            link={`/user/${user.userId}/edit`}
            btnTitle={"profile"}
          />
          )
        : <div className={classes.noQuiz}>
            ランクインしているクイズはありません。
          </div>
        }
      </motion.div>
      </div>
    </div>
  )
}

export default UserRanking