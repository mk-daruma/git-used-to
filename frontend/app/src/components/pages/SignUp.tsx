import React, { useState, useCallback } from "react"

import { makeStyles, Theme } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Button from "@material-ui/core/Button"

import AlertMessage from "components/utils/AlertMessage"
import { signUp } from "lib/api/auth"
import { SignUpFormData } from "interfaces/index"
import { IconButton } from "@material-ui/core"
import { PhotoCamera } from "@material-ui/icons"
import Box from "@material-ui/core/Box"
import CancelIcon from "@material-ui/icons/Cancel"

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
  imageUploadBtn: {
    textAlign: "right"
  },
  input: {
    display: "none"
  },
  box: {
    marginBottom: "1.5rem"
  },
  preview: {
    width: "100%"
  }
}))

const SignUp: React.FC = () => {
  const classes = useStyles()

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const [image, setImage] = useState<string>("")
  const [preview, setPreview] = useState<string>("")
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false)
  const confirmSuccessUrl = "http://localhost:4000/api/v1/auth/";

    const uploadImage = useCallback((e :any) => {
      const file = e.target.files[0]
      setImage(file)
    }, [])

    const previewImage = useCallback((e :any) => {
      const file = e.target.files[0]
      setPreview(window.URL.createObjectURL(file))
    }, [])

    const createFormData = (): SignUpFormData => {
      const formData = new FormData()

      formData.append("userName", name)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("passwordConfirmation", passwordConfirmation)
      formData.append("image", image)
      formData.append("confirmSuccessUrl", confirmSuccessUrl)

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
            <div className={classes.imageUploadBtn}>
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  uploadImage(e)
                  previewImage(e)
                }}
              />
              <label htmlFor="icon-button-file">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                    <PhotoCamera />
                </IconButton>
              </label>
            </div>
            {
              preview ? (
                <Box
                  className={classes.box}
                >
                  <IconButton
                    color="inherit"
                    onClick={() => setPreview("")}
                  >
                    <CancelIcon />
                  </IconButton>
                  <img
                    src={preview}
                    alt="preview img"
                    className={classes.preview}
                  />
                </Box>
              ) : null
            }
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
