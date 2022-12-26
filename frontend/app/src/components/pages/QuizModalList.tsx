import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";
import { commandLists, userTitleLists } from "lib/array/helpButtonArray";

const useStyles = makeStyles(() => ({
  head: {
    backgroundColor: "black",
  },
  column: {
    color: "white"
  },
  title: {
    whiteSpace: "nowrap"
  }
}))

const QuizModalList :React.FC<{ modalType: string }> = (modalType) => {
  const classes = useStyles()

  const commandList = () => {
    return(
      commandLists.map((command) => (
        <TableRow key={command.name}>
          <TableCell className={classes.title} component="th" scope="row">
            {command.name}
          </TableCell>
          <TableCell align="left">{command.intro}<br />{command.attention}</TableCell>
        </TableRow>
      ))
    )
  }

  const userTitleList = () => {
    return(
      userTitleLists.map((title) => (
        <TableRow key={title.userTitle}>
          <TableCell className={classes.title} component="th" scope="row">
            {title.userTitle}
          </TableCell>
          <TableCell align="left">{title.intro}<br />{title.limitCreateQuiz}</TableCell>
        </TableRow>
      ))
    )
  }

  const ModalText =
    modalType.modalType === "commandList"
    ? commandList()
    : modalType.modalType === "userTitleList"
    ? userTitleList()
    : ""

  const ModalTitle =
    modalType.modalType === "commandList"
    ? "command"
    : modalType.modalType === "userTitleList"
    ? "称号"
    : ""

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead className={classes.head}>
          <TableRow color="white">
            <TableCell className={classes.column}>{ModalTitle}</TableCell>
            <TableCell className={classes.column}>説明</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ModalText}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default QuizModalList