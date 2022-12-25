import React, { useContext, useState } from "react"
import { motion } from "framer-motion"
import { makeStyles, Theme } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { guestSignIn } from "lib/api/auth"
import Cookies from "js-cookie"
import { AuthContext } from "App"
import { isMobile } from "react-device-detect"

const useStyles = makeStyles((theme: Theme) => ({
  font: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(3),
    fontSize: "7rem",
    overflowWrap: "break-word",
    fontWeight: "bold"
  },
  btn: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  box: {
    marginTop: theme.spacing(6),
    width: "10rem",
    height: "8rem",
    borderRadius: "10rem",
    backgroundColor: "white",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    height: "8rem",
    fontWeight: "bold",
    color: "black",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mobileLimitText: {
    textAlign: "center"
  }
}))

const Top: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext)

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const handleGuestSubmit = async () => {

    try {
      const res = await guestSignIn()
      console.log(res)

      if (res.status === 200) {
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        history.push("/home")

        console.log("Signed in successfully!")
      } else {
        setAlertMessageOpen(true)
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
      >
        <motion.div
          className={classes.font}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          GIT USED TO
        </motion.div>
      </motion.div>
      {!isMobile ? (
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
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onTap={e => {history.push("/signin")}}
            >
            <div className={classes.text}>sign in</div>
          </motion.div>
          <motion.div
            className={classes.box}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onTap={e => {history.push("/signup")}}
            >
          <div className={classes.text}>sign up</div>
          </motion.div>
          <motion.div
            className={classes.box}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onTap={handleGuestSubmit}
            >
              <div className={classes.text}>ゲストログイン</div>
          </motion.div>
        </motion.div>
        ) : (
          <motion.div
            className={classes.mobileLimitText}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.5,
              delay: 1.2,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            >
            モバイルではgit used toは使用できません。
          </motion.div>
        )
        }
    </>
  )
}

export default Top
