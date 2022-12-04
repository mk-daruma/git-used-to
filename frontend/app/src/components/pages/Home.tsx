import React, { useContext } from "react"
import { motion } from "framer-motion"

import { AuthContext } from "App"
import { makeStyles, Theme } from "@material-ui/core"
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme: Theme) => ({
  font: {
    fontSize: "6rem",
    fontWeight: "bold"
  },
  btn: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(6),
  },
  box: {
    marginTop: theme.spacing(4),
    width: "20rem",
    height: "25rem",
    borderRadius: "2rem",
    backgroundColor: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center"
  },
  text: {
    height: "25rem",
    fontWeight: "bold",
    color: "black",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { isSignedIn, currentUser } = useContext(AuthContext)

  return (
    <>
      {
        isSignedIn && currentUser
        ? (
          <>
            <div className={classes.font}>
              ようこそ{currentUser?.userName}さん
            </div>
            <motion.div
              className={classes.btn}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.5,
                delay: 1.2,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <motion.div
                className={classes.box}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onTap={e => {history.push("/quiz/list")}}
              >
                <div className={classes.text}>クイズ一覧</div>
              </motion.div>
              <motion.div
                className={classes.box}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onTap={e => {history.push("/quiz")}}
              >
                <div className={classes.text}>クイズ作成</div>
              </motion.div>
              <motion.div
                className={classes.box}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onTap={e => {history.push("/quiz/ranking/weekly")}}
              >
                <div className={classes.text}>週間ランキング</div>
              </motion.div>
            </motion.div>
            <motion.div
              className={classes.btn}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1.5,
                delay: 1.2,
                ease: [0, 0.71, 0.2, 1.01]
              }}
            >
              <motion.div
                className={classes.box}
                whileTap={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onTap={e => {history.push(`/user/${currentUser?.id}/edit`)}}
              >
                <div className={classes.text}>プロフィール編集</div>
              </motion.div>
              <motion.div
                className={classes.box}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onTap={e => {history.push("/home")}} //これは変更予定
              >
                <div className={classes.text}>道場</div>
              </motion.div>
              <motion.div
                className={classes.box}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onTap={e => {history.push("/user/ranking")}}
              >
                <div className={classes.text}>userランキング</div>
              </motion.div>
            </motion.div>
          </>
        )
        : (
          <h1>Not signed in</h1>
        )
      }
    </>
  )
}

export default Home
