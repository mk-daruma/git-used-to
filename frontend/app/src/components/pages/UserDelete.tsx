import React, { useContext, useState } from "react"
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

import { makeStyles, Theme } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { AuthContext } from "App";
import AlertMessage from "components/utils/AlertMessage";
import { deleteUser } from "lib/api/auth";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(6)
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none"
  },
  header: {
    textAlign: "center"
  },
  card: {
    padding: theme.spacing(2),
    maxWidth: 400
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

const UserDelete: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { currentUser } = useContext(AuthContext)

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const [checkBtn, setCheckBtn] = React.useState({
    canNotRestore: false,
    deleteRelatedData: false,
    finalCheck: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBtn({ ...checkBtn, [event.target.name]: event.target.checked });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    try {
      const res = await deleteUser()
      console.log(res)

      if (res.status === 200) {
        alert("アカウント削除に成功しました。")

        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        history.push("/signin")

        console.log("delete user successfully!")
      } else {
        console.log("Failed delete user")
      }
    } catch (err) {
      console.log(err)
      setAlertMessageOpen(true)
    }
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="アカウント削除" />
          <CardContent>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkBtn.canNotRestore}
                  onChange={handleChange}
                  name="canNotRestore"
                />}
              label="一度削除すると復元できません。"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkBtn.deleteRelatedData}
                  onChange={handleChange}
                  name="deleteRelatedData"
                />}
              label={`${currentUser?.userName}さんが作成した問題も削除されます。`}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkBtn.finalCheck}
                  onChange={handleChange}
                  name="finalCheck"
                />}
              label="アカウントを削除して良いですか？"
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!checkBtn.canNotRestore || !checkBtn.deleteRelatedData || !checkBtn.finalCheck ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              アカウントを削除します
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Failed delete user"
      />
    </>
  )
}

export default UserDelete
