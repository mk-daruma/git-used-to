import React, { useState } from "react"
import { motion } from "framer-motion"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import AlertMessage from "components/utils/AlertMessage"
import { signUp } from "lib/api/auth"
import { SignUpFormData } from "interfaces/index"

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
    padding: theme.spacing(3),
    margin: theme.spacing(6),
    maxWidth: 400,
    borderRadius: "2rem",
  }
}))

const SignUp: React.FC = () => {
  const classes = useStyles()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const userTitle = "git-used-to見習い"
  // 開発環境
  const confirmSuccessUrl = "http://localhost:3000/api/v1/auth/signin";
  // 本番環境
  // const confirmSuccessUrl = "https://web.git-used-to.com/signin";

    const createFormData = (): SignUpFormData => {
      const formData = new FormData()

      formData.append("userName", name)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("passwordConfirmation", passwordConfirmation)
      formData.append("confirmSuccessUrl", confirmSuccessUrl)
      formData.append("nickname", userTitle)

      return formData
    }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await signUp(data)
      console.log(res)

      alert("【認証メール送信完了】確認してください");
      console.log("mail sended!")
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
            <CardHeader className={classes.header} title="Sign Up" />
            <CardContent>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Name"
                value={name}
                margin="dense"
                onChange={event => setName(event.target.value)}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                value={email}
                margin="dense"
                onChange={event => setEmail(event.target.value)}
              />
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
                <input
                  type="hidden"
                  id="confirm_success_url"
                  name="confirm_success_url"
                  value={confirmSuccessUrl}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                color="default"
                disabled={!name || !email || !password || !passwordConfirmation ? true : false}
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
        message="Invalid email or password"
      />
    </>
  )
}

export default SignUp
