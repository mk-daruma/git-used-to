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
  const afterCommandMultipleStrings = (text :string, str :number) => text.substring(str).match(/[^\s]+/g)

  const {
    text, setText,
    currentBranch, setCurrentBranch,
    branches, setBranches,
    remoteBranches, setRemoteBranches,
    worktreeFiles, setWorktreeFiles,
    indexFiles, setIndexFiles,
    repositoryFiles, setRepositoryFiles,
    fileHistoryForCansellCommit, setFileHistoryForCansellCommit,
    remoteRepositoryFiles, setRemoteRepositoryFiles,
    commitMessages, setCommitMessages,
    remoteCommitMessages, setRemoteCommitMessages,
    addText, setAddText,
    commands, setCommands
  } = useContext(QuizContext)

  const currentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch === currentBranch)
  const currentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch === currentBranch)
  const currentBranchParentCommitMessages = commitMessages.filter((commitMessage) => commitMessage.parentBranch === currentBranch)
  const currentBranchParentRepositoryFiles = repositoryFiles.filter((repositoryFile) => repositoryFile.parentBranch === currentBranch)
  const exceptCurrentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== currentBranch)
  const exceptCurrentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch !== currentBranch)
  const currentBranchLastestThreeCommits = commitMessages.filter((commitMessage) => commitMessage.parentBranch === currentBranch).slice(-3)

  const gitAddA = () => {
    currentBranchParentWorktreeFiles.map((worktreeFile) =>
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
    setText("")
  }

  const gitAdd = (text :string, str :number) => {
    if (afterCommandMultipleStrings(text, str)?.every(afterCommandMultipleString => worktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandMultipleString))) {
      afterCommandMultipleStrings(text, str)?.map((afterCommandMultipleString) => (
        currentBranchParentWorktreeFiles
        .filter((worktreeFile) =>worktreeFile.fileName === afterCommandMultipleString)
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
      currentBranchParentIndexFiles
      .filter((indexFile) => indexFile.fileName !== "")
      .map((indexFile) =>
        {if (currentBranchParentIndexFiles.every(currentBranchParentIndexFiles =>
              currentBranchParentRepositoryFiles.some(currentBranchParentRepositoryFile =>
                currentBranchParentIndexFiles.fileName === currentBranchParentRepositoryFile.fileName
                && currentBranchParentIndexFiles.textStatus === currentBranchParentRepositoryFile.textStatus)))
        {
          setAddText(`On branch '${currentBranch}' nothing to commit, working tree clean`)
        } else if (!currentBranchParentRepositoryFiles.some((repositoryFile) => indexFile.fileName === repositoryFile.fileName)){
          setCommitMessages(commitMessage => [...commitMessage,{
            message: text.substring(str),
            parentBranch: currentBranch,
            commitMessageId: ""
          }])
          setRepositoryFiles (repositoryFile => [...repositoryFile,{
            fileName :indexFile.fileName,
            textStatus: indexFile.textStatus,
            parentBranch: currentBranch,
            parentCommitMessage: text.substring(str),
            repositoryFileId: ""
          }])
          setFileHistoryForCansellCommit (historyFile => [...historyFile,{
            fileName :indexFile.fileName,
            textStatus: indexFile.textStatus,
            parentBranch: currentBranch,
            parentCommitMessage: text.substring(str),
            historyFileId: ""
          }])
        } else if (currentBranchParentRepositoryFiles.some(repositoryFile => repositoryFile.fileName === indexFile.fileName && repositoryFile.textStatus !== indexFile.textStatus)) {
          setCommitMessages(commitMessage => [...commitMessage,{
            message: text.substring(str),
            parentBranch: currentBranch,
            commitMessageId: ""
          }])
          setRepositoryFiles (repositoryFile => repositoryFile.map((repositoryFile) =>
            indexFile.textStatus !== repositoryFile.textStatus && indexFile.fileName === repositoryFile.fileName
            ? {
              fileName: indexFile.fileName,
              textStatus: indexFile.textStatus,
              parentBranch: currentBranch,
              parentCommitMessage: text.substring(str),
              repositoryFileId: ""
              }
            : repositoryFile))
        }}
      )
      setText("")
    } else {
      setAddText(`On branch '${currentBranch}' nothing to commit, working tree clean`)
      setText("")
    }
  }

  const gitCommitAmend = (text :string, str :number) => {
    if (commitMessages[commitMessages.length -1].message !== "") {
      commitMessages[commitMessages.length -1] =
      {
        message: text.substring(str),
        parentBranch: currentBranch,
        commitMessageId: ""
      }
    setText("")
    } else {
      setAddText('error: commit message not found.')
      setText("")
    }
  }

  const gitPush = () => {
    setRepositoryFiles((repositoryFile) => repositoryFile.map(
      (repositoryFile) =>({
        fileName: repositoryFile.fileName,
        textStatus: repositoryFile.textStatus,
        parentBranch: currentBranch,
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
      currentBranchParentWorktreeFiles.map((worktreeFile) => {
        setWorktreeFiles(worktreeFiles => [...worktreeFiles,{
          fileName: worktreeFile.fileName,
          parentBranch: text.substring(str),
          textStatus: worktreeFile.textStatus,
          worktreeFileId: ""
        }])
      })
      currentBranchParentIndexFiles.map((indexFile) => {
        setIndexFiles(indexFiles => [...indexFiles,{
          fileName: indexFile.fileName,
          parentBranch: text.substring(str),
          textStatus: indexFile.textStatus,
          indexFileId: ""
        }])
      })
      currentBranchParentCommitMessages.map((commitMessage) => {
        setCommitMessages(commitMessages => [...commitMessages,{
          message: commitMessage.message,
          parentBranch: text.substring(str),
          commitMessageId: ""
        }])
        repositoryFiles.map((repositoryFile) => {
          setRepositoryFiles(repositoryFiles => [...repositoryFiles,{
            fileName: repositoryFile.fileName,
            textStatus: repositoryFile.textStatus,
            parentBranch: text.substring(str),
            parentCommitMessage: commitMessage.message,
            repositoryFileId: ""
          }])
        })
      })
      setText("")
    }
  }

  const gitBranchM = (text :string, str :number) => {
    if (afterCommandMultipleStrings(text, str)?.length === 2
        && branches.some(branch => branch.branchName === afterCommandMultipleStrings(text, str)![0])) {
      setBranches(branches.map((branch) =>
        branch.branchName === afterCommandMultipleStrings(text, str)![0]
        ? {
          branchName: afterCommandMultipleStrings(text, str)![1],
          branchId: branch.branchId
        }
        : branch
        ))
      setWorktreeFiles(worktreeFiles.map((worktreeFile) =>
        worktreeFile.parentBranch === afterCommandMultipleStrings(text, str)![0]
        ? {
          fileName: worktreeFile.fileName,
          parentBranch: afterCommandMultipleStrings(text, str)![1],
          textStatus: worktreeFile.textStatus,
          worktreeFileId: worktreeFile.worktreeFileId
        }
        : worktreeFile
        ))
      setIndexFiles(indexFiles.map((indexFile) =>
        indexFile.parentBranch === afterCommandMultipleStrings(text, str)![0]
        ? {
          fileName: indexFile.fileName,
          parentBranch: afterCommandMultipleStrings(text, str)![1],
          textStatus: indexFile.textStatus,
          indexFileId: indexFile.indexFileId
        }
        : indexFile
        ))
      setCommitMessages(commitMessages.map((commitMessage) =>
        commitMessage.parentBranch === afterCommandMultipleStrings(text, str)![0]
        ? {
          message: commitMessage.message,
          parentBranch: afterCommandMultipleStrings(text, str)![1],
          commitMessageId: commitMessage.commitMessageId
        }
        : commitMessage
      ))
      setRepositoryFiles(repositoryFiles.map((repositoryFile) =>
        repositoryFile.parentBranch === afterCommandMultipleStrings(text, str)![0]
        ? {
          fileName: repositoryFile.fileName,
          parentBranch: afterCommandMultipleStrings(text, str)![1],
          parentCommitMessage: repositoryFile.parentCommitMessage,
          textStatus: repositoryFile.textStatus,
          repositoryFileId: repositoryFile.repositoryFileId
        }
        : repositoryFile
        ))
      setText("")
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
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

  const gitCheckoutB = (text :string, str :number) => {
    if (afterCommandBranchName.test(text.substring(str))) {
      gitBranch(text, str)
      setCurrentBranch(text.substring(str))
      setText("")
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
      setText("")
    }
  }

  const gitReset = () => {
    setIndexFiles(
      indexFiles.filter(indexFile => currentBranchParentRepositoryFiles.some(repositoryFile => repositoryFile.fileName === indexFile.fileName))
    )
    currentBranchParentRepositoryFiles.map(repositoryFile =>
      setIndexFiles(
        indexFiles
        .map((indexFile) =>
          indexFile.parentBranch === currentBranch
          && repositoryFile.fileName === indexFile.fileName
          && repositoryFile.textStatus !== indexFile.textStatus
          ?{
            fileName: indexFile.fileName,
            parentBranch: indexFile.parentBranch,
            textStatus: repositoryFile.textStatus,
            indexFileId: indexFile.indexFileId
          }
          : indexFile
          )))
    console.log("git reset")
    setText("")
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
    if (afterCommandMultipleStrings(text, str)?.every(afterCommandMultipleString => !currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandMultipleString))) {
      afterCommandMultipleStrings(text, str)?.map((afterCommandMultipleString) => (
        setWorktreeFiles(worktreeFile => [...worktreeFile,{
          fileName: afterCommandMultipleString,
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
              if (text.startsWith("git add .") || text.startsWith("git add -A")){
                gitAddA()
              } else if (text.startsWith("git add ")){
                gitAdd(text, 8)
              } else if (text.startsWith("git commit --amend")){
                gitCommitAmend(text, 19)
              } else if (text.startsWith("git commit -m")){
                gitCommitM(text, 14)
              } else if (text === `git push origin ${currentBranch}`) {
                gitPush()
              } else if (text.startsWith("git branch -m")) {
                gitBranchM(text, 14)
              } else if (text.startsWith("git branch -D")) {
                gitBranchForceD(text, 14)
              } else if (text.startsWith("git branch -d")) {
                gitBranchD(text, 14)
              } else if (text.startsWith("git branch ") && afterCommandBranchName.test(text.substring(11))){
                gitBranch(text, 11)
              } else if (text.startsWith("git checkout -b ")) {
                gitCheckoutB(text, 16)
              } else if (text.startsWith("git checkout ")) {
                gitCheckout(text, 13)
              } else if (text.startsWith("touch ")) {
                touch(text, 6)
              } else if (text.startsWith("git rm --cashed")) {
                gitRmCashed(text, 16)
              } else if (text.startsWith("git reset")) {
                gitReset()
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