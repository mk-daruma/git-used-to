import React, { useContext } from "react";
import { QuizContext } from "./CreateQuiz";
import { Input, makeStyles } from "@material-ui/core";
import { AuthContext } from "App";

const useStyles = makeStyles(() => ({
  input: {
    paddingLeft: 5,
    color: "#00ff7f"
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
    gitInit, setGitInit,
    remoteAdd, setRemoteAdd,
    setCommands
  } = useContext(QuizContext)

  const { currentUser } = useContext(AuthContext)

  const currentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch === currentBranch.currentBranchName)
  const currentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch === currentBranch.currentBranchName)
  const currentBranchParentCommitMessages = commitMessages.filter((commitMessage) => commitMessage.parentBranch === currentBranch.currentBranchName)
  const currentBranchParentRepositoryFiles = repositoryFiles.filter((repositoryFile) => repositoryFile.parentBranch === currentBranch.currentBranchName)
  const currentBranchParentHistoryFiles = fileHistoryForCansellCommits.filter((fileHistoryForCansellCommit) => fileHistoryForCansellCommit.parentBranch === currentBranch.currentBranchName)
  const currentBranchParentRemoteCommitMessages = remoteCommitMessages.filter(remoteCommitMessage => remoteCommitMessage.parentRemoteBranch === currentBranch.currentBranchName)
  const currentBranchParentRemoteRepositoryFiles = remoteRepositoryFiles.filter(remoteRepositoryFile => remoteRepositoryFile.parentRemoteBranch === currentBranch.currentBranchName)
  const exceptCurrentBranchParentWorktreeFiles = worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== currentBranch.currentBranchName)
  const exceptCurrentBranchParentIndexFiles = indexFiles.filter((indexFile) => indexFile.parentBranch !== currentBranch.currentBranchName)
  const differTextStatusRemoteRepositoryFiles = currentBranchParentRepositoryFiles.filter(repositoryFile => currentBranchParentRemoteRepositoryFiles.some(remoteRepositoryFile => repositoryFile.fileName === remoteRepositoryFile.fileName && repositoryFile.textStatus !== remoteRepositoryFile.textStatus))

  const checkBranchCount = branches.filter(branch => branch.branchName).length
  const checkGitAddACount = currentBranchParentWorktreeFiles.filter(worktreeFile => !currentBranchParentIndexFiles.some(indexFile => indexFile.fileName === worktreeFile.fileName)).length
  const checkDatacount = (datas: any, prop: string = "parentBranch") => datas.filter((data :any) => data?.[prop] === currentBranch.currentBranchName).length
  const checkMultiData = (text :string, str :number,datas: any, prop: string = "parentBranch") => afterCommandMultipleStrings(text, str)?.length + checkDatacount(datas, prop)

  const gitAddA = () => {
    setIndexFiles(indexFiles.map(indexFile =>
      !currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === indexFile.fileName)
      && indexFile.parentBranch === currentBranch.currentBranchName
      ? {
        fileName :"",
        textStatus: "",
        parentBranch: "",
        parentBranchId: "",
        indexFileId: ""
        }
      : indexFile
    ))
    currentBranchParentWorktreeFiles.forEach((worktreeFile) =>
    {if (!currentBranchParentIndexFiles.some(IndexFile => IndexFile.fileName === worktreeFile.fileName)){
      setIndexFiles (indexFile => [...indexFile,{
        fileName :worktreeFile.fileName,
        textStatus: worktreeFile.textStatus,
        parentBranch: currentBranch.currentBranchName,
        parentBranchId: worktreeFile.parentBranchId,
        indexFileId: ""
      }])
    } else if (currentBranchParentIndexFiles.some(IndexFile => IndexFile.fileName === worktreeFile.fileName && IndexFile.textStatus !== worktreeFile.textStatus)) {
      setIndexFiles (indexFile => indexFile.map((indexFile) =>
        indexFile.textStatus !== worktreeFile.textStatus
        && indexFile.fileName === worktreeFile.fileName
        && indexFile.parentBranch === currentBranch.currentBranchName
        ? {
          fileName :worktreeFile.fileName,
          textStatus: worktreeFile.textStatus,
          parentBranch: currentBranch.currentBranchName,
          parentBranchId: indexFile.parentBranchId,
          indexFileId: indexFile.indexFileId
          }
        : indexFile
      ))
    }}
    )
  }

  const gitAdd = (text :string, str :number) => {
    if (afterCommandMultipleStrings(text, str)?.every(afterCommandMultipleString =>
          (!currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandMultipleString) && currentBranchParentIndexFiles.some(indexFile => indexFile.fileName === afterCommandMultipleString))
          || currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === afterCommandMultipleString)
      )) {
      const rmFiles = afterCommandMultipleStrings(text, str)?.filter((afterCommandMultipleString :string) => !currentBranchParentWorktreeFiles.some(worktreeFile => afterCommandMultipleString === worktreeFile.fileName))

      setIndexFiles(indexFiles.map(indexFile =>
        rmFiles?.some(rmFile => rmFile === indexFile.fileName)
        && indexFile.parentBranch === currentBranch.currentBranchName
        ? {
          fileName :"",
          textStatus: "",
          parentBranch: "",
          parentBranchId: "",
          indexFileId: ""
          }
        : indexFile
        )
      )
      afterCommandMultipleStrings(text, str)?.forEach((afterCommandMultipleString) => (
        currentBranchParentWorktreeFiles
        .filter(worktreeFile => worktreeFile.fileName === afterCommandMultipleString)
        .forEach(worktreeFile =>
          {if (!currentBranchParentIndexFiles.some(IndexFile => IndexFile.fileName === worktreeFile.fileName)){
            setIndexFiles (indexFile => [...indexFile,{
              fileName :worktreeFile.fileName,
              textStatus: worktreeFile.textStatus,
              parentBranch: currentBranch.currentBranchName,
              parentBranchId: worktreeFile.parentBranchId,
              indexFileId: ""
            }])
          } else if (currentBranchParentIndexFiles.some(IndexFile => IndexFile.fileName === worktreeFile.fileName && IndexFile.textStatus !== worktreeFile.textStatus)) {
            setIndexFiles (indexFile => indexFile.map((indexFile) =>
              indexFile.textStatus !== worktreeFile.textStatus
              && indexFile.fileName === worktreeFile.fileName
              && indexFile.parentBranch === currentBranch.currentBranchName
              ? {
                fileName :worktreeFile.fileName,
                textStatus: worktreeFile.textStatus,
                parentBranch: currentBranch.currentBranchName,
                parentBranchId: worktreeFile.parentBranchId,
                indexFileId: indexFile.indexFileId
                }
              : indexFile
            ))
          }}
        )
      ))
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const gitCommitM = (text :string, str :number) => {
    const commonConditions = indexFiles.some(indexFile => indexFile.fileName !== "" && /[\S+]/.test(text.substring(str-1))) && !currentBranchParentCommitMessages.some(commitMessages => commitMessages.message === text.substring(str))
    const removeRepositoryFiles :any = []
    const notRemoveCommitMessages = currentBranchParentCommitMessages.slice(-2)

    if ((commonConditions && !currentBranchParentIndexFiles.every(indexFile => currentBranchParentRepositoryFiles.some(repositoryFile => indexFile.fileName === repositoryFile.fileName && indexFile.textStatus === repositoryFile.textStatus)))
        || (commonConditions && !currentBranchParentRepositoryFiles.every(repositoryFile => currentBranchParentIndexFiles.some(indexFile => indexFile.fileName === repositoryFile.fileName && indexFile.textStatus === repositoryFile.textStatus)))
        || (commonConditions && !currentBranchParentRepositoryFiles.some(repositoryFile => repositoryFile.fileName))
      ) {
      setFileHistoryForCansellCommits(fileHistoryForCansellCommits.map(historyFile =>
        !notRemoveCommitMessages.some(commitMessage => commitMessage.message === historyFile.parentCommitMessage)
          && historyFile.parentBranch === currentBranch.currentBranchName
        ? {
          fileName :"",
          textStatus: "",
          fileStatus: "",
          pastTextStatus: "",
          parentBranch: "",
          parentCommitMessage: "",
          parentPastCommitMessage: "",
          parentBranchId: "",
          parentCommitMessageId: "",
          historyFileId: ""
          }
        : historyFile
        ))
      setCommitMessages(commitMessage => [...commitMessage,{
        message: text.substring(str),
        parentBranch: currentBranch.currentBranchName,
        parentBranchId: currentBranch.currentBranchId,
        commitMessageId: ""
      }])
      currentBranchParentRepositoryFiles
      .filter(repositoryFile => repositoryFile.fileName)
      .forEach(filtedrepositoryFile =>
        {if (!currentBranchParentIndexFiles.some(indexFile => indexFile.fileName === filtedrepositoryFile.fileName)) {
          removeRepositoryFiles.push(filtedrepositoryFile)
          }}
        )
      setRepositoryFiles(repositoryFiles.map(repositoryFile =>
        removeRepositoryFiles.some((removeRepositoryFile :any) => removeRepositoryFile.fileName === repositoryFile.fileName)
        && repositoryFile.parentBranch === currentBranch.currentBranchName
        ? {
          fileName: "",
          textStatus: "",
          parentBranch: "",
          parentCommitMessage: "",
          parentBranchId: "",
          parentCommitMessageId: "",
          repositoryFileId: ""
          }
        : repositoryFile
        )
      )
      removeRepositoryFiles.forEach((removeRepositoryFile :any) =>
      setFileHistoryForCansellCommits (fileHistoryForCansellCommit => [...fileHistoryForCansellCommit,{
        fileName :removeRepositoryFile.fileName,
        textStatus: "",
        fileStatus: "deleted",
        pastTextStatus: removeRepositoryFile.textStatus,
        parentBranch: currentBranch.currentBranchName,
        parentCommitMessage: text.substring(str),
        parentPastCommitMessage: removeRepositoryFile.parentCommitMessage,
        parentBranchId: currentBranch.currentBranchId,
        parentCommitMessageId: "",
        historyFileId: ""
      }]))
      currentBranchParentIndexFiles
      .filter((indexFile) => indexFile.fileName !== "")
      .forEach((indexFile) =>
        {if (!currentBranchParentRepositoryFiles.some((repositoryFile) => indexFile.fileName === repositoryFile.fileName)){
          setRepositoryFiles (repositoryFile => [...repositoryFile,{
            fileName :indexFile.fileName,
            textStatus: indexFile.textStatus,
            parentBranch: currentBranch.currentBranchName,
            parentCommitMessage: text.substring(str),
            parentBranchId: currentBranch.currentBranchId,
            parentCommitMessageId: "",
            repositoryFileId: ""
          }])
          setFileHistoryForCansellCommits (fileHistoryForCansellCommit => [...fileHistoryForCansellCommit,{
            fileName :indexFile.fileName,
            textStatus: indexFile.textStatus,
            fileStatus: "exists",
            pastTextStatus: "",
            parentBranch: currentBranch.currentBranchName,
            parentCommitMessage: text.substring(str),
            parentPastCommitMessage: "",
            parentBranchId: currentBranch.currentBranchId,
            parentCommitMessageId: "",
            historyFileId: ""
          }])
        } else if (currentBranchParentRepositoryFiles.some(repositoryFile => repositoryFile.fileName === indexFile.fileName && repositoryFile.textStatus !== indexFile.textStatus)) {
          currentBranchParentRepositoryFiles.forEach(repo =>
            {if (repo.fileName === indexFile.fileName) {
              setFileHistoryForCansellCommits (fileHistoryForCansellCommit => [...fileHistoryForCansellCommit,{
                fileName :indexFile.fileName,
                textStatus: indexFile.textStatus,
                fileStatus: "exists",
                pastTextStatus: repo.textStatus,
                parentBranch: currentBranch.currentBranchName,
                parentCommitMessage: text.substring(str),
                parentPastCommitMessage: repo.parentCommitMessage,
                parentBranchId: currentBranch.currentBranchId,
                parentCommitMessageId: "",
                historyFileId: ""
              }])
            }}
          )
          setRepositoryFiles (repositoryFile => repositoryFile.map(repositoryFile =>
          indexFile.fileName === repositoryFile.fileName
          && indexFile.textStatus !== repositoryFile.textStatus
          && repositoryFile.parentBranch === currentBranch.currentBranchName
            ? {
              fileName: indexFile.fileName,
              textStatus: indexFile.textStatus,
              parentBranch: currentBranch.currentBranchName,
              parentCommitMessage: text.substring(str),
              parentBranchId: currentBranch.currentBranchId,
              parentCommitMessageId: "",
              repositoryFileId: ""
              }
            : repositoryFile
          ))
        }}
      )
    } else {
      setAddText(`On branch '${currentBranch.currentBranchName}' nothing to commit, working tree clean`)
    }
  }

  const gitCommitAmend = (text :string, str :number) => {
    if (commitMessages[commitMessages.length -1].message !== "") {
      const changeCommitMessage = currentBranchParentCommitMessages[currentBranchParentCommitMessages.length -1].message

      setCommitMessages(commitMessages.filter((commitMessage) =>commitMessage.parentBranch !== currentBranch.currentBranchName))
      currentBranchParentCommitMessages[currentBranchParentCommitMessages.length -1] = {
        message: text.substring(str),
        parentBranch: currentBranch.currentBranchName,
        parentBranchId: "",
        commitMessageId: ""
      }
      currentBranchParentCommitMessages.forEach((commitMessage) => {
        setCommitMessages(commitMessages => [...commitMessages,{
          message: commitMessage.message,
          parentBranch: commitMessage.parentBranch,
          parentBranchId: commitMessage.parentBranchId,
          commitMessageId: commitMessage.commitMessageId
        }])
      })
      setRepositoryFiles(
        repositoryFiles.map((repositoryFile) =>
          repositoryFile.parentCommitMessage === changeCommitMessage
          && repositoryFile.parentBranch === currentBranch.currentBranchName
          ? {
            fileName: repositoryFile.fileName,
            textStatus: repositoryFile.textStatus,
            parentBranch: repositoryFile.parentBranch,
            parentCommitMessage: text.substring(str),
            parentBranchId: "",
            parentCommitMessageId: "",
            repositoryFileId: ""
            }
          : repositoryFile
        )
      )
      setFileHistoryForCansellCommits(
        fileHistoryForCansellCommits.map((historyFile) =>
        historyFile.parentCommitMessage === changeCommitMessage
          && historyFile.parentBranch === currentBranch.currentBranchName
          ? {
            fileName :historyFile.fileName,
            textStatus: historyFile.textStatus,
            fileStatus: historyFile.fileStatus,
            pastTextStatus: historyFile.pastTextStatus,
            parentBranch: historyFile.parentBranch,
            parentCommitMessage: text.substring(str),
            parentPastCommitMessage: historyFile.parentPastCommitMessage,
            parentBranchId: "",
            parentCommitMessageId: "",
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
    const checkExistsRemoteBranches =
      remoteBranches.some(remoteBranch => remoteBranch.remoteBranchName === currentBranch.currentBranchName)
      ? [...remoteBranches]
      : [...remoteBranches, {remoteBranchName :currentBranch.currentBranchName, remoteBranchId: currentBranch.currentBranchId}]
    const hasNoRemoteCommitMessages = currentBranchParentCommitMessages.filter(commitMessage => !currentBranchParentRemoteCommitMessages.some(remoteCommitMessage => remoteCommitMessage.remoteMessage === commitMessage.message))
    const hasNoRemoteRepositoryFiles = currentBranchParentRepositoryFiles.filter(repositoryFile => !currentBranchParentRemoteRepositoryFiles.some(remoteRepositoryFile => repositoryFile.fileName === remoteRepositoryFile.fileName))
    const rmRemoteRepositoryFiles = currentBranchParentRemoteRepositoryFiles.filter(remoteRepositoryFile => !currentBranchParentRepositoryFiles.some(repositoryFile => repositoryFile.fileName === remoteRepositoryFile.fileName))
    if (remoteAdd === "added remote") {
      if (!remoteBranches.some(remoteBranch => remoteBranch.remoteBranchName === currentBranch.currentBranchName)) {
        setRemoteBranches((remoteBranch) => [...remoteBranch,{
          remoteBranchName: currentBranch.currentBranchName,
          remoteBranchId: ""
        }])
      }
      rmRemoteRepositoryFiles.forEach(rmRemoteRepositoryFile => {
        setRemoteRepositoryFiles((repositoryFile) =>
          repositoryFile.map(repositoryFile =>
            repositoryFile.parentRemoteBranch === currentBranch.currentBranchName
            && repositoryFile.fileName === rmRemoteRepositoryFile.fileName
            ? {
              fileName: "",
              textStatus: "",
              parentRemoteBranch: "",
              parentRemoteCommitMessage: "",
              parentRemoteBranchId: "",
              parentRemoteCommitMessageId: "",
              remoteRepositoryFileId: ""
              }
            : repositoryFile
          )
        )
      })
      checkExistsRemoteBranches.forEach(remoteBranch => {
        hasNoRemoteCommitMessages.forEach(hasNoRemoteCommitMessage => {
          if (remoteBranch.remoteBranchName === hasNoRemoteCommitMessage.parentBranch){
            setRemoteCommitMessages((commitMessage) => [...commitMessage,{
              remoteMessage: hasNoRemoteCommitMessage.message,
              parentRemoteBranch: hasNoRemoteCommitMessage.parentBranch,
              parentRemoteBranchId: remoteBranch.remoteBranchId,
              remoteCommitMessageId: ""
            }])
          }
        })
        differTextStatusRemoteRepositoryFiles.forEach(differTextStatusRemoteRepositoryFile => {
          setRemoteRepositoryFiles((repositoryFile) =>
            repositoryFile.map(repositoryFile =>
              differTextStatusRemoteRepositoryFile.fileName === repositoryFile.fileName
              && differTextStatusRemoteRepositoryFile.parentBranch === repositoryFile.parentRemoteBranch
              ? {
                  fileName: differTextStatusRemoteRepositoryFile.fileName,
                  textStatus: differTextStatusRemoteRepositoryFile.textStatus,
                  parentRemoteBranch: differTextStatusRemoteRepositoryFile.parentBranch,
                  parentRemoteCommitMessage: differTextStatusRemoteRepositoryFile.parentCommitMessage,
                  parentRemoteBranchId: remoteBranch.remoteBranchName === differTextStatusRemoteRepositoryFile.parentBranch ? remoteBranch.remoteBranchId : "",
                  parentRemoteCommitMessageId: "",
                  remoteRepositoryFileId: ""
                }
              : repositoryFile
            )
          )
        })
        hasNoRemoteRepositoryFiles.forEach(hasNoRemoteRepositoryFile => {
          if (remoteBranch.remoteBranchName === hasNoRemoteRepositoryFile.parentBranch) {
            setRemoteRepositoryFiles((repositoryFile) => [...repositoryFile,{
              fileName: hasNoRemoteRepositoryFile.fileName,
              textStatus: hasNoRemoteRepositoryFile.textStatus,
              parentRemoteBranch: hasNoRemoteRepositoryFile.parentBranch,
              parentRemoteCommitMessage: hasNoRemoteRepositoryFile.parentCommitMessage,
              parentRemoteBranchId: remoteBranch.remoteBranchId,
              parentRemoteCommitMessageId: "",
              remoteRepositoryFileId: ""
            }])
          }
        })
      })
    } else {
      setAddText('remote: Repository not found.')
    }
  }

  const gitPushDelete = (text :string, str :number) => {
    if (remoteBranches.some(remoteBranch => remoteBranch.remoteBranchName === text.substring(str))) {
      setRemoteBranches(
        remoteBranches.filter((branch) => branch.remoteBranchName !== text.substring(str))
      )
      setRemoteCommitMessages(
        remoteCommitMessages.filter((commitMessage) => commitMessage.parentRemoteBranch !== text.substring(str))
      )
      setRemoteRepositoryFiles(
        remoteRepositoryFiles.filter((repositoryFile) => repositoryFile.parentRemoteBranch !== text.substring(str))
      )
    } else {
      setAddText(`error: unable to delete '${text.substring(str)}': remote ref does not exist`)
    }
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
          parentBranchId: "",
          worktreeFileId: ""
        }])
      })
      currentBranchParentIndexFiles.forEach((indexFile) => {
        setIndexFiles(indexFiles => [...indexFiles,{
          fileName: indexFile.fileName,
          parentBranch: text.substring(str),
          textStatus: indexFile.textStatus,
          parentBranchId: "",
          indexFileId: ""
        }])
      })
      currentBranchParentCommitMessages.forEach((commitMessage) => {
        setCommitMessages(commitMessages => [...commitMessages,{
          message: commitMessage.message,
          parentBranch: text.substring(str),
          parentBranchId: "",
          commitMessageId: ""
        }])
      })
      currentBranchParentRepositoryFiles.forEach((repositoryFile) => {
        setRepositoryFiles(repositoryFiles => [...repositoryFiles,{
          fileName: repositoryFile.fileName,
          textStatus: repositoryFile.textStatus,
          parentBranch: text.substring(str),
          parentCommitMessage: repositoryFile.parentCommitMessage,
          parentBranchId: "",
          parentCommitMessageId: "",
          repositoryFileId: ""
        }])
      })
      currentBranchParentHistoryFiles.forEach((historyFile) => {
        setFileHistoryForCansellCommits(fileHistoryForCansellCommit => [...fileHistoryForCansellCommit,{
          fileName :historyFile.fileName,
          textStatus: historyFile.textStatus,
          fileStatus: historyFile.fileStatus,
          pastTextStatus: historyFile.pastTextStatus,
          parentBranch: text.substring(str),
          parentCommitMessage: historyFile.parentCommitMessage,
          parentPastCommitMessage: historyFile.parentPastCommitMessage,
          parentBranchId: "",
          parentCommitMessageId: "",
          historyFileId: ""
        }])
      })
    }
  }

  const gitBranchM = (text :string, str :number) => {
    if (afterCommandMultipleStrings(text, str)?.length === 2
        && branches.some(branch => branch.branchName === afterCommandMultipleStrings(text, str)![0])) {
      setCurrentBranch({
        currentBranchName: afterCommandMultipleStrings(text, str)![1],
        currentBranchId: currentBranch.currentBranchId
      })
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
          parentBranchId: worktreeFile.parentBranchId,
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
          parentBranchId: indexFile.parentBranchId,
          indexFileId: indexFile.indexFileId
        }
        : indexFile
        ))
      setCommitMessages(commitMessages.map((commitMessage) =>
        commitMessage.parentBranch === afterCommandMultipleStrings(text, str)![0]
        ? {
          message: commitMessage.message,
          parentBranch: afterCommandMultipleStrings(text, str)![1],
          parentBranchId: commitMessage.parentBranchId,
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
          parentBranchId: repositoryFile.parentBranchId,
          parentCommitMessageId: repositoryFile.parentCommitMessageId,
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

    if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch.currentBranchName === text.substring(str)) {
      setAddText(`error: Cannot delete the branch '${text.substring(str)}' which you are currently on.`)
    } else if (branches.some(branch => branch.branchName === text.substring(str))
            && currentBranch.currentBranchName !== text.substring(str)
            && deleteBranchParentWorktreeFiles.every(deleteBranchParentWorktreeFiles => currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentWorktreeFiles.fileName))
            && deleteBranchParentIndexFiles.every(deleteBranchParentIndexFile => currentBranchParentIndexFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentIndexFile.fileName))) {
      setBranches(
        branches.filter((branch) => branch.branchName !== text.substring(str))
      )
      setWorktreeFiles(
        worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== text.substring(str))
      )
      setIndexFiles(
        indexFiles.filter((indexFile) => indexFile.parentBranch !== text.substring(str))
      )
      setCommitMessages(
        commitMessages.filter((commitMessage) => commitMessage.parentBranch !== text.substring(str))
      )
      setRepositoryFiles(
        repositoryFiles.filter((repositoryFile) => repositoryFile.parentBranch !== text.substring(str))
      )
      setFileHistoryForCansellCommits(
        fileHistoryForCansellCommits.filter((historyFile) => historyFile.parentBranch !== text.substring(str))
      )
    } else if (branches.some(branch => branch.branchName === text.substring(str))
      && currentBranch.currentBranchName !== text.substring(str)
      && (!deleteBranchParentWorktreeFiles.every(deleteBranchParentWorktreeFiles => currentBranchParentWorktreeFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentWorktreeFiles.fileName)) || !deleteBranchParentIndexFiles.every(deleteBranchParentIndexFile => currentBranchParentIndexFiles.some(worktreeFile => worktreeFile.fileName === deleteBranchParentIndexFile.fileName)))
    ) {
      setAddText(`error: The branch '${text.substring(str)}' is not fully merged. If you are sure you want to delete it, run 'git branch -D ${text.substring(str)}'.`)
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
    }
  }

  const gitBranchForceD = (text :string, str :number) => {
    if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch.currentBranchName === text.substring(str)) {
      setAddText(`error: Cannot delete the branch '${text.substring(str)}' which you are currently on.`)
    } else if (branches.some(branch => branch.branchName === text.substring(str)) && currentBranch.currentBranchName !== text.substring(str)) {
      setBranches(
        branches.filter((branch) => branch.branchName !== text.substring(str))
      )
      setWorktreeFiles(
        worktreeFiles.filter((worktreeFile) => worktreeFile.parentBranch !== text.substring(str))
      )
      setIndexFiles(
        indexFiles.filter((indexFile) => indexFile.parentBranch !== text.substring(str))
      )
      setCommitMessages(
        commitMessages.filter((commitMessage) => commitMessage.parentBranch !== text.substring(str))
      )
      setRepositoryFiles(
        repositoryFiles.filter((repositoryFile) => repositoryFile.parentBranch !== text.substring(str))
      )
      setFileHistoryForCansellCommits(
        fileHistoryForCansellCommits.filter((historyFile) => historyFile.parentBranch !== text.substring(str))
      )
    } else {
      setAddText(`error: branch '${text.substring(str)}' not found.`)
    }
  }

  const gitCheckout = (text :string, str :number) => {
    if (branches.some(branch => branch.branchName === text.substring(str))) {
      setCurrentBranch({
        currentBranchId: branches.filter(branch => branch.branchName === text.substring(str))[0].branchId,
        currentBranchName: text.substring(str)
      })
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const gitCheckoutB = (text :string, str :number) => {
    if (afterCommandBranchName.test(text.substring(str))) {
      gitBranch(text, str)
      setCurrentBranch({
        currentBranchId: "",
        currentBranchName: text.substring(str)
      })
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const gitReset = () => {
    setIndexFiles(
      indexFiles.filter(indexFile => repositoryFiles.some(repositoryFile =>
        repositoryFile.fileName === indexFile.fileName
        && repositoryFile.parentBranch === indexFile.parentBranch)
      )
    )
    currentBranchParentRepositoryFiles.forEach(repositoryFile =>
      setIndexFiles(indexFile =>
        indexFile
        .map((indexFile) =>
          indexFile.parentBranch === currentBranch.currentBranchName
          && repositoryFile.fileName === indexFile.fileName
          && repositoryFile.textStatus !== indexFile.textStatus
          ?{
            fileName: indexFile.fileName,
            parentBranch: indexFile.parentBranch,
            textStatus: repositoryFile.textStatus,
            parentBranchId: indexFile.parentBranchId,
            indexFileId: indexFile.indexFileId
          }
          : indexFile
        )
      )
    )
    currentBranchParentRepositoryFiles.forEach(repositoryFile =>
      {if (!currentBranchParentIndexFiles.some(indexFile => indexFile.fileName === repositoryFile.fileName)) {
        setIndexFiles(indexFiles => [...indexFiles,{
          fileName: repositoryFile.fileName,
          parentBranch: repositoryFile.parentBranch,
          textStatus: repositoryFile.textStatus,
          parentBranchId: repositoryFile.parentBranchId,
          indexFileId: ""
        }])
      }}
    )
  }

  const gitResetOption = (text :string, str :number, option:string) => {
    const resetNunber = Number(text.substring(str))
    const resetedCommitMessages :any = []
    const resetedHistoryFiles :any = []
    const forResetCurrentBranchCommitMessages = commitMessages.filter((commitMessage) => commitMessage.parentBranch === currentBranch.currentBranchName)
    const commitMessageLength = forResetCurrentBranchCommitMessages.length
    if (commitMessageLength >= resetNunber && forResetCurrentBranchCommitMessages[forResetCurrentBranchCommitMessages.length -1]) {
      for (let i = 0; i < resetNunber; i++){
        const lastestFileHistoryForCansellCommits = fileHistoryForCansellCommits.filter(fileHistory =>
          fileHistory.parentCommitMessage === forResetCurrentBranchCommitMessages[forResetCurrentBranchCommitMessages.length -1].message
        )

        lastestFileHistoryForCansellCommits.forEach(fileHistoryForCansellCommit =>
          repositoryFiles.forEach((repositoryFile) =>
          {if ((fileHistoryForCansellCommit.parentCommitMessage === repositoryFile.parentCommitMessage && repositoryFile.parentBranch === currentBranch.currentBranchName && fileHistoryForCansellCommit.parentBranch === currentBranch.currentBranchName) || fileHistoryForCansellCommit.fileStatus === "deleted") {
            resetedHistoryFiles.push(fileHistoryForCansellCommit)
          }})
        )
        lastestFileHistoryForCansellCommits.forEach(fileHistoryForCansellCommit =>
          setRepositoryFiles(repositoryFile =>
            repositoryFile.map((repositoryFile) =>
              fileHistoryForCansellCommit.pastTextStatus
              && fileHistoryForCansellCommit.fileName === repositoryFile.fileName
              && fileHistoryForCansellCommit.parentCommitMessage === repositoryFile.parentCommitMessage
              && repositoryFile.parentBranch === currentBranch.currentBranchName
              && fileHistoryForCansellCommit.parentBranch === currentBranch.currentBranchName
              ? {
                fileName: repositoryFile.fileName,
                textStatus: fileHistoryForCansellCommit.pastTextStatus,
                parentBranch: fileHistoryForCansellCommit.parentBranch,
                parentCommitMessage: fileHistoryForCansellCommit.parentPastCommitMessage,
                parentBranchId: repositoryFile.parentBranchId,
                parentCommitMessageId: repositoryFile.parentCommitMessageId,
                repositoryFileId: repositoryFile.repositoryFileId
                }
              : !fileHistoryForCansellCommit.pastTextStatus
                && fileHistoryForCansellCommit.fileName === repositoryFile.fileName
                && fileHistoryForCansellCommit.parentCommitMessage === repositoryFile.parentCommitMessage
                && repositoryFile.parentBranch === currentBranch.currentBranchName
              ? {
                fileName: "",
                textStatus: "",
                parentBranch: "",
                parentCommitMessage: "",
                parentBranchId: "",
                parentCommitMessageId: "",
                repositoryFileId: ""
                }
              : repositoryFile
          )))
          lastestFileHistoryForCansellCommits.forEach(fileHistoryForCansellCommit =>
            currentBranchParentCommitMessages.forEach(commitMessage =>
              {if (commitMessage.message === fileHistoryForCansellCommit.parentPastCommitMessage && !repositoryFiles.some(repositoryFile => repositoryFile.fileName === fileHistoryForCansellCommit.fileName && repositoryFile.parentBranch === fileHistoryForCansellCommit.parentBranch)) {
                setRepositoryFiles(repositoryFiles => [...repositoryFiles,{
                  fileName: fileHistoryForCansellCommit.fileName,
                  textStatus: fileHistoryForCansellCommit.pastTextStatus,
                  parentBranch: currentBranch.currentBranchName,
                  parentCommitMessage: fileHistoryForCansellCommit.parentPastCommitMessage,
                  parentBranchId: currentBranch.currentBranchId,
                  parentCommitMessageId: commitMessage.commitMessageId,
                  repositoryFileId: ""
                }])
              }}
            )
          )
          if (option === "mixed" || option === "hard") {
            console.log("mixedかhard")
            lastestFileHistoryForCansellCommits.forEach(fileHistoryForCansellCommit =>
              setIndexFiles((indexFile) =>
                indexFile.map((indexFile) =>
                fileHistoryForCansellCommit.pastTextStatus
                && fileHistoryForCansellCommit.fileName === indexFile.fileName
                && indexFile.parentBranch === currentBranch.currentBranchName
                && fileHistoryForCansellCommit.parentBranch === currentBranch.currentBranchName
                ? {
                  fileName: indexFile.fileName,
                  textStatus: fileHistoryForCansellCommit.pastTextStatus,
                  parentBranch: fileHistoryForCansellCommit.parentBranch,
                  parentBranchId: indexFile.parentBranchId,
                  indexFileId: indexFile.indexFileId
                  }
                : !fileHistoryForCansellCommit.pastTextStatus
                  && fileHistoryForCansellCommit.fileName === indexFile.fileName
                  && indexFile.parentBranch === currentBranch.currentBranchName
                ? {
                  fileName: "",
                  textStatus: "",
                  parentBranch: "",
                  parentBranchId: "",
                  indexFileId: ""
                  }
                : indexFile
                )
              )
            )
            lastestFileHistoryForCansellCommits.forEach(fileHistoryForCansellCommit =>
              {if (!indexFiles.some(indexFile => indexFile.fileName === fileHistoryForCansellCommit.fileName && indexFile.parentBranch === currentBranch.currentBranchName) && fileHistoryForCansellCommit.fileStatus === "deleted" ) {
                setIndexFiles(indexFiles => [...indexFiles,{
                  fileName: fileHistoryForCansellCommit.fileName,
                  textStatus: fileHistoryForCansellCommit.pastTextStatus,
                  parentBranch: fileHistoryForCansellCommit.parentBranch,
                  parentBranchId: fileHistoryForCansellCommit.parentBranchId,
                  indexFileId: ""
                }])
              }}
            )
          }
          if (option === "hard") {
            console.log("hardだけ")
            lastestFileHistoryForCansellCommits.forEach(fileHistoryForCansellCommit =>
              setWorktreeFiles((worktreeFile) =>
              worktreeFile.map((worktreeFile) =>
                fileHistoryForCansellCommit.pastTextStatus
                && fileHistoryForCansellCommit.fileName === worktreeFile.fileName
                && worktreeFile.parentBranch === currentBranch.currentBranchName
                && fileHistoryForCansellCommit.parentBranch === currentBranch.currentBranchName
                ? {
                  fileName: worktreeFile.fileName,
                  textStatus: fileHistoryForCansellCommit.pastTextStatus,
                  parentBranch: fileHistoryForCansellCommit.parentBranch,
                  parentBranchId: worktreeFile.parentBranchId,
                  worktreeFileId: worktreeFile.worktreeFileId
                  }
                : !fileHistoryForCansellCommit.pastTextStatus
                  && fileHistoryForCansellCommit.fileName === worktreeFile.fileName
                  && worktreeFile.parentBranch === currentBranch.currentBranchName
                ? {
                  fileName: "",
                  textStatus: "",
                  parentBranch: "",
                  parentBranchId: "",
                  worktreeFileId: ""
                  }
                : worktreeFile
                )
              )
            )
            lastestFileHistoryForCansellCommits.forEach(fileHistoryForCansellCommit =>
              {if (!worktreeFiles.some(worktreeFile => worktreeFile.fileName === fileHistoryForCansellCommit.fileName && worktreeFile.parentBranch === currentBranch.currentBranchName) && fileHistoryForCansellCommit.fileStatus === "deleted" ) {
                setWorktreeFiles(worktreeFiles => [...worktreeFiles,{
                  fileName: fileHistoryForCansellCommit.fileName,
                  textStatus: fileHistoryForCansellCommit.pastTextStatus,
                  parentBranch: fileHistoryForCansellCommit.parentBranch,
                  parentBranchId: fileHistoryForCansellCommit.parentBranchId,
                  worktreeFileId: ""
                }])
              }}
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
          parentBranchId: exceptCurrentBranchParentWorktreeFile.parentBranchId,
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
          parentBranchId: exceptCurrentBranchParentIndexFile.parentBranchId,
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
          parentBranchId: exceptCurrentBranchParentIndexFile.parentBranchId,
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
          parentBranchId: exceptCurrentBranchParentWorktreeFile.parentBranchId,
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
          parentBranch: currentBranch.currentBranchName,
          textStatus: "おはよう",
          parentBranchId: currentBranch.currentBranchId,
          worktreeFileId: ""
        }])
      ))
    } else {
      setAddText(`error: pathspec '${text.substring(str)}' did not match any file(s) known to git`)
    }
  }

  const gitRemoteAdd = () => {
    setRemoteAdd("added remote")
  }

  const gitSetUp = () => {
    setGitInit("Initialized empty Git repository")
    setCurrentBranch({
      currentBranchName: "master",
      currentBranchId: ""
    })
    setBranches([{
      branchName: "master",
      branchId: ""
    }])
  }

  const limitDataErrorMessage = (data: string, num: number) => setAddText(`error: 申し訳ありません。DBの容量確保のため${data}を作成できる数は${num}つまでになっています。`)
  const resetFailedErrorMessage = () => setAddText(`error: 申し訳ありません。DBの容量確保のためgit resetで指定できる数は3以下の数字です。`)

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
              if (gitInit === "Initialized empty Git repository") {
                if (text.startsWith("git add .") || text.startsWith("git add -A")){
                  checkDatacount(indexFiles) + checkGitAddACount <= 8 ? gitAddA() : limitDataErrorMessage("indexFiles", 8)
                } else if (text === `git remote add https://git-used-to.com/${currentUser?.userName}`){
                  gitRemoteAdd()
                } else if (text.startsWith("git add ")){
                  checkMultiData(text, 8, indexFiles) <= 8 ? gitAdd(text, 8) : limitDataErrorMessage("indexFiles", 8)
                } else if (text.startsWith("git commit --amend")){
                  gitCommitAmend(text, 19)
                } else if (text.startsWith("git commit -m")){
                  checkDatacount(repositoryFiles) <= 8
                    && checkDatacount(commitMessages) <= 10
                  ? gitCommitM(text, 14)
                  : limitDataErrorMessage("repositoryFiles", 8)
                } else if (text === `git push origin ${currentBranch.currentBranchName}`) {
                  checkDatacount(remoteBranches, "remoteBranchName") <= 3
                    && checkDatacount(remoteCommitMessages, "parentRemoteBranch") <= 10
                    && checkDatacount(remoteRepositoryFiles, "parentRemoteBranch") <= 16
                  ? gitPush()
                  : limitDataErrorMessage("repositoryFiles", 16)
                } else if (text.startsWith("git push --delete origin")) {
                  gitPushDelete(text, 25)
                } else if (text.startsWith("git push origin :")) {
                  gitPushDelete(text, 17)
                } else if (text.startsWith("git branch -m")) {
                  gitBranchM(text, 14)
                } else if (text.startsWith("git branch -D")) {
                  gitBranchForceD(text, 14)
                } else if (text.startsWith("git branch -d")) {
                  gitBranchD(text, 14)
                } else if (text.startsWith("git branch ") && afterCommandBranchName.test(text.substring(11))){
                  checkBranchCount < 3 ? gitBranch(text, 11) : limitDataErrorMessage("branch", 3)
                } else if (text.startsWith("git checkout -b ")) {
                  checkBranchCount < 3 ? gitCheckoutB(text, 16) : limitDataErrorMessage("branch", 3)
                } else if (text.startsWith("git checkout ")) {
                  gitCheckout(text, 13)
                } else if (text.startsWith("touch ")) {
                  checkMultiData(text, 6, worktreeFiles) <= 8 ? touch(text, 6) : limitDataErrorMessage("worktreeFiles", 8)
                } else if (text.startsWith("git rm --cashed")) {
                  gitRmCashed(text, 16)
                } else if (text.startsWith("git reset --mixed HEAD~")) {
                  Number(text.substring(23)) <= 4 ? gitResetOption(text, 23, "mixed") : resetFailedErrorMessage()
                } else if (text.startsWith("git reset --hard HEAD~")) {
                  Number(text.substring(22)) <= 4 ? gitResetOption(text, 22, "hard") : resetFailedErrorMessage()
                } else if (text.startsWith("git reset --soft HEAD~")) {
                  Number(text.substring(22)) <= 4 ? gitResetOption(text, 22, "soft") : resetFailedErrorMessage()
                } else if (text.startsWith("git reset")) {
                  gitReset()
                } else if (text.startsWith("git rm")) {
                  gitRm(text, 7)
                } else if (text.startsWith("rm")) {
                  Rm(text, 3)
                } else {
                  setAddText(`zsh: command not found: ${text}`)
                }
              } else {
                text === "git init" ? gitSetUp() : setAddText(`error:fatal: Not a git repository (or any of the parent directories): .git`)
              }
            setText("")
          }}}
        />
  )
}

export default InputCommand
