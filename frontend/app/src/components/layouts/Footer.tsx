import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    color: "#ebf6f7",
    backgroundColor: "#3a3a3a",
    width: "100%",
    height: "10em",
  },
}))

const Footer :React.FC = () => {
  const classes = useStyles()

  return(
    <>
      <div className={classes.footer}>こんにちは</div>
    </>
  )
}

export default Footer