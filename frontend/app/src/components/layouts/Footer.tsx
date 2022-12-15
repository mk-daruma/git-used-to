import { makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    color: "#ebf6f7",
    backgroundColor: "#3a3a3a",
    width: "100%",
    height: "5rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
}))

const Footer :React.FC = () => {
  const classes = useStyles()

  return(
      <div className={classes.footer}>
        ©git used to
      </div>
  )
}

export default Footer