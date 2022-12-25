import { makeStyles, Modal } from "@material-ui/core"
import { useState } from "react";
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import QuizModalList from "./QuizModalList";

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
  quizPaper: {
    position: 'absolute',
    height: 200,
    backgroundColor: theme.palette.background.paper,
  },
  rankingPaper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    padding: "2rem"
  },
  modalIcon: {
    flexGrow: 1,
    textTransform: "none"
  },

}));

const QuizHelpModal :React.FC<{ modalType :string }> = (modalType) => {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalText = () => {
    return(
      modalType.modalType === "userRanking"
      ? (
        <div style={modalStyle} className={classes.rankingPaper}>
          USERランキングは、userごとに作成したクイズのブックマーク数の合計が多い順に表示されます。ランキングに表示されるには、作成したクイズに合計で10個以上のブックマークが付いている必要があります。
        </div>
      )
      : (
        <div style={modalStyle} className={classes.quizPaper}>
          <QuizModalList modalType={modalType.modalType} />
        </div>
      )
    )
  }

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
        {modalText()}
      </Modal>
    </>
  )
}

export default QuizHelpModal