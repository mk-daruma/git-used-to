import { Button, makeStyles, Modal } from "@material-ui/core"
import { AuthContext } from "App";
import Cookies from "js-cookie";
import { signOut } from "lib/api/auth";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  }
}));

const ReccomendSignUpModal :React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { setIsSignedIn } = useContext(AuthContext)
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        history.push("/signup")

        console.log("Succeeded in sign out")
      } else {
        console.log("Failed in sign out")
      }
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <>
      <Button
        onClick={handleOpen}
        className={classes.submitBtn}
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        color="default"
        >
        ゲストログイン中はここまで
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">遊んでくれてありがとう！</h2>
          <p id="simple-modal-description">
            ゲストログイン中はこの先の機能を使用できません。
            是非アカウントを作成の上、お楽しみください！
          </p>
          <Button
            onClick={handleSignOut}
            className={classes.submitBtn}
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            color="default"
          >
            アカウント作成へ進む
          </Button>
        </div>
      </Modal>
    </>
  )
}

export default ReccomendSignUpModal