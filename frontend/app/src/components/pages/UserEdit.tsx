import React, { useContext, useState, useCallback } from "react"
import { useHistory, Link } from "react-router-dom";
import { Avatar, Card } from "@material-ui/core"
import { motion } from "framer-motion"

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { Box } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel"
import { IconButton } from "@material-ui/core";
import { AuthContext } from "App"
import { updateUser } from "lib/api/users";
import ReccomendSignUpModal from "./RecommendSignUpModal";
import UserChart from "./UserChart";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        marginBottom: theme.spacing(2),
        width: "100%"
      }
    },
    preview: {
      width: "100%"
    },
    box: {
      margin: "1.5rem"
    },
    imageUploadBtn: {
      textAlign: "right"
    },
    input: {
      display: "none"
    },
    link: {
      textDecoration: "none",
      padding: "1.5rem"
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
      alignItems: "center"
    },
    btn: {
      marginBottom: "1.5rem"
    },
    chart: {
      paddingLeft: "1.5rem"
    },
    titleFont: {
      fontSize: "100%"
    }
  })
);

const UserEdit: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const classes = useStyles();
  const histroy = useHistory();

  const [name, setName] = useState<string | undefined>(currentUser?.userName)
  const [introduction, setIntroduction] = useState<string | undefined>(currentUser?.userSelfIntroduction)
  const [image, setImage] = useState<string>("")
  const [preview, setPreview] = useState<string>("")

  const uploadImage = useCallback((e :any) => {
    const file = e.target.files[0]
    setImage(file)
  }, [])

  const previewImage = useCallback((e :any) => {
    const file = e.target.files[0]
    setPreview(window.URL.createObjectURL(file))
  }, [])

  const createFormData = () => {
    const formData = new FormData()

    formData.append("userName", name || "")
    formData.append("userSelfIntroduction", introduction || "")
    formData.append("image", image)

    return formData
  }

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data = createFormData()

    try {
      const res = await updateUser(currentUser?.id, data)
      console.log(res)

      if (res.status === 200) {
        setCurrentUser(res.data.data)

        histroy.push("/")

        console.log("Update user successfullly!")
      } else {
        console.log(res.data.message)
      }
    } catch(err) {
      console.log(err)
      console.log("Failed in updating user!")
    }
  }

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
                  <Avatar
                    className={classes.image}
                    src={currentUser?.image.url}
                    />
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
            <div className={classes.titleFont}>
              【現在の称号】{currentUser?.nickname}
            </div>
          </div>
          <TextField
            required
            id="outlined-required"
            label="名前"
            defaultValue={`${currentUser?.userName}`}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
              setName(e.target.value)
            }}
            />
          <TextField
            required
            multiline
            minRows="10"
            id="outlined-required"
            label="自己紹介文"
            defaultValue={currentUser?.userSelfIntroduction}
            variant="outlined"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
              setIntroduction(e.target.value)
            }}
            />
          {currentUser?.email === "guest_user@git-used-to.com"
            ? <ReccomendSignUpModal />
            : <>
                <Button
                  className={classes.btn}
                  onClick={handleFormSubmit}
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  color="default"
                  disabled={!name || !introduction ? true : false}
                >
                  ユーザー情報を更新
                </Button>
                <Button
                  className={classes.btn}
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  color="default"
                  component={Link}
                  to={`/password`}
                >
                  パスワード変更はこちら
                </Button>
                <Button
                  className={classes.btn}
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  color="default"
                  component={Link}
                  to={`/user/delete`}
                >
                  アカウント削除はこちら
                </Button>
              </>
            }
        </form>
        <div className={classes.chart}>
          <UserChart />
        </div>
      </Card>
    </motion.div>
  )
}

export default UserEdit
