import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles"
import { AuthContext } from "App";
import { QuizContext } from "./CreateQuiz";
import { Input } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  input: {
    paddingLeft: 5,
    color: "#f5f5f5"
  },
  p: {
    marginTop: 2,
    marginBottom: 2
  }
}))

const Terminal: React.FC = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)
  const {
    text, setText,
    setCurrentBranch,
    branches, setBranches,
  } = useContext(QuizContext)

  const [commands, setCommands] = useState([{text:"play with git-used-to!!", addText:""}]);
  const [addText, setAddText] = useState("");

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
        <Input
          className={classes.input}
          disableUnderline={true}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyPress={e =>{
            if (e.key === "Enter") {
              if(text === "") return
              e.preventDefault()
              setAddText("")
              setCommands(commands => [...commands,{ text, addText }])
              if (text.startsWith("git add")){
                setText("")
              } else if (text === "git commit"){
                setText("")
              } else if (text.startsWith("git branch ")){
                if (text.substring(11) === "") {
                  setAddText('Enter a name after "git branch"')
                  setText("")
                } else {
                  setBranches(branches => [...branches,{ branchName: text }])
                  console.log(branches)
                  setText("")
                }
              } else if (text.startsWith("git checkout ")) {
                if (branches.some(branch => branch.branchName.includes(text.substring(13)))) {
                  setCurrentBranch(text.substring(13))
                  setText("")
                } else {
                  setAddText(`error: pathspec '${text}' did not match any file(s) known to git`)
                  setText("")
                }
              } else {
                setAddText(`zsh: command not found: ${text}`)
                setText("")
            }}}}
        />
    </div>
  );
}

export default Terminal
