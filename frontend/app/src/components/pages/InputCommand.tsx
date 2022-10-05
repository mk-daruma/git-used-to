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
    worktreeFiles, setWorktreeFiles,
    indexFiles, setIndexFiles,
    repositoryFiles, setRepositoryFiles,
    commitMessages, setCommitMessages,
    addText, setAddText,
    commands, setCommands
  } = useContext(QuizContext)

  const currentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch === currentBranch)
  const currentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch === currentBranch)
  const exceptCurrentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== currentBranch)
  const exceptCurrentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch !== currentBranch)

  const gitAdd = (text :string) => {
    if (afterCommandFileNames(text, 8)?.every(afterCommandFileName => worktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandFileName))) {
      afterCommandFileNames(text, 8)?.map((afterCommandFileName) => (
        worktreeFiles
        .filter((worktreeFile) => worktreeFile.fileName === afterCommandFileName && worktreeFile.parentBranch === currentBranch)
        .map((worktreeFile) => (
          (setIndexFiles (indexFile => [...indexFile,{
            fileName :worktreeFile.fileName,
            textStatus: worktreeFile.textStatus,
            parentBranch: currentBranch,
            indexFileId: ""
          }]))
        ))
      ))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(8)}' did not match any file(s) known to git`)
      setText("")
    }
  }

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

  const gitBranchD = (text :string) => {
    const deleteBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch === text.substring(14))
    const deleteBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch === text.substring(14))

    if (branches.some(branch => branch.branchName === text.substring(14)) && currentBranch === text.substring(14)) {
      setAddText(`error: Cannot delete the branch '${text.substring(14)}' which you are currently on.`)
      setText("")
    } else if (branches.some(branch => branch.branchName === text.substring(14))
      && currentBranch !== text.substring(14)
      && deleteBranchParentWorktreeFiles.every(deleteBranchParentWorktreeFiles => currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentWorktreeFiles.fileName))
      && deleteBranchParentIndexFiles.every(deleteBranchParentIndexFile => currentBranchParentIndexFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentIndexFile.fileName))
      ) {
      setBranches(
        branches.filter((branch) => branch.branchName !== text.substring(14))
      )
      setWorktreeFiles(
        worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== text.substring(14))
      )
      setIndexFiles(
        indexFiles.filter((indexFile) => indexFile.parentBranch !== text.substring(14))
      )
      setText("")
    } else if (branches.some(branch => branch.branchName === text.substring(14))
      && currentBranch !== text.substring(14)
      && (!deleteBranchParentWorktreeFiles.every(deleteBranchParentWorktreeFiles => currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentWorktreeFiles.fileName)) || !deleteBranchParentIndexFiles.every(deleteBranchParentIndexFile => currentBranchParentIndexFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentIndexFile.fileName)))
    ) {
      setAddText(`error: The branch '${text.substring(14)}' is not fully merged. If you are sure you want to delete it, run 'git branch -D ${text.substring(14)}'.`)
      setText("")
    } else {
      setAddText(`error: branch '${text.substring(14)}' not found.`)
      setText("")
    }
  }

  const gitBranchForceD = (text :string) => {
    if (branches.some(branch => branch.branchName === text.substring(14)) && currentBranch === text.substring(14)) {
      setAddText(`error: Cannot delete the branch '${text.substring(14)}' which you are currently on.`)
      setText("")
    } else if (branches.some(branch => branch.branchName === text.substring(14)) && currentBranch !== text.substring(14)) {
      setBranches(
        branches.filter((branch) => branch.branchName !== text.substring(14))
      )
      setWorktreeFiles(
        worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== text.substring(14))
      )
      setIndexFiles(
        indexFiles.filter((indexFile) => indexFile.parentBranch !== text.substring(14))
      )
      setText("")
    } else {
      setAddText(`error: branch '${text.substring(14)}' not found.`)
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

  const gitRm = (text :string) => {
    if (worktreeFiles.some(worktreeFile => worktreeFile.fileName === text.substring(7)) && indexFiles.some(indexFile => indexFile.fileName === text.substring(7))) {
      setWorktreeFiles(
        currentBranchParentWorktreeFiles.filter((worktreeFile) => worktreeFile.fileName !== text.substring(7))
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
        currentBranchParentIndexFiles.filter((indexFile) => indexFile.fileName !== text.substring(7))
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
      setAddText(`error: pathspec '${text.substring(7)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const gitRmCashed = (text :string) => {
    if (indexFiles.some(indexFile => indexFile.fileName === text.substring(16))) {
      setIndexFiles(
        currentBranchParentIndexFiles.filter((indexFile) => indexFile.fileName !== text.substring(16))
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
      setAddText(`error: pathspec '${text.substring(16)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const Rm = (text :string) => {
    if (worktreeFiles.some(worktreeFile => worktreeFile.fileName === text.substring(3))) {
      setWorktreeFiles(
        currentBranchParentWorktreeFiles.filter((worktreeFile) => worktreeFile.fileName !== text.substring(3))
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
      setAddText(`error: pathspec '${text.substring(3)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const touch = (text :string) => {
    if (afterCommandFileNames(text, 6)?.every(afterCommandFileName => !currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandFileName))) {
      afterCommandFileNames(text, 6)?.map((afterCommandFileName) => (
        setWorktreeFiles(worktreeFile => [...worktreeFile,{
          fileName: afterCommandFileName,
          parentBranch: currentBranch,
          textStatus: "おはようございます",
          worktreeFileId: ""
        }])
      ))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(6)}' did not match any file(s) known to git`)
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
                gitAdd(text)
              } else if (text.startsWith("git commit -m")){
                gitCommitM(text)
              } else if (text === `git push origin ${currentBranch}`) {
                gitPush()
              } else if (text.startsWith("git branch -D")) {
                gitBranchForceD(text)
              } else if (text.startsWith("git branch -d")) {
                gitBranchD(text)
              } else if (text.startsWith("git branch ") && afterCommandBranchName.test(text.substring(11))){
                gitBranch(text)
              } else if (text.startsWith("git checkout ")) {
                gitCheckout(text)
              } else if (text.startsWith("touch ")) {
                touch(text)
              } else if (text.startsWith("git rm --cashed")) {
                gitRmCashed(text)
              } else if (text.startsWith("git rm")) {
                gitRm(text)
              } else if (text.startsWith("rm")) {
                Rm(text)
              } else {
                setAddText(`zsh: command not found: ${text}`)
                setText("")
            }}}}
        />
  )
}

export default InputCommand