import { Button, makeStyles, Modal } from "@material-ui/core"
import { useState } from "react";
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import QuizCommandList from "./QuizCommandList";

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    overflow: 'scroll',
  },
  paper: {
    position: 'absolute',
    height: 200,
    backgroundColor: theme.palette.background.paper,
  },
  modalIcon: {
    flexGrow: 1,
    textTransform: "none"
  }
}));

const QuizCommandCheatModal :React.FC = () => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <>
      <div
        className={classes.modalIcon}
        onClick={handleOpen}
        >
        <HelpOutlineRoundedIcon />
      </div>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <QuizCommandList />
        </div>
      </Modal>
    </>
  )
}

export default QuizCommandCheatModal