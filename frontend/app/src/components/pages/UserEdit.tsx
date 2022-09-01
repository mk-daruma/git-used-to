import React, { useContext, useState, useCallback } from "react"
import { useHistory, Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import { Box } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel"
import { IconButton } from "@material-ui/core";
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import { Typography } from "@material-ui/core";


import { AuthContext } from "App"
import { updateUser } from "lib/api/users";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    },
    preview: {
      width: "100%"
    },
    box: {
      marginBottom: "1.5rem"
    },
    imageUploadBtn: {
      textAlign: "right"
    },
    input: {
      display: "none"
    },
    link: {
      textDecoration: "none"
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
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        required
        id="outlined-required"
        label="名前"
        defaultValue={`${currentUser?.userName}`}
        variant="outlined"
        value={name}
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
        value={introduction}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>{
          setIntroduction(e.target.value)
        }}
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
      <Button
        onClick={handleFormSubmit}
        disabled={!name || !introduction ? true : false}
      >
        送信
      </Button>
      <Box textAlign="center" className={classes.box}>
        <Typography variant="body2">
          <Link to="/password" className={classes.link}>
            パスワード変更はこちら
          </Link>
        </Typography>
        <Typography>
          <Link to="/users/delete" className={classes.link}>
            アカウント削除はこちら
          </Link>
        </Typography>
      </Box>
    </form>
  )
}

export default UserEdit
