import React, { useState, useContext } from "react";

import { makeStyles, Theme } from "@material-ui/core/styles"
import { AuthContext } from "App";
import { QuizContext } from "./CreateQuiz";
import { Input } from "@material-ui/core";

const initialState = [
  {
      text: 'welcome git-used-to!!',
      addText: ''
  },
]

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    paddingTop: 5,
    paddingLeft: 5,
    color: "#f5f5f5"
  },
  p: {
    margin: 5,
  }
}))


const Terminal: React.FC = () => {
  const classes = useStyles()
  const { currentUser } = useContext(AuthContext)

  const [todos, setTodos] = useState(initialState);
  const [text, setText] = useState("");
  const [addText, setAddText] = useState("");

  return (
    <div className="App">
      { todos.map((todo) => (
      <>
        <p className={classes.p}>{ todo.addText }</p>
        <p className={classes.p}>{currentUser?.userName} % { todo.text }</p>
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
          if (e.key === 'Enter') {
            if(text === '') return
            e.preventDefault()
            setAddText("")
            setTodos(todos => [...todos,{ text, addText }])
            if (text === "git add"){
              setText("")
            } else if (text === "git commit"){
              setText("")
            } else {
              setAddText(`zsh: command not found: ${text}`)
              setText("")
          }}}}
          />
    </div>
  );
}

export default Terminal