import React, { useContext } from "react";
import { QuizContext } from "./CreateQuiz";
import { Button, makeStyles, Theme } from "@material-ui/core"
import { AboutQuizData } from "interfaces";
import { createQuiz } from "lib/api/quizzes";
import { createQuizFirstOrLast } from "lib/api/quiz_first_or_lasts";
import { createQuizBranch, deleteQuizBranch, updateQuizBranch } from "lib/api/quiz_branches";
import { createQuizWorktreeFile, deleteQuizWorktreeFile, updateQuizWorktreeFile } from "lib/api/quiz_worktree_files";
import { createQuizIndexFile, deleteQuizIndexFile, updateQuizIndexFile } from "lib/api/quiz_index_files";
import { createQuizCommitMessage, deleteQuizCommitMessage } from "lib/api/quiz_commit_messages";
import { CreateQuizHistoryOfCommittedFile, deleteQuizHistoryOfCommittedFile } from "lib/api/quiz_history_of_committed_files";
import { createQuizRepositoryFile, deleteQuizRepositoryFile } from "lib/api/quiz_repository_files";
import { createQuizRemoteBranch, deleteQuizRemoteBranch } from "lib/api/quiz_remote_branches";
import { createQuizRemoteRepositoryFile, deleteQuizRemoteRepositoryFile } from "lib/api/quiz_remote_repository_file";
import { createQuizRemoteCommitMessage, deleteQuizRemoteCommitMessage } from "lib/api/quiz_remote_commit_messages";
import { AuthContext } from "App";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { createQuizAnswerRecord } from "lib/api/quiz_answer_records";
import { getUserQuizzes } from "lib/api/users";

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    margin: theme.spacing(2),
    marginTop: theme.spacing(0.5),
    flexGrow: 1,
    width: "90%",
    textTransform: "none",
    backgroundColor: "#f5f5f5",
  }
}))

const CreateOrUpdateQuizButton: React.FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const { currentUser } = useContext(AuthContext)
  const history = useHistory()
  const classes = useStyles()
  const {
    userTitle,
    userQuizzesCount,
    quizTitle,
    quizIntroduction,
    quizFirstOrLastId,
    branches,
    initialBranches,
    remoteBranches,
    gitInit,
    initialRemoteBranches,
    worktreeFiles,
    initialWorktreeFiles,
    indexFiles,
    initialIndexFiles,
    repositoryFiles,
    initialRepositoryFiles,
    remoteRepositoryFiles,
    initialRemoteRepositoryFiles,
    fileHistoryForCansellCommits,
    initialFileHistoryForCansellCommits,
    commitMessages,
    initialCommitMessages,
    remoteCommitMessages,
    initialRemoteCommitMessages,
    answerBranches,
    answerRemoteBranches,
    answerWorktreeFiles,
    answerIndexFiles,
    answerRepositoryFiles,
    answerRemoteRepositoryFiles,
  } = useContext(QuizContext)

  const quizType = "user"

  const aboutQuizData: AboutQuizData | undefined  =
  location.pathname === "/quiz"
  ? {
      quizTitle: quizTitle,
      quizIntroduction: quizIntroduction,
      quizType: quizType,
      userId: currentUser?.id
    }
  : undefined

  const handleCreateQuizSubmit = (argBranches :any, argsWorktreeFiles :any, argIndexFiles :any, argCommitMessages :any, argFileHistoryForCansellCommits :any, argRepositoryFiles :any, argRemoteBranches :any, argRemoteCommitMessages :any, argRemoteRepositoryFiles :any) => async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const aboutQuizRes = await createQuiz(aboutQuizData)

      const quizFirtsOrLastData: any =
        location.pathname === "/quiz"
        ? [
            {
              quizFirstOrLastStatus: "last",
              quizId: aboutQuizRes?.data.data.id
            },
            {
              quizFirstOrLastStatus: "first",
              quizId: aboutQuizRes?.data.data.id
            }
          ]
        : undefined

      const quizFirtsOrLastRes = await createQuizFirstOrLast(quizFirtsOrLastData)

      const quizBranchData = argBranches.map((branch :any) => ({
        quizBranchName: branch.branchName,
        quizFirstOrLastId: location.pathname === "/quiz" ? quizFirtsOrLastRes?.data.data[0].id : quizFirstOrLastId
      }))

      const quizBranchRes = await createQuizBranch(quizBranchData)

      const quizWorktreeFileData = quizBranchRes !== undefined
      ? quizBranchRes.data.data.map((branch :any) =>(
          argsWorktreeFiles
          .filter((worktreeFile :any) => worktreeFile.parentBranch === branch.quizBranchName)
          .map((filteredWorktreeFile :any) =>({
            quizWorktreeFileName: filteredWorktreeFile.fileName,
            quizWorktreeFileTextStatus: filteredWorktreeFile.textStatus,
            quizBranchId: branch.id
          }))
        ))
      : []

      const quizWorktreeFileRes = await createQuizWorktreeFile(quizWorktreeFileData.flat())

      const quizIndexFileData = quizBranchRes !== undefined
      ? quizBranchRes.data.data.map((branch :any) =>(
          argIndexFiles
          .filter((indexFile :any) => indexFile.parentBranch === branch.quizBranchName)
          .map((filteredIndexFile :any) =>({
            quizIndexFileName: filteredIndexFile.fileName,
            quizIndexFileTextStatus: filteredIndexFile.textStatus,
            quizBranchId: branch.id
          }))
        ))
      : []

      const quizIndexFileRes = await createQuizIndexFile(quizIndexFileData.flat())

      const QuizCommitMessageData = quizBranchRes !== undefined
      ? quizBranchRes.data.data.map((branch :any) =>(
          argCommitMessages
          .filter((commitMessage :any) => commitMessage.parentBranch === branch.quizBranchName)
          .map((commitMessage :any) =>({
            quizCommitMessage: commitMessage.message,
            quizBranchId: branch.id
          }))
        ))
      : []

      const QuizCommitMessageRes = await createQuizCommitMessage(QuizCommitMessageData.flat())

      const quizHistoryOfCommittedFileData = QuizCommitMessageRes !== undefined
      ? QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
        argFileHistoryForCansellCommits
        .filter((historyFile :any) =>
          historyFile.parentCommitMessage === commitMessage.quizCommitMessage
          && historyFile.fileName !== "")
        .map((filteredHistoryFile :any) =>({
          quizHistoryOfCommittedFileName: filteredHistoryFile.fileName,
          quizHistoryOfCommittedFileStatus: filteredHistoryFile.fileStatus,
          quizHistoryOfCommittedFileTextStatus: filteredHistoryFile.textStatus,
          quizHistoryOfCommittedFilePastTextStatus: filteredHistoryFile.pastTextStatus,
          quizHistoryOfCommittedFileParentPastCommitMessage: filteredHistoryFile.parentPastCommitMessage,
          quizCommitMessageId: commitMessage.id,
          quizBranchId: commitMessage.quizBranchId,
        }))
      ))
      : []

      const flatedQuizHistoryOfCommittedFileData = quizHistoryOfCommittedFileData.flat()

      const removeDuplicateQuizHistoryOfCommittedFileData = flatedQuizHistoryOfCommittedFileData.filter((e :any, index :any, self :any) => {
        return self.findIndex((el :any) =>
          el.quizHistoryOfCommittedFileName === e.quizHistoryOfCommittedFileName
          && el.quizHistoryOfCommittedFileTextStatus === e.quizHistoryOfCommittedFileTextStatus
          && el.quizHistoryOfCommittedFilePastTextStatus === e.quizHistoryOfCommittedFilePastTextStatus
          && el.quizHistoryOfCommittedFileParentPastCommitMessage === e.quizHistoryOfCommittedFileParentPastCommitMessage
          && el.quizCommitMessageId === e.quizCommitMessageId
          && el.quizBranchId === e.quizBranchId
        ) === index;
      });

      const quizHistoryOfCommittedFileRes = await CreateQuizHistoryOfCommittedFile(removeDuplicateQuizHistoryOfCommittedFileData)

      const quizRepositoryFileData = QuizCommitMessageRes !== undefined
      ? QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
        argRepositoryFiles
        .filter((repositoryFile :any) =>
          repositoryFile.parentCommitMessage === commitMessage.quizCommitMessage
          && repositoryFile.fileName !== "")
        .map((filteredRepositoryFile :any) =>({
          quizRepositoryFileName: filteredRepositoryFile.fileName,
          quizRepositoryFileTextStatus: filteredRepositoryFile.textStatus,
          quizCommitMessageId: commitMessage.id,
          quizBranchId: commitMessage.quizBranchId
        }))
      ))
      : []

      const flatedQuizRepositoryFileData = quizRepositoryFileData.flat()

      const removeDuplicateQuizRepositoryFileData = flatedQuizRepositoryFileData.filter((e :any, index :any, self :any) => {
        return self.findIndex((el :any) =>
          el.quizRepositoryFileName === e.quizRepositoryFileName
          && el.quizRepositoryFileTextStatus === e.quizRepositoryFileTextStatus
          && el.quizCommitMessageId === e.quizCommitMessageId
          && el.quizBranchId === e.quizBranchId
        ) === index;
      });

      const quizRepositoryFileRes = await createQuizRepositoryFile(removeDuplicateQuizRepositoryFileData)

      const quizRemoteBranchData =
        argRemoteBranches
        .filter((branch :any) => branch.remoteBranchName)
        .map((branch :any) => ({
          quizRemoteBranchName: branch.remoteBranchName,
          quizFirstOrLastId: quizFirtsOrLastRes === undefined ? quizFirstOrLastId : quizFirtsOrLastRes.data.data[0].id
        }
      ))

      const quizRemoteBranchRes = await createQuizRemoteBranch(quizRemoteBranchData)

      const QuizRemoteCommitMessageData = quizRemoteBranchRes !== undefined
      ? quizRemoteBranchRes.data.data.map((branch :any) =>(
          argRemoteCommitMessages
          .filter((commitMessage :any) => commitMessage.parentRemoteBranch === branch.quizRemoteBranchName)
          .map((commitMessage :any) =>({
            quizRemoteCommitMessage: commitMessage.remoteMessage,
            quizRemoteBranchId: branch.id
          }))
        ))
      : []

      const QuizRemoteCommitMessageRes = await createQuizRemoteCommitMessage(QuizRemoteCommitMessageData.flat())

      const quizRemoteRepositoryFileData = QuizRemoteCommitMessageRes !== undefined
      ? QuizRemoteCommitMessageRes.data.data.map((commitMessage :any) =>(
        argRemoteRepositoryFiles
        .filter((repositoryFile :any) =>
          repositoryFile.parentRemoteCommitMessage === commitMessage.quizRemoteCommitMessage
          && repositoryFile.fileName !== "")
        .map((filteredRepositoryFile :any) =>({
          quizRemoteRepositoryFileName: filteredRepositoryFile.fileName,
          quizRemoteRepositoryFileTextStatus: filteredRepositoryFile.textStatus,
          quizRemoteCommitMessageId: commitMessage.id,
          quizRemoteBranchId: commitMessage.quizRemoteBranchId
        }))
      ))
      : []

      const flatedQuizRemoteRepositoryFileData = quizRemoteRepositoryFileData.flat()

      const removeDuplicateQuizRemoteRepositoryFileData = flatedQuizRemoteRepositoryFileData.filter((e :any, index :any, self :any) => {
        return self.findIndex((el :any) =>
          el.quizRemoteRepositoryFileName === e.quizRemoteRepositoryFileName
          && el.quizRemoteRepositoryFileTextStatus === e.quizRemoteRepositoryFileTextStatus
          && el.quizRemoteCommitMessageId === e.quizRemoteCommitMessageId
          && el.quizRemoteBranchId === e.quizRemoteBranchId
        ) === index;
      });

      const quizRemoteRepositoryFileRes = await createQuizRemoteRepositoryFile(removeDuplicateQuizRemoteRepositoryFileData)

      console.log(aboutQuizRes)
      console.log(quizFirtsOrLastRes)
      console.log(quizBranchRes)
      console.log(quizWorktreeFileRes)
      console.log(quizIndexFileRes)
      console.log(QuizCommitMessageRes)
      console.log(quizHistoryOfCommittedFileRes)
      console.log(quizRepositoryFileRes)
      console.log(quizRemoteBranchRes)
      console.log(QuizRemoteCommitMessageRes)
      console.log(quizRemoteRepositoryFileRes)
      console.log("create quiz success!!")

      {location.pathname === "/quiz" && history.push(`/quiz/setup/${aboutQuizRes?.data.data.id}`)}

    } catch (err) {
      console.log(err)
    }
  }


  //ブランチidと自身のidを持っていない配列
  const createBranches = branches.filter(branch => branch.branchName && !branch.branchId)
  const createWorktreeFiles = worktreeFiles.filter(worktreeFile => worktreeFile.fileName && !worktreeFile.worktreeFileId && !worktreeFile.parentBranchId)
  const createIndexFiles = indexFiles.filter(indexFile => indexFile.fileName && !indexFile.indexFileId && !indexFile.parentBranchId)
  const createRepositoryFiles = repositoryFiles.filter(repositoryFile => repositoryFile.fileName && !repositoryFile.repositoryFileId && !repositoryFile.parentBranchId && !repositoryFile.parentCommitMessageId)
  const createCommitMessages = commitMessages.filter(commitMessage => commitMessage.message && !commitMessage.commitMessageId && !commitMessage.parentBranchId)
  const createFileHistoryForCansellCommits = fileHistoryForCansellCommits.filter(historyFile => historyFile.fileName && !historyFile.historyFileId && !historyFile.parentBranchId && !historyFile.parentCommitMessageId)
  const createRemoteBranches = remoteBranches.filter(remoteBranch => remoteBranch.remoteBranchName && !remoteBranch.remoteBranchId)
  const createRemoteCommitMessages = remoteCommitMessages.filter(remoteCommitMessage => remoteCommitMessage.remoteMessage && !remoteCommitMessage.remoteCommitMessageId && !remoteCommitMessage.parentRemoteBranchId)
  const createRemoteRepositoryFiles = remoteRepositoryFiles.filter(remoteRepositoryFile => remoteRepositoryFile.fileName && !remoteRepositoryFile.remoteRepositoryFileId && !remoteRepositoryFile.parentRemoteBranchId && !remoteRepositoryFile.parentRemoteCommitMessageId)

  //ブランチidは持っていて自身のidを持っていない配列
  const createNewBranchWorktreeFiles =
    worktreeFiles
    .filter(worktreeFile => !worktreeFile.worktreeFileId && worktreeFile.parentBranchId)
    .map(filteredWorktreeFile =>({
      quizWorktreeFileName: filteredWorktreeFile.fileName,
      quizWorktreeFileTextStatus: filteredWorktreeFile.textStatus,
      quizBranchId: filteredWorktreeFile.parentBranchId
    }))
  const createNewBranchIndexFiles =
    indexFiles
    .filter(indexFile => !indexFile.indexFileId && indexFile.parentBranchId)
    .map(filteredIndexFile =>({
      quizIndexFileName: filteredIndexFile.fileName,
      quizIndexFileTextStatus: filteredIndexFile.textStatus,
      quizBranchId: filteredIndexFile.parentBranchId
    }))
  const createNewBranchCommitMessages =
    commitMessages
    .filter(commitMessage => !commitMessage.commitMessageId && commitMessage.parentBranchId)
    .map((filtedcommitMessage :any) =>({
      quizCommitMessage: filtedcommitMessage.message,
      quizBranchId: filtedcommitMessage.parentBranchId
    }))
  const createNewBranchRemoteCommitMessages =
    remoteCommitMessages
    .filter(remoteCommitMessage => !remoteCommitMessage.remoteCommitMessageId && remoteCommitMessage.parentRemoteBranchId)
    .map((filtedcommitMessage :any) =>({
      quizRemoteCommitMessage: filtedcommitMessage.remoteMessage,
      quizRemoteBranchId: filtedcommitMessage.parentRemoteBranchId
    }))

  const updateBranches =
    branches.filter(branch => initialBranches.some(initBranch =>
      branch.branchName !== initBranch.branchName
      && branch.branchId === initBranch.branchId
      && branch.branchId
      && branch.branchName
    ))
  const updateWorktreeFiles =
    worktreeFiles.filter(worktreeFile => initialWorktreeFiles.some(initWorkfile =>
      initWorkfile.fileName === worktreeFile.fileName
      && initWorkfile.parentBranch === worktreeFile.parentBranch
      && initWorkfile.textStatus !== worktreeFile.textStatus
      && initWorkfile.worktreeFileId === worktreeFile.worktreeFileId
    ))
  const updateIndexFiles =
    indexFiles.filter(indexFile => initialIndexFiles.some(initialIndexFile =>
      indexFile.fileName === initialIndexFile.fileName
      && indexFile.parentBranch === initialIndexFile.parentBranch
      && indexFile.textStatus !== initialIndexFile.textStatus
      && indexFile.indexFileId === initialIndexFile.indexFileId
    ))

  const deleteBranches =
    initialBranches.filter(initialBranch => !branches.some(branch =>
      initialBranch.branchId === branch.branchId
    ))
  const deleteCommitMessages =
    initialCommitMessages.filter(initCommit =>
      !commitMessages.some(commitMessage => initCommit.commitMessageId === commitMessage.commitMessageId)
      && !deleteBranches.some(deleteBranch => initCommit.parentBranch === deleteBranch.branchName)
    )
  const deleteWorktreeFiles =
    initialWorktreeFiles.filter(initWorkfile =>
      !worktreeFiles.some(worktreeFile => initWorkfile.worktreeFileId === worktreeFile.worktreeFileId)
      && !deleteBranches.some(deleteBranch => initWorkfile.parentBranch === deleteBranch.branchName)
    )
  const deleteIndexFiles =
    initialIndexFiles.filter(initIndexFile =>
      !indexFiles.some(indexFile => initIndexFile.indexFileId === indexFile.indexFileId
      && !deleteBranches.some(deleteBranch => initIndexFile.parentBranch === deleteBranch.branchName)
    ))
  const deleteRepositoryFiles =
    initialRepositoryFiles.filter(initialRepositoryFile => !repositoryFiles.some(repositoryFile =>
      initialRepositoryFile.repositoryFileId === repositoryFile.repositoryFileId
      && !deleteBranches.some(deleteBranch => initialRepositoryFile.parentBranch === deleteBranch.branchName)
      && !deleteCommitMessages.some(deleteCommitMessage =>  initialRepositoryFile.parentCommitMessage === deleteCommitMessage.message)
    ))
  const deleteFileHistoryForCansellCommits =
    initialFileHistoryForCansellCommits.filter(initialFileHistoryForCansellCommit => !fileHistoryForCansellCommits.some(fileHistoryForCansellCommit =>
      initialFileHistoryForCansellCommit.historyFileId === fileHistoryForCansellCommit.historyFileId
      && !deleteBranches.some(deleteBranch => initialFileHistoryForCansellCommit.parentBranch === deleteBranch.branchName)
      && !deleteCommitMessages.some(deleteCommitMessage =>  initialFileHistoryForCansellCommit.parentCommitMessage === deleteCommitMessage.message)
    ))
  const deleteRemoteBranches =
    initialRemoteBranches.filter(initialRemoteBranch => !remoteBranches.some(remoteBranch =>
      initialRemoteBranch.remoteBranchId === remoteBranch.remoteBranchId
    ))
  const deleteRemoteCommitMessages =
    initialRemoteCommitMessages.filter(initialRemoteCommitMessage => !remoteCommitMessages.some(remoteCommitMessage =>
      initialRemoteCommitMessage.remoteCommitMessageId === remoteCommitMessage.remoteCommitMessageId
      && !deleteRemoteBranches.some(deleteRemoteBranches => initialRemoteCommitMessage.parentRemoteBranch === deleteRemoteBranches.remoteBranchName)
    ))
  const deleteRemoteRepositoryFiles =
    initialRemoteRepositoryFiles.filter(initialRemoteRepositoryFile => !remoteRepositoryFiles.some(remoteRepositoryFile =>
      remoteRepositoryFile.remoteRepositoryFileId === initialRemoteRepositoryFile.remoteRepositoryFileId
      && !deleteRemoteBranches.some(deleteRemoteBranches => initialRemoteRepositoryFile.parentRemoteBranch === deleteRemoteBranches.remoteBranchName)
      && !deleteCommitMessages.some(deleteCommitMessage =>  initialRemoteRepositoryFile.parentRemoteCommitMessage === deleteCommitMessage.message)
    ))


  const handleUpdateQuizData = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await Promise.all(deleteBranches.map(deleteBranch => deleteQuizBranch(Number(deleteBranch.branchId))))
      await Promise.all(deleteCommitMessages.map(deleteCommitMessage => deleteQuizCommitMessage(Number(deleteCommitMessage.commitMessageId))))
      await Promise.all(deleteWorktreeFiles.map(deleteWorktreeFile => deleteQuizWorktreeFile(Number(deleteWorktreeFile.worktreeFileId))))
      await Promise.all(deleteIndexFiles.map(deleteIndexFile => deleteQuizIndexFile(Number(deleteIndexFile.indexFileId))))
      await Promise.all(deleteRepositoryFiles.map(deleteRepositoryFile => deleteQuizRepositoryFile(Number(deleteRepositoryFile.repositoryFileId))))
      await Promise.all(deleteFileHistoryForCansellCommits.map(deleteFileHistoryForCansellCommit => deleteQuizHistoryOfCommittedFile(Number(deleteFileHistoryForCansellCommit.historyFileId))))
      await Promise.all(deleteRemoteRepositoryFiles.map(deleteRemoteRepositoryFile => deleteQuizRemoteRepositoryFile(Number(deleteRemoteRepositoryFile.remoteRepositoryFileId))))
      await Promise.all(deleteRemoteCommitMessages.map(deleteRemoteCommitMessage => deleteQuizRemoteCommitMessage(Number(deleteRemoteCommitMessage.remoteCommitMessageId))))
      await Promise.all(deleteRemoteBranches.map(deleteRemoteBranch => deleteQuizRemoteBranch(Number(deleteRemoteBranch.remoteBranchId))))

      //新規作成用の関数(branchも新規作成の場合)
      await handleCreateQuizSubmit(
        createBranches,
        createWorktreeFiles,
        createIndexFiles,
        createCommitMessages,
        createFileHistoryForCansellCommits,
        createRepositoryFiles,
        createRemoteBranches,
        createRemoteCommitMessages,
        createRemoteRepositoryFiles
      )(e)
      // 既存ブランチ内の新規作成
      const quizWorktreeFileRes = await createQuizWorktreeFile(createNewBranchWorktreeFiles)
      const quizIndexFileRes = await createQuizIndexFile(createNewBranchIndexFiles)
      const QuizCommitMessageRes = await createQuizCommitMessage(createNewBranchCommitMessages)

      const createNewBranchFileHistoryForCansellCommits =
        QuizCommitMessageRes !== undefined
        ? QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
            fileHistoryForCansellCommits
            .filter((historyFile :any) =>
              historyFile.parentCommitMessage === commitMessage.quizCommitMessage
              && historyFile.fileName !== ""
              && historyFile.parentBranchId
              && !historyFile.historyFileId
              && !historyFile.parentCommitMessageId)
            .map((filteredHistoryFile :any) =>({
              quizHistoryOfCommittedFileName: filteredHistoryFile.fileName,
              quizHistoryOfCommittedFileStatus: filteredHistoryFile.fileStatus,
              quizHistoryOfCommittedFileTextStatus: filteredHistoryFile.textStatus,
              quizHistoryOfCommittedFilePastTextStatus: filteredHistoryFile.pastTextStatus,
              quizHistoryOfCommittedFileParentPastCommitMessage: filteredHistoryFile.parentPastCommitMessage,
              quizCommitMessageId: commitMessage.id,
              quizBranchId: filteredHistoryFile.parentBranchId,
            }))
          ))
        : []
      const quizHistoryOfCommittedFileRes = await CreateQuizHistoryOfCommittedFile(createNewBranchFileHistoryForCansellCommits.flat())

      const createNewBranchRepositoryFiles =
        QuizCommitMessageRes !== undefined
        ? QuizCommitMessageRes.data.data.map((commitMessage :any) =>(
            repositoryFiles
            .filter((repositoryFile :any) =>
              repositoryFile.parentCommitMessage === commitMessage.quizCommitMessage
              && repositoryFile.fileName !== ""
              && repositoryFile.parentBranchId
              && !repositoryFile.repositoryFileId
              && !repositoryFile.parentCommitMessageId)
            .map((filteredRepositoryFile :any) =>({
              quizRepositoryFileName: filteredRepositoryFile.fileName,
              quizRepositoryFileTextStatus: filteredRepositoryFile.textStatus,
              quizCommitMessageId: commitMessage.id,
              quizBranchId: filteredRepositoryFile.parentBranchId
            }))
          ))
        : []
      const quizRepositoryFileRes = await createQuizRepositoryFile(createNewBranchRepositoryFiles.flat())

      const QuizRemoteCommitMessageRes = await createQuizRemoteCommitMessage(createNewBranchRemoteCommitMessages)

      const createNewBranchRemoteRepositoryFiles =
      QuizRemoteCommitMessageRes !== undefined
      ? QuizRemoteCommitMessageRes.data.data.map((commitMessage :any) =>(
          remoteRepositoryFiles
          .filter((repositoryFile :any) =>
            repositoryFile.parentRemoteCommitMessage === commitMessage.quizRemoteCommitMessage
            && repositoryFile.fileName !== ""
            && repositoryFile.parentRemoteBranchId
            && !repositoryFile.remoteRepositoryFileId
            && !repositoryFile.parentRemoteCommitMessageId)
          .map((filteredRepositoryFile :any) =>({
            quizRemoteRepositoryFileName: filteredRepositoryFile.fileName,
            quizRemoteRepositoryFileTextStatus: filteredRepositoryFile.textStatus,
            quizRemoteCommitMessageId: commitMessage.id,
            quizRemoteBranchId: filteredRepositoryFile.parentRemoteBranchId
          }))
        ))
      : []
      const quizRemoteRepositoryFileRes = await createQuizRemoteRepositoryFile(createNewBranchRemoteRepositoryFiles.flat())

      updateBranches.forEach(updateBranch => {
        updateQuizBranch(
          Number(updateBranch.branchId),
          {
            quizBranchName: updateBranch.branchName,
            quizFirstOrLastId: Number(quizFirstOrLastId)
          }
        )
      })
      updateWorktreeFiles.forEach(updateWorktreeFile => {
        updateQuizWorktreeFile(
          Number(updateWorktreeFile.worktreeFileId),
          {
            quizWorktreeFileName: updateWorktreeFile.fileName,
            quizWorktreeFileTextStatus: updateWorktreeFile.textStatus,
            quizBranchId: Number(updateWorktreeFile.parentBranchId)
          }
        )
      })
      updateIndexFiles.forEach(updateIndexFile => {
        updateQuizIndexFile(
          Number(updateIndexFile.indexFileId),
          {
            quizIndexFileName: updateIndexFile.fileName,
            quizIndexFileTextStatus: updateIndexFile.textStatus,
            quizBranchId: Number(updateIndexFile.parentBranchId)
          }
        )
      })

      //確認
      console.log("既存ブランチからworkFile新規作成",quizWorktreeFileRes)
      console.log("既存ブランチからindexFile新規作成",quizIndexFileRes)
      console.log("既存ブランチからCommitMessage新規作成",QuizCommitMessageRes)
      console.log("既存ブランチからHistoryOfCommittedFile新規作成",quizHistoryOfCommittedFileRes)
      console.log("既存ブランチからRepositoryFile新規作成",quizRepositoryFileRes)
      console.log("既存ブランチからRemoteCommitMessage新規作成",QuizRemoteCommitMessageRes)
      console.log("既存ブランチからRemoteRepositoryFile新規作成",quizRemoteRepositoryFileRes)

      history.push(`/quiz/setup/${id}`)

    } catch (err) {
      console.log(err)
    }
  }

  const handleAnswerQuiz = async() => {
    const quizAnswerRecordData = {
      userId: Number(currentUser?.id),
      quizId: Number(id)
    }

    const checkTheAnswer = (objs :any) => (prop1 :string, prop2 :string, prop3 :string) => (answerObjs :any) =>
      answerObjs.every((answerObj :any) => objs.some((obj :any) => obj?.[prop1] === answerObj?.[prop1] && obj?.[prop2] === answerObj?.[prop2] && obj?.[prop3] === answerObj?.[prop3]))
      && objs.every((obj :any) => answerObjs.some((answerObj :any) => obj?.[prop1] === answerObj?.[prop1] && obj?.[prop2] === answerObj?.[prop2] && obj?.[prop3] === answerObj?.[prop3]))

    const removeEmptyArray = (objs :any, prop :string) => objs.filter((obj :any) => obj?.[prop])

    const removeEmptyBranches = removeEmptyArray(branches, "branchName")
    const removeEmptyAnsBranches = removeEmptyArray(answerBranches, "branchName")
    const removeEmptyWorktreeFiles = removeEmptyArray(worktreeFiles, "fileName")
    const removeEmptyAnswerWorktreeFiles = removeEmptyArray(answerWorktreeFiles, "fileName")
    const removeEmptyIndexFiles = removeEmptyArray(indexFiles, "fileName")
    const removeEmptyAnswerIndexFiles = removeEmptyArray(answerIndexFiles, "fileName")
    const removeEmptyRepositoryFiles = removeEmptyArray(repositoryFiles, "fileName")
    const removeEmptyAnswerRepositoryFiles = removeEmptyArray(answerRepositoryFiles, "fileName")
    const removeEmptyRemoteBranch = removeEmptyArray(remoteBranches, "remoteBranchName")
    const removeEmptyAnsRemoteBranch = removeEmptyArray(answerRemoteBranches, "remoteBranchName")
    const removeEmptyRemoteRepositoryFiles = removeEmptyArray(remoteRepositoryFiles, "fileName")
    const removeEmptyAnswerRemoteRepositoryFiles = removeEmptyArray(answerRemoteRepositoryFiles, "fileName")

    if (
      checkTheAnswer(removeEmptyBranches)("branchName", "", "")(removeEmptyAnsBranches)
      && checkTheAnswer(removeEmptyWorktreeFiles)("fileName", "textStatus", "parentBranch")(removeEmptyAnswerWorktreeFiles)
      && checkTheAnswer(removeEmptyIndexFiles)("fileName", "textStatus", "parentBranch")(removeEmptyAnswerIndexFiles)
      && checkTheAnswer(removeEmptyRepositoryFiles)("fileName", "textStatus", "parentBranch")(removeEmptyAnswerRepositoryFiles)
      && checkTheAnswer(removeEmptyRemoteBranch)("remoteBranchName", "", "")(removeEmptyAnsRemoteBranch)
      && checkTheAnswer(removeEmptyRemoteRepositoryFiles)("fileName", "textStatus", "parentBranch")(removeEmptyAnswerRemoteRepositoryFiles)
    ) {
      const res = await getUserQuizzes(currentUser?.id)

      !res.data.dataAnswerRecords.some((answerRecords :any) => answerRecords.userId === Number(currentUser?.id) && answerRecords.quizId === Number(id))
      ? console.log(createQuizAnswerRecord(quizAnswerRecordData))
      : alert("正解!")
    } else {
      console.log("不正解!")
    }
  }

  const blankCheck = (str :string) => /[^\s]+/g.test(str)

  const removeButtonDisabled =
    !blankCheck(quizTitle)
    || !blankCheck(quizIntroduction)
    || !blankCheck(quizType)
    || quizIntroduction.length < 30
    || gitInit === "not a git repository"
    ? true
    : false

  const quizCountLimitDisabledByUserTitle =
    (userQuizzesCount >= 3 && userTitle === "git used to見習い")
    || (userQuizzesCount >= 5  && userTitle === "git used to初段")
    || (userQuizzesCount >= 7 && userTitle === "git used to二段")
    || (userQuizzesCount >= 10 && userTitle === "git used to三段")
    || (userQuizzesCount >= 12 && userTitle === "git used to四段")
    || (userQuizzesCount >= 15 && userTitle === "git used to五段")
    || (userQuizzesCount >= 20 && userTitle === "git used to達人")
    || (userQuizzesCount >= 30 && userTitle === "免許皆伝 git-used-to師範代")

  return(
    <>
    {location.pathname === "/quiz" &&
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        color="default"
        disabled={removeButtonDisabled || quizCountLimitDisabledByUserTitle}
        className={classes.submitBtn}
        onClick={
          handleCreateQuizSubmit(
            branches,
            worktreeFiles,
            indexFiles,
            commitMessages,
            fileHistoryForCansellCommits,
            repositoryFiles,
            remoteBranches,
            remoteCommitMessages,
            remoteRepositoryFiles
            )}
        >
        Submit
      </Button>
      }
    {(location.pathname === (`/quiz/edit/${id}`) || location.pathname === (`/quiz/init/edit/${id}`))  &&
      <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={removeButtonDisabled}
          className={classes.submitBtn}
          onClick={handleUpdateQuizData}
        >
        Submit
      </Button>
      }
    {location.pathname === (`/quiz/answer/${id}`)  &&
      <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          color="default"
          disabled={removeButtonDisabled}
          className={classes.submitBtn}
          onClick={handleAnswerQuiz}
        >
        check the answer!
      </Button>
      }
    </>
  )
}

export default CreateOrUpdateQuizButton