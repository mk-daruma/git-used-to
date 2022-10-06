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
  const afterCommandBranchName = /^[a-zA-Z]+$/
  const afterCommandFileNames = (text :string, str :number) => text.substring(str).match(/[^\s]+/g)

  const {
    text, setText,
    currentBranch, setCurrentBranch,
    branches, setBranches,
    remoteBranches, setRemoteBranches,
    worktreeFiles, setWorktreeFiles,
    indexFiles, setIndexFiles,
    repositoryFiles, setRepositoryFiles,
    remoteRepositoryFiles, setRemoteRepositoryFiles,
    commitMessages, setCommitMessages,
    remoteCommitMessages, setRemoteCommitMessages,
    addText, setAddText,
    commands, setCommands
  } = useContext(QuizContext)

  const currentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch === currentBranch)
  const currentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch === currentBranch)
  const exceptCurrentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== currentBranch)
  const exceptCurrentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch !== currentBranch)

  const gitAdd = (text :string, str :number) => {
    if (afterCommandFileNames(text, str)?.every(afterCommandFileName => worktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandFileName))) {
      afterCommandFileNames(text, str)?.map((afterCommandFileName) => (
        currentBranchParentWorktreeFiles
        .filter((worktreeFile) =>worktreeFile.fileName === afterCommandFileName)
        .map((worktreeFile) =>
          {if (!currentBranchParentIndexFiles.some(IndexFile => IndexFile.fileName === worktreeFile.fileName)){
            setIndexFiles (indexFile => [...indexFile,{
              fileName :worktreeFile.fileName,
              textStatus: worktreeFile.textStatus,
              parentBranch: currentBranch,
              indexFileId: ""
            }])
          } else if (currentBranchParentIndexFiles.some(IndexFile => IndexFile.fileName === worktreeFile.fileName && IndexFile.textStatus !== worktreeFile.textStatus)) {
            setIndexFiles (indexFile => indexFile.map((indexFile) =>
              indexFile.textStatus !== worktreeFile.textStatus && indexFile.fileName === worktreeFile.fileName
              ? {
              fileName :worktreeFile.fileName,
              textStatus: worktreeFile.textStatus,
              parentBranch: currentBranch,
              indexFileId: indexFile.indexFileId
              }
              : indexFile))
          }}
        )
      ))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const gitCommitM = (text :string, str :number) => {
    if (indexFiles.some(indexFile => indexFile.fileName !== "" && /[\S+]/.test(text.substring(str-1)))){
      setCommitMessages(commitMessage => [...commitMessage,{
        message: text.substring(str),
        parentBranch: currentBranch,
        commitMessageId: ""
      }])
      indexFiles
      .filter((indexFile) => indexFile.fileName !== "")
      .map((indexFile) => (
        (setRepositoryFiles (repositoryFile => [...repositoryFile,{
          fileName :indexFile.fileName,
          textStatus: indexFile.textStatus,
          parentCommitMessage: text.substring(str),
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
        textStatus: repositoryFile.textStatus,
        parentCommitMessage: repositoryFile.parentCommitMessage,
        repositoryFileId: repositoryFile.repositoryFileId
      })))
  }

  const gitBranch = (text :string, str :number) => {
    if (text.substring(str) === "") {
      setAddText('Enter a name after "git branch"')
      setText("")
    } else {
      setBranches(branches => [...branches,{
        branchName: text.substring(str),
        branchId: ""
      }])
      setText("")
    }
  }

  const gitBranchD = (text :string, str :number) => {
    const deleteBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch === text.substring(str))
    const deleteBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch === text.substring(str))

    if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch === text.substring(str)) {
      setAddText(`error: Cannot delete the branch '${text.substring(str)}' which you are currently on.`)
      setText("")
    } else if (branches.some(branch => branch.branchName === text.substring(str))
      && currentBranch !== text.substring(str)
      && deleteBranchParentWorktreeFiles.every(deleteBranchParentWorktreeFiles => currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentWorktreeFiles.fileName))
      && deleteBranchParentIndexFiles.every(deleteBranchParentIndexFile => currentBranchParentIndexFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentIndexFile.fileName))
      ) {
      setBranches(
        branches.filter((branch) => branch.branchName !== text.substring(str))
      )
      setWorktreeFiles(
        worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== text.substring(str))
      )
      setIndexFiles(
        indexFiles.filter((indexFile) => indexFile.parentBranch !== text.substring(str))
      )
      setText("")
    } else if (branches.some(branch => branch.branchName === text.substring(str))
      && currentBranch !== text.substring(str)
      && (!deleteBranchParentWorktreeFiles.every(deleteBranchParentWorktreeFiles => currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentWorktreeFiles.fileName)) || !deleteBranchParentIndexFiles.every(deleteBranchParentIndexFile => currentBranchParentIndexFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentIndexFile.fileName)))
    ) {
      setAddText(`error: The branch '${text.substring(str)}' is not fully merged. If you are sure you want to delete it, run 'git branch -D ${text.substring(str)}'.`)
      setText("")
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
      setText("")
    }
  }

  const gitBranchForceD = (text :string, str :number) => {
    if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch === text.substring(str)) {
      setAddText(`error: Cannot delete the branch '${text.substring(str)}' which you are currently on.`)
      setText("")
    } else if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch !== text.substring(str)) {
      setBranches(
        branches.filter((branch) => branch.branchName !== text.substring(str))
      )
      setWorktreeFiles(
        worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== text.substring(str))
      )
      setIndexFiles(
        indexFiles.filter((indexFile) => indexFile.parentBranch !== text.substring(str))
      )
      setText("")
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
      setText("")
    }
  }

  const gitCheckout = (text :string, str :number) => {
    if (branches.some(branch => branch.branchName === text.substring(str))) {
      setCurrentBranch(text.substring(str))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const gitRm = (text :string, str :number) => {
    if (worktreeFiles.some(worktreeFile => worktreeFile.fileName === text.substring(str)) && indexFiles.some(indexFile => indexFile.fileName === text.substring(str))) {
      setWorktreeFiles(
        currentBranchParentWorktreeFiles.filter((worktreeFile) => worktreeFile.fileName !== text.substring(str))
      )
      exceptCurrentBranchParentWorktreeFiles.map(exceptCurrentBranchParentWorktreeFile => (
        setWorktreeFiles(worktreeFile => [...worktreeFile,{
          fileName: exceptCurrentBranchParentWorktreeFile.fileName,
          parentBranch: exceptCurrentBranchParentWorktreeFile.parentBranch,
          textStatus: exceptCurrentBranchParentWorktreeFile.textStatus,
          worktreeFileId: exceptCurrentBranchParentWorktreeFile.worktreeFileId
        }])
      ))
      setIndexFiles(
        currentBranchParentIndexFiles.filter((indexFile) => indexFile.fileName !== text.substring(str))
      )
      exceptCurrentBranchParentIndexFiles.map(exceptCurrentBranchParentIndexFile => (
        setIndexFiles(indexFile => [...indexFile,{
          fileName: exceptCurrentBranchParentIndexFile.fileName,
          parentBranch: exceptCurrentBranchParentIndexFile.parentBranch,
          textStatus: exceptCurrentBranchParentIndexFile.textStatus,
          indexFileId: exceptCurrentBranchParentIndexFile.indexFileId
        }])
      ))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const gitRmCashed = (text :string, str :number) => {
    if (indexFiles.some(indexFile => indexFile.fileName === text.substring(str))) {
      setIndexFiles(
        currentBranchParentIndexFiles.filter((indexFile) => indexFile.fileName !== text.substring(str))
      )
      exceptCurrentBranchParentIndexFiles.map(exceptCurrentBranchParentIndexFile => (
        setIndexFiles(indexFile => [...indexFile,{
          fileName: exceptCurrentBranchParentIndexFile.fileName,
          parentBranch: exceptCurrentBranchParentIndexFile.parentBranch,
          textStatus: exceptCurrentBranchParentIndexFile.textStatus,
          indexFileId: exceptCurrentBranchParentIndexFile.indexFileId
        }])
      ))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const Rm = (text :string, str :number) => {
    if (worktreeFiles.some(worktreeFile => worktreeFile.fileName === text.substring(str))) {
      setWorktreeFiles(
        currentBranchParentWorktreeFiles.filter((worktreeFile) => worktreeFile.fileName !== text.substring(str))
      )
      exceptCurrentBranchParentWorktreeFiles.map(exceptCurrentBranchParentWorktreeFile => (
        setWorktreeFiles(worktreeFile => [...worktreeFile,{
          fileName: exceptCurrentBranchParentWorktreeFile.fileName,
          parentBranch: exceptCurrentBranchParentWorktreeFile.parentBranch,
          textStatus: exceptCurrentBranchParentWorktreeFile.textStatus,
          worktreeFileId: exceptCurrentBranchParentWorktreeFile.worktreeFileId
        }])
      ))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const touch = (text :string, str :number) => {
    if (afterCommandFileNames(text, str)?.every(afterCommandFileName => !currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandFileName))) {
      afterCommandFileNames(text, str)?.map((afterCommandFileName) => (
        setWorktreeFiles(worktreeFile => [...worktreeFile,{
          fileName: afterCommandFileName,
          parentBranch: currentBranch,
          textStatus: "おはようございます",
          worktreeFileId: ""
        }])
      ))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
      setText("")
    }
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
              if (text.startsWith("git add ")){
                gitAdd(text, 8)
              } else if (text.startsWith("git commit -m")){
                gitCommitM(text, 14)
              } else if (text === `git push origin ${currentBranch}`) {
                gitPush()
              } else if (text.startsWith("git branch -D")) {
                gitBranchForceD(text, 14)
              } else if (text.startsWith("git branch -d")) {
                gitBranchD(text, 14)
              } else if (text.startsWith("git branch ") && afterCommandBranchName.test(text.substring(11))){
                gitBranch(text, 11)
              } else if (text.startsWith("git checkout ")) {
                gitCheckout(text, 13)
              } else if (text.startsWith("touch ")) {
                touch(text, 6)
              } else if (text.startsWith("git rm --cashed")) {
                gitRmCashed(text, 16)
              } else if (text.startsWith("git rm")) {
                gitRm(text, 7)
              } else if (text.startsWith("rm")) {
                Rm(text, 3)
              } else {
                setAddText(`zsh: command not found: ${text}`)
                setText("")
            }}}}
        />
  )
}

export default InputCommand