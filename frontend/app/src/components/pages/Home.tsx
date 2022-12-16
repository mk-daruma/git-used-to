import React, { useContext } from "react"
import { motion } from "framer-motion"

import { AuthContext } from "App"
import { makeStyles, Theme } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import ListIcon from '@material-ui/icons/List';
import CreateIcon from '@material-ui/icons/Create';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SchoolIcon from '@material-ui/icons/School';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles((theme: Theme) => ({
  home: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  font: {
    fontSize: "3rem",
    fontWeight: "bold",
    textAlign: "center"
  },
  btn: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: theme.spacing(6),
  },
  box: {
    margin: theme.spacing(4),
    width: "20rem",
    height: "25rem",
    borderRadius: "2rem",
    backgroundColor: "#F0FFF0",
  },
  boxTitleIcon: {
    paddingRight: theme.spacing(1)
  },
  boxTitle: {
    fontWeight: "bold",
    borderTopLeftRadius: "2rem",
    borderTopRightRadius: "2rem",
    backgroundColor: "white",
    color: "black",
    fontSize: "1rem",
    display: "flex",
    padding: theme.spacing(2, 0, 2, 4),
    borderBottom: "solid",
  },
  boxText: {
    padding: theme.spacing(4),
    color: "black",
    fontWeight: "bold",
  }
}))

const Home: React.FC = () => {
  const classes = useStyles()
  const history = useHistory()
  const { isSignedIn, currentUser } = useContext(AuthContext)

  const homeBoxListForGuest = [
    {
      icon: <CreateIcon />,
      path: "/quiz",
      title: "クイズ作成",
      text: "gitのクイズを作成する画面に移動します。作成したクイズのブックマーク数が多い場合はランキングの上位に表示される可能性があるので、是非クイズ作成に挑戦してみてください!!"
    },
    {
      icon: <ListIcon />,
      path: "/quiz/list",
      title: "クイズ一覧",
      text: "git used toを利用しているuserが作成したクイズの一覧ページに移動します。タグ検索やブックマーク数の多い人気のクイズなど検索をすることができます!是非たくさんのクイズを解いてgitの理解力を深めてください!"
    },
    {
      icon: <AccountBoxIcon />,
      path: `/user/${currentUser?.id}/edit`,
      title: "プロフィール編集",
      text: "名前/自己紹介文/プロフィール画像の変更など、アカウントについての設定はこちらから。問題解答数や作成、ブックマークされた数などを確認することもできます。"
    },
    {
      icon: <SchoolIcon />,
      path: "検討中",
      title: "道場/初級",
      text: "gitコマンドの使い方を理解するための簡単なクイズです。gitが初めての方はこちらがおすすめ!"
    },
    {
      icon: <SchoolIcon />,
      path: "検討中",
      title: "道場/中級",
      text: "複数のコマンドを使用したクイズを用意しています。コマンドについて理解が深まったらこちらも挑戦してみてくささい!"
    },
    {
      icon: <SchoolIcon />,
      path: "検討中",
      title: "道場/上級",
      text: "初級/中級でコマンドに慣れてきたら、最後に少し複雑なクイズに挑戦してみましょう！"
    },
    {
      icon: <EqualizerIcon />,
      path: "/quiz/ranking/weekly",
      title: "週間ランキング",
      text: "直近1週間で作成されたクイズの中でブックマークされた数が多いクイズが表示されています。人気のクイズに挑戦してgitの理解力を深めましょう!!"
    },
    {
      icon: <EqualizerIcon />,
      path: "/user/ranking",
      title: "userランキング",
      text: "作成したクイズのブックマーク数が多いuserをランキング形式で発表しています。人気userが作成したクイズを覗いてみましょう!!"
    }
  ]

  const homeBoxListExceptGuest = [
    {
      icon: <CreateIcon />,
      path: "/quiz",
      title: "クイズ作成",
      text: "gitのクイズを作成する画面に移動します。作成したクイズのブックマーク数が多い場合はランキングの上位に表示される可能性があるので、是非クイズ作成に挑戦してみてください!!"
    },
    {
      icon: <ListIcon />,
      path: "/quiz/list",
      title: "クイズ一覧",
      text: "git used toを利用しているuserが作成したクイズの一覧ページに移動します。タグ検索やブックマーク数の多い人気のクイズなど検索をすることができます!是非たくさんのクイズを解いてgitの理解力を深めてください!"
    },
    {
      icon: <AccountBoxIcon />,
      path: `/user/${currentUser?.id}/edit`,
      title: "プロフィール編集",
      text: "名前/自己紹介文/プロフィール画像の変更など、アカウントについての設定はこちらから。問題解答数や作成、ブックマークされた数などを確認することもできます。"
    },
    {
      icon: <SchoolIcon />,
      path: "検討中",
      title: "道場/初級",
      text: "gitコマンドの使い方を理解するための簡単なクイズです。gitが初めての方はこちらがおすすめ!"
    },
    {
      icon: <SchoolIcon />,
      path: "検討中",
      title: "道場/中級",
      text: "複数のコマンドを使用したクイズを用意しています。コマンドについて理解が深まったらこちらも挑戦してみてくささい!"
    },
    {
      icon: <SchoolIcon />,
      path: "検討中",
      title: "道場/上級",
      text: "初級/中級でコマンドに慣れてきたら、最後に少し複雑なクイズに挑戦してみましょう！"
    },
    {
      icon: <EqualizerIcon />,
      path: "/quiz/ranking/weekly",
      title: "週間ランキング",
      text: "直近1週間で作成されたクイズの中でブックマークされた数が多いクイズが表示されています。人気のクイズに挑戦してgitの理解力を深めましょう!!"
    },
    {
      icon: <EqualizerIcon />,
      path: "/user/ranking",
      title: "userランキング",
      text: "作成したクイズのブックマーク数が多いuserをランキング形式で発表しています。人気userが作成したクイズを覗いてみましょう!!"
    },
    {
      icon: <ListIcon />,
      path: `/user/${currentUser?.id}/quiz/bookmark/list`,
      title: "ブックマークをしたクイズ一覧",
      text: `${currentUser?.userName}さんがブックマークしたクイズを確認できます。ブックマークしておいたクイズを解いてみましょう！`
    },
    {
      icon: <ListIcon />,
      path: `/user/${currentUser?.id}/quiz/list`,
      title: "作成クイズ一覧",
      text: `${currentUser?.userName}さんが作成したクイズを確認できます。`
    },
  ]

  const homeBoxList =
    currentUser?.email === "guest_user@git-used-to.com"
    ? homeBoxListForGuest
    : homeBoxListExceptGuest

  return (
    <>
      {
        isSignedIn && currentUser
        ? (
          <div className={classes.home}>
            <div className={classes.font}>
              ようこそ{currentUser?.userName}さん
            </div>
            <div className={classes.btn}>
              {homeBoxList.map((box, index) =>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1.5,
                    delay: index / 10 + 0.2,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                  >
                  <motion.div
                    className={classes.box}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    onTap={e => {history.push(box.path)}}
                    >
                    <div className={classes.boxTitle}>
                      <div className={classes.boxTitleIcon}>
                        {box.icon}
                      </div>
                      {box.title}
                    </div>
                    <div className={classes.boxText}>
                      {box.text}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        )
        : (
          <h1>Not signed in</h1>
        )
      }
    </>
  )
}

export default Home
