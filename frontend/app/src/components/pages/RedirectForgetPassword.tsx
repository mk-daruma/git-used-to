import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { RedirectChangeUserPasswordDataFormData } from "interfaces"
// import { redirectForgetCurrentUserPassword } from "lib/api/auth" リファクタリングをして理想はauthからインポートしたい。
import AlertMessage from "components/utils/AlertMessage"
import client from "lib/api/client"//一時的に追加

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

const RedirectForgetPassword: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const search = useLocation().search;
  const query = new URLSearchParams(search);

  const RedirectForgetCurrentUserPassword = (data: RedirectChangeUserPasswordDataFormData) => {
    return client.put("auth", data, { headers: {
      "access-token": query.get('access-token') || "",
      "client": query.get('client')|| "",
      "uid": query.get("uid") || "",
      "reset_password_token": query.get('token') || "",
    }})
  }

  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)

  const createFormData = (): RedirectChangeUserPasswordDataFormData => {
    const formData = new FormData()

    formData.append("password", password)
    formData.append("passwordConfirmation", passwordConfirmation)

    return formData
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await RedirectForgetCurrentUserPassword(data)
      console.log(res)

      if (res.status === 200) {

        alert("パスワード変更に成功しました！")

        history.push("/signin")

        console.log("changed Password successfully!")
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
      <form noValidate autoComplete="off">
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="パスワード再設定" />
          <CardContent>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password Confirmation"
              type="password"
              value={passwordConfirmation}
              margin="dense"
              autoComplete="current-password"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <div>
            </div>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              color="default"
              disabled={!password || !passwordConfirmation ? true : false}
              className={classes.submitBtn}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid password"
      />
    </>
  )
}

export default RedirectForgetPassword