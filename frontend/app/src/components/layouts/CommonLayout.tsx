import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "components/layouts/Header"
import Footer from "./Footer"

const useStyles = makeStyles(() => ({
  backgroundColor: {
    backgroundColor: "#212121",
    color: "#f5f5f5",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  container: {
    marginTop: "3rem",
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

  return (
    <div  className={classes.backgroundColor}>
      <header>
        <Header />
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
        <Footer />
      </footer>
    </div>
  )
}

export default CommonLayout
