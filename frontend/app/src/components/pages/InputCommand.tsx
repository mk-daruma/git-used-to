import React, { useContext } from "react";
import { QuizContext } from "./CreateQuiz";
import { Input, makeStyles } from "@material-ui/core";

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

const InputCommand: React.FC = () => {
  const classes = useStyles()
  const afterCommandStr = /^[a-zA-Z]+$/

  const {
    text, setText,
    currentBranch, setCurrentBranch,
    branches, setBranches,
    worktreeFiles, setWorktreeFiles,
    indexFiles, setIndexFiles,
    repositoryFiles, setRepositoryFiles,
    commitMessages, setCommitMessages,
    addText, setAddText,
    commands, setCommands
  } = useContext(QuizContext)

  const gitAdd = (text :string) => {
    if (worktreeFiles.some(worktreeFile => worktreeFile.fileName.includes(text.substring(8)))){
    worktreeFiles
    .filter((worktreeFile) => worktreeFile.fileName === text.substring(8) )
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
  }}

  const gitCommitM = (text :string) => {
    if (indexFiles.some(indexFile => indexFile.fileName !== "" && /[\S+]/.test(text.substring(13)))){
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
      setText("")
    } else {
      setAddText(`On branch '${currentBranch}' nothing to commit, working tree clean`)
      setText("")
    }
  }

  const gitPush = () => {
    setRepositoryFiles((repositoryFile) => repositoryFile.map(
      (repositoryFile) =>({
        fileName: repositoryFile.fileName,
        repositoryStatus: "remote",
        textStatus: repositoryFile.textStatus,
        parentCommitMessage: repositoryFile.parentCommitMessage,
        repositoryFileId: repositoryFile.repositoryFileId
      })))
  }

  const gitBranch = (text :string) => {
    if (text.substring(11) === "") {
      setAddText('Enter a name after "git branch"')
      setText("")
    } else {
      setBranches(branches => [...branches,{
        branchName: text.substring(11),
        branchId: ""
      }])
      setText("")
    }
  }

  const gitCheckout = (text :string) => {
    if (branches.some(branch => branch.branchName === text.substring(13))) {
      setCurrentBranch(text.substring(13))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(13)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const touch = (text :string) => {
    setWorktreeFiles(worktreeFile => [...worktreeFile,{
      fileName: text.substring(6),
      parentBranch: currentBranch,
      textStatus: "おはようございます",
      worktreeFileId: ""
    }])
  setText("")
  }

  return(
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
              if (text.startsWith("git add ") && afterCommandStr.test(text.substring(8))){
                gitAdd(text)
              } else if (text.startsWith("git commit -m")){
                gitCommitM(text)
              } else if (text === `git push origin ${currentBranch}`) {
                gitPush()
              } else if (text.startsWith("git branch ") && afterCommandStr.test(text.substring(11))){
                gitBranch(text)
              } else if (text.startsWith("git checkout ")) {
                gitCheckout(text)
              } else if (text.startsWith("touch ") && afterCommandStr.test(text.substring(6))) {
                touch(text)
              } else {
                setAddText(`zsh: command not found: ${text}`)
                setText("")
            }}}}
        />

  )
}

export default InputCommand