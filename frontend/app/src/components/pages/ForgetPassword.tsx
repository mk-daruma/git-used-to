import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { motion } from "framer-motion"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import { ChangeUserPasswordFormData } from "interfaces"
import { forgetCurrentUserPassword } from "lib/api/users"
import AlertMessage from "components/utils/AlertMessage"

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
    padding: theme.spacing(6),
    margin: theme.spacing(8),
    maxWidth: 400,
    borderRadius: "2rem",
  },
  box: {
    marginTop: "2rem"
  },
  link: {
    textDecoration: "none"
  }
}))

const ForgetPassword: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()

  const [email, setEmail] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  // 開発環境
  const redirectUrl = "http://localhost:3000/api/v1/auth/password/reset/form";
  // 本番環境
  // const redirectUrl = "https://web.git-used-to.com/api/v1/auth/password/reset/form";

  const createFormData = (): ChangeUserPasswordFormData => {
    const formData = new FormData()

    formData.append("email", email)
    formData.append("redirectUrl", redirectUrl)

    return formData
  }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await forgetCurrentUserPassword(data)
      console.log(res)

      if (res.status === 200) {

        alert("パスワード変更用のリンクをメールで送りました。")
        history.push("/")

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
            <CardHeader className={classes.header} title="パスワード変更" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                value={email}
                margin="dense"
                onChange={event => setEmail(event.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="default"
                disabled={!email ? true : false}
                className={classes.submitBtn}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </form>
      <AlertMessage
        open={alertMessageOpen}
        setOpen={setAlertMessageOpen}
        severity="error"
        message="Invalid email"
      />
    </>
  )
}

export default ForgetPassword
