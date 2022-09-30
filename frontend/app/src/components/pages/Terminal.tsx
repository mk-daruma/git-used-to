import React, { useContext } from "react";

import { makeStyles } from "@material-ui/core/styles"
import { AuthContext } from "App";
import InputCommand from "./InputCommand";
import { QuizContext } from "./CreateQuiz";

const useStyles = makeStyles(() => ({
  p: {
    marginTop: 2,
    marginBottom: 2
  }
}))

const Terminal: React.FC = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const { commands, addText } = useContext(QuizContext)

  return (
    <div className="App">
      { commands.map((command) => (
        <>
          <p className={classes.p}>{ command.addText }</p>
          <p className={classes.p}>{currentUser?.userName} % { command.text }</p>
        </>
        ))}
      <p className={classes.p}>{addText}</p>
        {currentUser?.userName} %
        <InputCommand />
    </div>
  );
}

export default Terminal
