import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"

import { AuthContext } from "App"
import { updateUser } from "lib/api/users";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch"
      }
    }
  })
);

const UserEdit: React.FC = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const classes = useStyles();
  const histroy = useHistory();


  const [name, setName] = useState<string | undefined>(currentUser?.userName)
  const [introduction, setIntroduction] = useState<string | undefined>(currentUser?.userSelfIntroduction)

  const createFormData = () => {
    const formData = new FormData()

    formData.append("userName", name || "")
    formData.append("userSelfIntroduction", introduction || "")

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
      <Button
        onClick={handleFormSubmit}
        disabled={!name || !introduction ? true : false}
      >
        送信
      </Button>
    </form>
  )
}

export default UserEdit
