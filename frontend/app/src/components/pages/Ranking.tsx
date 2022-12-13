import { Link } from "react-router-dom"
import BookmarkIcon from '@material-ui/icons/BookmarkBorder';
import { motion } from "framer-motion"
import { Button, makeStyles, Theme } from "@material-ui/core";
import AvatarImage from "components/layouts/Avatar";

const useStyles = makeStyles((theme: Theme) => ({
  rankinQuiz: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    color: "black",
    borderRadius: "2rem",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(1),
    maxWidth: 800,
    minWidth: 1,
    width: "100%"
  },
  userBtn: {
    width: "100%",
  },
  userName: {
    paddingLeft: theme.spacing(1)
  },
  quizTitle: {
    fontWeight: "bold"
  },
  quizLeftPosition: {
    display: "flex",
    width: "25%",
    flexFlow: "column",
    alignItems: "center"
  },
  quizRightPosition: {
    display: "flex",
    width: "20%",
    alignItems: "center"
  },
  quizCenterPosition: {
    maxWidth: 300,
    minWidth: 1,
    width: "50%",
    height: "20%",
    fontWeight: "bold",
    wordBreak: "break-all"
  },
  bookmarkCount: {
    display: "flex",
    alignItems: "center"
  }
}))

const Ranking :React.FC<{ index: number, bookmarkCount: number, userId: number, image: string, userTitle: string, userName: string, introduction: string, quizTitle?: string, link: string, btnTitle: string }> = ({index, bookmarkCount, userId, image, userTitle, userName, introduction, quizTitle, link, btnTitle}) => {
  const classes = useStyles()

  return(
    <motion.div
      className={classes.rankinQuiz}
      key={index}
      whileHover={{ scale: 1.1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
      >
      <div className={classes.bookmarkCount}>
        <BookmarkIcon/>
        {bookmarkCount}
      </div>
      <div className={classes.quizLeftPosition}>
        <Button
          className={classes.userBtn}
          component={Link}
          to={`/user/${userId}/edit`}
          color="inherit"
          >
          <AvatarImage
            image={image}
            rank={userTitle}
            />
          <div className={classes.userName}>{userName}</div>
        </Button>
        <div className={classes.quizTitle}>
          {quizTitle}
        </div>
      </div>
      <div className={classes.quizCenterPosition}>
        {introduction}
      </div>
      <div className={classes.quizRightPosition}>
        <Button
          type="submit"
          variant="contained"
          color="default"
          component={Link}
          to={link}
          >
          {btnTitle}
        </Button>
      </div>
    </motion.div>
  )
}

export default Ranking