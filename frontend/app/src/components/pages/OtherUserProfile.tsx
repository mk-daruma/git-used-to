import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { Avatar, Card } from "@material-ui/core"
import { motion } from "framer-motion"

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import UserChart from "./UserChart";
import { UserProfileContext } from "./UserProfile";
import ReccomendSignUpModal from "./RecommendSignUpModal";
import { AuthContext } from "App";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginBottom: theme.spacing(2),
        maxWidth: 800,
        width: "100%",
      }
    },
    box: {
      margin: "1.5rem"
    },
    imageUploadBtn: {
      textAlign: "right"
    },
    image: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    imageAndUserTitle: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      marginBottom: "1.5rem"
    },
    card: {
      padding: theme.spacing(3),
      margin: theme.spacing(6),
      maxWidth: 1600,
      borderRadius: "2rem",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center"
    },
    btn: {
      marginBottom: "1.5rem"
    },
    btns: {
      display: "flex",
      flexFlow: "column",
    },
    chart: {
      paddingLeft: "1.5rem"
    },
    titleFont: {
      fontSize: "100%"
    }
  })
);

const OtherUserProfile: React.FC = () => {
  const { currentUser } = useContext(AuthContext)
  const { userProfile } = useContext(UserProfileContext)
  const classes = useStyles();

  const checkGuestUser = userProfile.userEmail === "guest_user@git-used-to.com" && currentUser?.email === "guest_user@git-used-to.com"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease: [0, 0.71, 0.2, 1.01]
      }}
      >
      <Card className={classes.card}>
        <form className={classes.root} noValidate autoComplete="off">
          <div className={classes.imageAndUserTitle}>
            <div className={classes.imageUploadBtn}>
              <Avatar
                className={classes.image}
                src={userProfile.userImage.url}
                />
            </div>
            <div className={classes.titleFont}>
              【現在の称号】{userProfile.userNickname}
            </div>
          </div>
          <div>
            <TextField
              required
              multiline
              id="outlined-required"
              disabled={true}
              defaultValue={`${userProfile.userName}`}
              variant="outlined"
              />
            <TextField
              required
              multiline
              minRows="10"
              id="outlined-required"
              disabled={true}
              defaultValue={`${userProfile.userSelfIntroduction}`}
              variant="outlined"
              />
            </div>
          {checkGuestUser
          ? <ReccomendSignUpModal />
          : <div className={classes.btns}>
              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                size="large"
                color="default"
                component={Link}
                to={`/user/${userProfile.userId}/quiz/list`}
              >
                {userProfile.userName}が作成したクイズ一覧
              </Button>
              <Button
                className={classes.btn}
                type="submit"
                variant="contained"
                size="large"
                color="default"
                component={Link}
                to={`/user/${userProfile.userId}/quiz/bookmark/list`}
              >
                {userProfile.userName}がブックマークしたクイズ一覧
              </Button>
            </div>
            }
        </form>
        <div className={classes.chart}>
          <UserChart />
        </div>
      </Card>
    </motion.div>
  )
}

export default OtherUserProfile
