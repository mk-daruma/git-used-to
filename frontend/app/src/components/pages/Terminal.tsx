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
    currentBranch, setCurrentBranch,
    branches, setBranches,
    worktreeFiles, setWorktreeFiles,
    indexFiles, setIndexFiles,
    repositoryFiles, setRepositoryFiles,
    commitMessages, setCommitMessages
  } = useContext(QuizContext)

  const [commands, setCommands] = useState([{
    text:"play with git-used-to!!",
    addText:""
  }]);
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
              setCommands(commands => [...commands,{
                text,
                addText
              }])
              if (text.startsWith("git add")){
                if (worktreeFiles.some(worktreeFile => worktreeFile.fileName === text.substring(8))){
                  worktreeFiles
                  .filter((worktreeFile) => worktreeFile.fileName !== "")
                  .map((worktreeFile) => (
                    (setIndexFiles (indexFile => [...indexFile,{
                      fileName :worktreeFile.fileName,
                      textStatus: worktreeFile.textStatus,
                      parentBranch: currentBranch,
                      indexFileId: ""
                    }]))
                  ))
                  setText("")
                } else {
                  setAddText(`error: pathspec '${text.substring(8)}' did not match any file(s) known to git`)
                  setText("")
                }
              } else if (text.startsWith("git commit -m")){
                if (indexFiles.some(indexFile => indexFile.fileName !== "")){
                  setCommitMessages(commitMessage => [...commitMessage,{
                    message: text.substring(14),
                    parentBranch: currentBranch,
                    commitMessageId: ""
                  }])
                  indexFiles
                  .filter((indexFile) => indexFile.fileName !== "")
                  .map((indexFile) => (
                    (setRepositoryFiles (repositoryFile => [...repositoryFile,{
                      fileName :indexFile.fileName,
                      repositoryStatus: "local",
                      textStatus: indexFile.textStatus,
                      parentCommitMessage: text.substring(14),
                      repositoryFileId: ""
                    }]))
                  ))
                  setIndexFiles(
                    indexFiles.filter((indexFile) => indexFile.fileName === "" )
                  )
                  console.log(commitMessages)
                  console.log(repositoryFiles)
                  console.log(indexFiles)
                  setText("")
                } else {
                  setAddText(`On branch '${currentBranch}' nothing to commit, working tree clean`)
                  setText("")
                }
              } else if (text === `git push origin ${currentBranch}`) {
                setRepositoryFiles((repositoryFile) => repositoryFile.map(
                  (repositoryFile) =>({
                    fileName: repositoryFile.fileName,
                    repositoryStatus: "remote",
                    textStatus: repositoryFile.textStatus,
                    parentCommitMessage: repositoryFile.parentCommitMessage,
                    repositoryFileId: repositoryFile.repositoryFileId
                  })))
                console.log(repositoryFiles)
              } else if (text.startsWith("git branch ")){
                if (text.substring(11) === "") {
                  setAddText('Enter a name after "git branch"')
                  setText("")
                } else {
                  setBranches(branches => [...branches,{
                    branchName: text.substring(11),
                    branchId: ""
                  }])
                  console.log(branches)
                  setText("")
                }
              } else if (text.startsWith("git checkout ")) {
                if (branches.some(branch => branch.branchName === text.substring(13))) {
                  setCurrentBranch(text.substring(13))
                  setText("")
                } else {
                  setAddText(`error: pathspec '${text.substring(13)}' did not match any file(s) known to git`)
                  setText("")
                }
              } else if (text.startsWith("touch ")) {
                setWorktreeFiles(worktreeFile => [...worktreeFile,{
                    fileName: text.substring(6),
                    parentBranch: currentBranch,
                    textStatus: "おはようございます",
                    worktreeFileId: ""
                  }])
                console.log(worktreeFiles)
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
