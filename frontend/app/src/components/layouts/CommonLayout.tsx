import React from "react"

import { Container, Grid } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import Header from "components/layouts/Header"
import Footer from "./Footer"

const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: "#212121",
    color: "#f5f5f5"
  },
  container: {
    marginTop: "3rem"
  }
}))

interface CommonLayoutProps {
  children: React.ReactElement
}

const CommonLayout = ({ children }: CommonLayoutProps) => {
  const classes = useStyles()

  return (
    <div className={classes.main}>
      <header>
        <Header />
      </header>
      <main className={classes.main}>
        <Container maxWidth="lg" className={classes.container} >
          <Grid container justifyContent="center">
            <Grid item>
              {children}
            </Grid>
          </Grid>
        </Container>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default CommonLayout
