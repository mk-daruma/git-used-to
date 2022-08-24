import React, { useContext } from "react"
import { Link } from "react-router-dom"

import { makeStyles, Theme } from "@material-ui/core/styles"

import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"

import { AuthContext } from "App"
import HeaderMenuList from "components/layouts/HeaderMenuList"

const useStyles = makeStyles((theme: Theme) => ({
  iconButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: "none",
    color: "inherit"
  },
  linkBtn: {
    textTransform: "none"
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
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.iconButton}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={Link}
            to="/"
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
