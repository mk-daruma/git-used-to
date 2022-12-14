import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "components/layouts/Header"
import Footer from "./Footer"
import { useLocation } from "react-router-dom"

const useStyles = makeStyles(() => ({
  backgroundColor: {
    backgroundColor: "#212121",
    color: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    marginTop: "8rem",
    marginBottom: "2rem",
  },
  footer: {
    marginTop: "auto"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()
  const location = useLocation()

  return (
    <div  className={classes.backgroundColor}>
      <header>
        {location.pathname !== (`/`) && <Header />}
      </header>
      <main>
        <Container maxWidth="lg" className={classes.container} >
          <Grid container justifyContent="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        {location.pathname !== (`/`) && <Footer />}
      </footer>
    </div>
  )
}

export default CommonLayout
