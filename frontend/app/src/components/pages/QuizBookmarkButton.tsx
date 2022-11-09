import React, { useContext } from "react";
import { AuthContext } from "App";

import { Button, makeStyles, Theme } from "@material-ui/core";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { createQuizBookmark, deleteQuizBookmark } from "lib/api/quiz_boolmarks";
import { QuizBookmarkContext } from "./UserQuizzes";

const useStyles = makeStyles((theme: Theme) => ({
  submitBtn: {
    marginTop: theme.spacing(2),
    flexGrow: 1,
    textTransform: "none",
    backgroundColor: "#f5f5f5"
  }
}))

const QuizBookmarkButton: React.FC<{ quizId: number, bookmarkId: any | undefined }> = ({quizId, bookmarkId}) => {
  const { currentUser } = useContext(AuthContext)
  const { quizBookmarks, setQuizBookmarks } = useContext(QuizBookmarkContext)

  const classes = useStyles()
  const userId = Number(currentUser?.id)

  const createQuizBookmarkData = {
    userId: userId,
    quizId: quizId
  }

  const handleCreateQuizBookmarkData = async(e: React.MouseEvent<HTMLButtonElement>) => {
    const createRes = await createQuizBookmark(createQuizBookmarkData)
    setQuizBookmarks((bookmarks :any) => [...bookmarks,{
      id: createRes.data.data.id,
      quizId: createRes.data.data.quizId,
      userId:createRes.data.data.userId
    }])
    console.log(createRes)
  }

  const handleDeleteQuizBookmarkData = (e: React.MouseEvent<HTMLButtonElement>, bookmarkId :number) =>  {
    console.log(deleteQuizBookmark(bookmarkId))
    setQuizBookmarks(quizBookmarks.filter(bookmark => Number(bookmark.id) !== bookmarkId))
  }

  return (
    <>
      { !quizBookmarks.some(bookmark => bookmark.id === bookmarkId) &&
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submitBtn}
          onClick={handleCreateQuizBookmarkData}
        >
          <BookmarkBorderIcon/>
          {quizBookmarks.filter(bookmark => Number(bookmark.quizId) === quizId).length}
        </Button>
      }
      {quizBookmarks.some(bookmark => bookmark.id === bookmarkId) &&
        <Button
          type="submit"
          variant="contained"
          color="default"
          className={classes.submitBtn}
          onClick={e => handleDeleteQuizBookmarkData(e, bookmarkId)}
        >
          <BookmarkIcon />
          {quizBookmarks.filter(bookmark => Number(bookmark.quizId) === quizId).length}
        </Button>
      }
    </>
  )
}

export default QuizBookmarkButton