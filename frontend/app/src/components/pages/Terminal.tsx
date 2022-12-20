import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles"
import LaptopChromebookIcon from '@material-ui/icons/LaptopChromebook';
import { AuthContext } from "App";
import InputCommand from "./InputCommand";
import { QuizContext } from "./CreateQuiz";
import QuizCommandCheatModal from "./QuizCommandCheatModal";

const useStyles = makeStyles(() => ({
  userName: {
    paddingTop: "4px"
  },
  terminalForm: {
    display: "flex",
  },
  commandText: {
    color: "#00ff7f",
    paddingTop: "1px",
    paddingLeft: "1rem",
    display: "flex",
    flexFlow: "column"
  },
  textRecord: {
    display: "flex",
    flexFlow: "column"
  },
  title: {
    display: "flex",
    alignItems: "center",
    paddingLeft: "2rem",
    paddingBottom: "1.5rem",
    borderBottom: "solid",
  },
  icon: {
    marginRight: "1rem"
  },
  commandHelp: {
    paddingLeft: "6rem"
  }
}))

const Terminal: React.FC = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const { commands, addText } = useContext(QuizContext)

  return (
    <>
      <h4 className={classes.title}>
        <LaptopChromebookIcon className={classes.icon} />
        Terminal
        <div className={classes.commandHelp}>
          <QuizCommandCheatModal />
        </div>
      </h4>
      <div className={classes.commandText}>
        { commands.map((command) => (
          <div className={classes.textRecord}>
            <div>{ command.addText }</div>
            <div>{currentUser?.userName} % { command.text }</div>
          </div>
          ))}
          {addText}
        <div className={classes.terminalForm}>
          <div className={classes.userName}>
            {currentUser?.userName} %
          </div>
          <InputCommand />
        </div>
      </div>
    </>
  );
}

export default Terminal
