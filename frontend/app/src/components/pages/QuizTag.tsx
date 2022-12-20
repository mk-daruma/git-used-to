import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion"
import { Checkbox, FormControlLabel, makeStyles, Theme } from '@material-ui/core';
import { getQuizTags } from 'lib/api/quizzes';
import { createQuizTag, deleteQuizTag } from 'lib/api/quiz_tags';

const useStyles = makeStyles((theme: Theme) => ({
  tagList: {
    display: "flex",
    flexFlow: "column",
    border: "solid",
    borderRadius: "2rem",
    padding: theme.spacing(3),
    margin: theme.spacing(2),
    height: "10rem",
    overflow: 'scroll',
  }
}))

const QuizTag: React.FC<{ quizId: number }> = ({quizId}) => {
  const classes = useStyles()
  const [commandTag, setCommandTag] = useState([{
    id: "",
    commandTag : ""
  }])

  const tagList = [
    "add" ,
    "commit",
    "commit --amend",
    "push",
    "push -d",
    "branch",
    "branch -d",
    "branch -D",
    "branch -m",
    "checkout",
    "checkout -b",
    "touch",
    "rm",
    "rm --cashed",
    "reset",
    "reset --soft",
    "reset --mixed",
    "reset --hard"
  ];

  const handleAddTags = async(commandName :any) => {
    const TagRes = await createQuizTag({
      quizId: quizId,
      tag: commandName
    })
    setCommandTag(commandTag => [...commandTag,{
      id: TagRes.data.data.id,
      commandTag: TagRes.data.data.tag
    }])
    console.log(TagRes)
  }

  const handleRemoveTags = (commandName :any) => {
    setCommandTag(
      commandTag.filter(command =>
        command.commandTag !== commandName
        ))
    const deleteQuizTagData = Number(commandTag.filter(tag => tag.commandTag === commandName)[0].id)
    const deleteTagRes = deleteQuizTagData && deleteQuizTag(deleteQuizTagData)
    console.log(deleteTagRes)
  }

  const handleGetQuizTags = async() => {
    const QuizRes = await getQuizTags(quizId)
    console.log(QuizRes)
    QuizRes.data.quizTagsData.forEach((tag :any) =>
    setCommandTag(commandTag => [...commandTag,{
      id: tag.id,
      commandTag: tag.tag
    }]))
  }

  const checkTagExist = (tagName :string) => commandTag.some(aa => aa.commandTag === tagName)

  useEffect(() => {
    console.log("commandTag", commandTag)
  },[commandTag])

  useEffect(() => {
    location.pathname === `/quiz/setup/${quizId}` && handleGetQuizTags()
  },[])

  return (
      <motion.div
        className={classes.tagList}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
      {tagList.map(tag =>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkTagExist(tag)}
              onClick={e => {
                checkTagExist(tag)
                ? handleRemoveTags(tag)
                : handleAddTags(tag)
              }}
              />
            }
          label={tag}
        />
      )}
    </motion.div>
  );
}

export default QuizTag