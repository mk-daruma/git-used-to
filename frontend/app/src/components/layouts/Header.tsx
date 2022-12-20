import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import { AuthContext } from "App"
import HeaderMenuList from "components/layouts/HeaderMenuList"

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: "rgba(255, 0, 0, 0)",
    borderBottom: "solid",
    borderColor: "white",
    position: "fixed",
    top: 0,
    width: "100%",
  },
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    width: "8rem",
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none",
    marginLeft: "auto"
  }
}))

const Header: React.FC = () => {
  const { loading, isSignedIn } = useContext(AuthContext)
  const classes = useStyles()

  const AuthButtons = () => {
    if (!loading) {
      if (isSignedIn) {
        return (
          <HeaderMenuList/>
        )
      } else {
        return (
          <>
            <Button
              component={Link}
              to="/signin"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/signup"
              color="inherit"
              className={classes.linkBtn}
            >
              Sign Up
            </Button>
          </>
        )
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography
            component={Link}
            to="/home"
            variant="h6"
            className={classes.title}
          >
            Git-used-to
          </Typography>
          <AuthButtons />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
