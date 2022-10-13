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
    fileHistoryForCansellCommits, setFileHistoryForCansellCommits,
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
  const currentBranchParentHistoryFiles = fileHistoryForCansellCommits.filter((fileHistoryForCansellCommit) => fileHistoryForCansellCommit.parentBranch === currentBranch)
  const exceptCurrentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== currentBranch)
  const exceptCurrentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch !== currentBranch)
  const currentBranchLastestThreeCommits = commitMessages.filter((commitMessage) => commitMessage.parentBranch === currentBranch).slice(-3)

  const gitAddA = () => {
    currentBranchParentWorktreeFiles.forEach((worktreeFile) =>
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
  }

  const gitAdd = (text :string, str :number) => {
    if (afterCommandMultipleStrings(text, str)?.every(afterCommandMultipleString => worktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandMultipleString))) {
      afterCommandMultipleStrings(text, str)?.map((afterCommandMultipleString) => (
        currentBranchParentWorktreeFiles
        .filter((worktreeFile) =>worktreeFile.fileName === afterCommandMultipleString)
        .forEach((worktreeFile) =>
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
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const gitCommitM = (text :string, str :number) => {
    //地獄的にみづらい。リファクタリング必要。
    if (indexFiles.some(indexFile =>
      indexFile.fileName !== ""&& /[\S+]/.test(text.substring(str-1)))
        && !currentBranchParentIndexFiles.every(currentBranchParentIndexFiles =>
          currentBranchParentRepositoryFiles.some(currentBranchParentRepositoryFile =>
            currentBranchParentIndexFiles.fileName === currentBranchParentRepositoryFile.fileName
            && currentBranchParentIndexFiles.textStatus === currentBranchParentRepositoryFile.textStatus))){
      setCommitMessages(commitMessage => [...commitMessage,{
        message: text.substring(str),
        parentBranch: currentBranch,
        commitMessageId: ""
      }])
      currentBranchParentIndexFiles
      .filter((indexFile) => indexFile.fileName !== "")
      .forEach((indexFile) =>
        {if (!currentBranchParentRepositoryFiles.some((repositoryFile) => indexFile.fileName === repositoryFile.fileName)){
          setRepositoryFiles (repositoryFile => [...repositoryFile,{
            fileName :indexFile.fileName,
            textStatus: indexFile.textStatus,
            parentBranch: currentBranch,
            parentCommitMessage: text.substring(str),
            repositoryFileId: ""
          }])
          setFileHistoryForCansellCommits (fileHistoryForCansellCommit => [...fileHistoryForCansellCommit,{
            fileName :indexFile.fileName,
            textStatus: indexFile.textStatus,
            pastTextStatus: "",
            parentBranch: currentBranch,
            parentCommitMessage: text.substring(str),
            parentPastCommitMessage: "",
            historyFileId: ""
          }])
        } else if (currentBranchParentRepositoryFiles.some(repositoryFile => repositoryFile.fileName === indexFile.fileName && repositoryFile.textStatus !== indexFile.textStatus)) {
          currentBranchParentRepositoryFiles.forEach(repo =>
            {if (repo.fileName === indexFile.fileName) {
              setFileHistoryForCansellCommits (fileHistoryForCansellCommit => [...fileHistoryForCansellCommit,{
                fileName :indexFile.fileName,
                textStatus: indexFile.textStatus,
                pastTextStatus: repo.textStatus,
                parentBranch: currentBranch,
                parentCommitMessage: text.substring(str),
                parentPastCommitMessage: repo.parentCommitMessage,
                historyFileId: ""
              }])
            }}
          )
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
    } else {
      setAddText(`On branch '${currentBranch}' nothing to commit, working tree clean`)
    }
  }

  const gitCommitAmend = (text :string, str :number) => {
    if (commitMessages[commitMessages.length -1].message !== "") {
      const changeCommitMessage = currentBranchParentCommitMessages[currentBranchParentCommitMessages.length -1].message

      setCommitMessages(commitMessages.filter((commitMessage) =>commitMessage.parentBranch !== currentBranch))
      currentBranchParentCommitMessages[currentBranchParentCommitMessages.length -1] = {
        message: text.substring(str),
        parentBranch: currentBranch,commitMessageId: ""
      }
      currentBranchParentCommitMessages.forEach((commitMessage) => {
        setCommitMessages(commitMessages => [...commitMessages,{
          message: commitMessage.message,
          parentBranch: commitMessage.parentBranch,
          commitMessageId: ""
        }])
      })
      setRepositoryFiles(
        repositoryFiles.map((repositoryFile) =>
          repositoryFile.parentCommitMessage === changeCommitMessage
          && repositoryFile.parentBranch === currentBranch
          ? {
            fileName: repositoryFile.fileName,
            textStatus: repositoryFile.textStatus,
            parentBranch: repositoryFile.parentBranch,
            parentCommitMessage: text.substring(str),
            repositoryFileId: ""
            }
          : repositoryFile
        )
      )
      setFileHistoryForCansellCommits(
        fileHistoryForCansellCommits.map((historyFile) =>
        historyFile.parentCommitMessage === changeCommitMessage
          && historyFile.parentBranch === currentBranch
          ? {
            fileName :historyFile.fileName,
            textStatus: historyFile.textStatus,
            pastTextStatus: historyFile.pastTextStatus,
            parentBranch: historyFile.parentBranch,
            parentCommitMessage: text.substring(str),
            parentPastCommitMessage: historyFile.parentPastCommitMessage,
            historyFileId: ""
            }
          : historyFile
        )
      )



    } else {
      setAddText('error: commit message not found.')
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
    } else {
      setBranches(branches => [...branches,{
        branchName: text.substring(str),
        branchId: ""
      }])
      currentBranchParentWorktreeFiles.forEach((worktreeFile) => {
        setWorktreeFiles(worktreeFiles => [...worktreeFiles,{
          fileName: worktreeFile.fileName,
          parentBranch: text.substring(str),
          textStatus: worktreeFile.textStatus,
          worktreeFileId: ""
        }])
      })
      currentBranchParentIndexFiles.forEach((indexFile) => {
        setIndexFiles(indexFiles => [...indexFiles,{
          fileName: indexFile.fileName,
          parentBranch: text.substring(str),
          textStatus: indexFile.textStatus,
          indexFileId: ""
        }])
      })
      currentBranchParentCommitMessages.forEach((commitMessage) => {
        setCommitMessages(commitMessages => [...commitMessages,{
          message: commitMessage.message,
          parentBranch: text.substring(str),
          commitMessageId: ""
        }])
      })
      currentBranchParentRepositoryFiles.forEach((repositoryFile) => {
        setRepositoryFiles(repositoryFiles => [...repositoryFiles,{
          fileName: repositoryFile.fileName,
          textStatus: repositoryFile.textStatus,
          parentBranch: text.substring(str),
          parentCommitMessage: repositoryFile.parentCommitMessage,
          repositoryFileId: ""
        }])
      })
      currentBranchParentHistoryFiles.forEach((historyFile) => {
        setFileHistoryForCansellCommits(fileHistoryForCansellCommit => [...fileHistoryForCansellCommit,{
          fileName :historyFile.fileName,
          textStatus: historyFile.textStatus,
          pastTextStatus: historyFile.pastTextStatus,
          parentBranch: text.substring(str),
          parentCommitMessage: historyFile.parentCommitMessage,
          parentPastCommitMessage: historyFile.parentPastCommitMessage,
          historyFileId: historyFile.historyFileId
        }])
      })
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
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
    }
  }

  const gitBranchD = (text :string, str :number) => {
    const deleteBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch === text.substring(str))
    const deleteBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch === text.substring(str))

    if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch === text.substring(str)) {
      setAddText(`error: Cannot delete the branch '${text.substring(str)}' which you are currently on.`)
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
    } else if (branches.some(branch => branch.branchName === text.substring(str))
      && currentBranch !== text.substring(str)
      && (!deleteBranchParentWorktreeFiles.every(deleteBranchParentWorktreeFiles => currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentWorktreeFiles.fileName)) || !deleteBranchParentIndexFiles.every(deleteBranchParentIndexFile => currentBranchParentIndexFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentIndexFile.fileName)))
    ) {
      setAddText(`error: The branch '${text.substring(str)}' is not fully merged. If you are sure you want to delete it, run 'git branch -D ${text.substring(str)}'.`)
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
    }
  }

  const gitBranchForceD = (text :string, str :number) => {
    if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch === text.substring(str)) {
      setAddText(`error: Cannot delete the branch '${text.substring(str)}' which you are currently on.`)
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
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
    }
  }

  const gitCheckout = (text :string, str :number) => {
    if (branches.some(branch => branch.branchName === text.substring(str))) {
      setCurrentBranch(text.substring(str))
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const gitCheckoutB = (text :string, str :number) => {
    if (afterCommandBranchName.test(text.substring(str))) {
      gitBranch(text, str)
      setCurrentBranch(text.substring(str))
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const gitReset = () => {
    setIndexFiles(
      indexFiles.filter(indexFile => repositoryFiles.some(repositoryFile =>
        repositoryFile.fileName === indexFile.fileName
        && repositoryFile.parentBranch === indexFile.parentBranch)
        ))
    currentBranchParentRepositoryFiles.map(repositoryFile =>
      setIndexFiles(indexFile =>
        indexFile
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
  }

  const gitResetOption = (text :string, str :number, option:string) => {
    const resetNunber = Number(text.substring(str))
    const resetedCommitMessages :any = []
    const resetedHistoryFiles :any = []
    const forResetCurrentBranchCommitMessages = commitMessages.filter((commitMessage) => commitMessage.parentBranch === currentBranch)
    if (forResetCurrentBranchCommitMessages[forResetCurrentBranchCommitMessages.length -1].message) {
      for (let i = 0; i < resetNunber; i++){
        const lastestFileHistoryForCansellCommits = fileHistoryForCansellCommits.filter(fileHistory =>
          fileHistory.parentCommitMessage === forResetCurrentBranchCommitMessages[forResetCurrentBranchCommitMessages.length -1].message
        )

        lastestFileHistoryForCansellCommits.map(fileHistoryForCansellCommit =>
          repositoryFiles.forEach((repositoryFile) =>
          {if (fileHistoryForCansellCommit.parentCommitMessage === repositoryFile.parentCommitMessage
              && repositoryFile.parentBranch === currentBranch
              && fileHistoryForCansellCommit.parentBranch === currentBranch) {
                resetedHistoryFiles.push(fileHistoryForCansellCommit)
            }}
          )
        )
        lastestFileHistoryForCansellCommits.map(fileHistoryForCansellCommit =>
          setRepositoryFiles(repositoryFile =>
            repositoryFile.map((repositoryFile) =>
            fileHistoryForCansellCommit.pastTextStatus
              && fileHistoryForCansellCommit.fileName === repositoryFile.fileName
              && fileHistoryForCansellCommit.parentCommitMessage === repositoryFile.parentCommitMessage
              && repositoryFile.parentBranch === currentBranch
              && fileHistoryForCansellCommit.parentBranch === currentBranch
              ? {
                fileName: repositoryFile.fileName,
                textStatus: fileHistoryForCansellCommit.pastTextStatus,
                parentBranch: fileHistoryForCansellCommit.parentBranch,
                parentCommitMessage: fileHistoryForCansellCommit.parentPastCommitMessage,
                repositoryFileId: repositoryFile.repositoryFileId
                }
              : !fileHistoryForCansellCommit.pastTextStatus
                && fileHistoryForCansellCommit.fileName === repositoryFile.fileName
                && fileHistoryForCansellCommit.parentCommitMessage === repositoryFile.parentCommitMessage
                && repositoryFile.parentBranch === currentBranch
              ? {
                fileName: "",
                textStatus: "",
                parentBranch: "",
                parentCommitMessage: "",
                repositoryFileId: ""
                }
              : repositoryFile
          )))
          if (option === "mixed" || option === "hard") {
            console.log("mixedかhard")
            lastestFileHistoryForCansellCommits.map(fileHistoryForCansellCommit =>
              setIndexFiles((indexFile) =>
                indexFile.map((indexFile) =>
                fileHistoryForCansellCommit.pastTextStatus
                && fileHistoryForCansellCommit.fileName === indexFile.fileName
                && indexFile.parentBranch === currentBranch
                && fileHistoryForCansellCommit.parentBranch === currentBranch
                ? {
                  fileName: indexFile.fileName,
                  textStatus: fileHistoryForCansellCommit.pastTextStatus,
                  parentBranch: fileHistoryForCansellCommit.parentBranch,
                  indexFileId: indexFile.indexFileId
                  }
                : !fileHistoryForCansellCommit.pastTextStatus
                  && fileHistoryForCansellCommit.fileName === indexFile.fileName
                  && indexFile.parentBranch === currentBranch
                ? {
                  fileName: "",
                  textStatus: "",
                  parentBranch: "",
                  indexFileId: ""
                  }
                : indexFile
                )
              )
            )
          }
          if (option === "hard") {
            console.log("hardだけ")
            lastestFileHistoryForCansellCommits.map(fileHistoryForCansellCommit =>
              setWorktreeFiles((worktreeFile) =>
              worktreeFile.map((worktreeFile) =>
                fileHistoryForCansellCommit.pastTextStatus
                && fileHistoryForCansellCommit.fileName === worktreeFile.fileName
                && worktreeFile.parentBranch === currentBranch
                && fileHistoryForCansellCommit.parentBranch === currentBranch
                ? {
                  fileName: worktreeFile.fileName,
                  textStatus: fileHistoryForCansellCommit.pastTextStatus,
                  parentBranch: fileHistoryForCansellCommit.parentBranch,
                  worktreeFileId: worktreeFile.worktreeFileId
                  }
                : !fileHistoryForCansellCommit.pastTextStatus
                  && fileHistoryForCansellCommit.fileName === worktreeFile.fileName
                  && worktreeFile.parentBranch === currentBranch
                ? {
                  fileName: "",
                  textStatus: "",
                  parentBranch: "",
                  worktreeFileId: ""
                  }
                : worktreeFile
                )
              )
            )
          }
        resetedCommitMessages.push(forResetCurrentBranchCommitMessages.pop())
      }
      setCommitMessages(commitMessage =>
        commitMessage.filter(commitMessage =>
          !resetedCommitMessages.some((resetedCommitMessage :any) => resetedCommitMessage === commitMessage)))
      setFileHistoryForCansellCommits(fileHistoryForCansellCommit =>
        fileHistoryForCansellCommit.filter(historyFile =>
          !resetedHistoryFiles.some((resetedHistoryFile :any) => resetedHistoryFile === historyFile)))
    } else {
      setAddText('error: commit message not found.')
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
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
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
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
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
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const touch = (text :string, str :number) => {
    if (afterCommandMultipleStrings(text, str)?.every(afterCommandMultipleString => !currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandMultipleString))) {
      const RemoveDuplicatesAfterCommandMultipleStrings = Array.from(new Set(afterCommandMultipleStrings(text, str)))

      RemoveDuplicatesAfterCommandMultipleStrings.map((afterCommandMultipleString) => (
        setWorktreeFiles(worktreeFile => [...worktreeFile,{
          fileName: afterCommandMultipleString,
          parentBranch: currentBranch,
          textStatus: "おはようございます",
          worktreeFileId: ""
        }])
      ))
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
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
              } else if (text.startsWith("git reset --mixed HEAD~")) {
                gitResetOption(text, 23, "mixed")
                console.log("mixedです")
              } else if (text.startsWith("git reset --hard HEAD~")) {
                gitResetOption(text, 22, "hard")
                console.log("hardです")
              } else if (text.startsWith("git reset --soft HEAD~")) {
                gitResetOption(text, 22, "soft")
                console.log("softです")
              } else if (text.startsWith("git reset")) {
                gitReset()
              } else if (text.startsWith("git rm")) {
                gitRm(text, 7)
              } else if (text.startsWith("rm")) {
                Rm(text, 3)
              } else {
                setAddText(`zsh: command not found: ${text}`)
            }
            setText("")
          }}}
        />
  )
}

export default InputCommand