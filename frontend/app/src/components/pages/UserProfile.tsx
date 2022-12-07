import { Avatar, Button } from "@material-ui/core"
import { AuthContext } from "App"
import AvatarImage from "components/layouts/Avatar"
import { getUserProfile } from "lib/api/users"
import { createContext, useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import UserEdit from "./UserEdit"

export const UserProfileContext = createContext({} as {
  userProfile: {
    userId: number,
    userName: string,
    userSelfIntroduction: string,
    userImage: {
      url: string,
    },
    userNickname: string,
    quizzesLength: number,
    bookmarksLength: number,
    answerRecordsLength: number,
    quizAverage: number,
    answerRecordAverage: number,
    bookmarkAverage: number
  }

  setUserProfile: React.Dispatch<React.SetStateAction<{
    userId: number,
    userName: string,
    userSelfIntroduction: string,
    userImage: {
      url: string,
    },
    userNickname: string,
    quizzesLength: number,
    bookmarksLength: number,
    answerRecordsLength: number,
    quizAverage: number,
    answerRecordAverage: number,
    bookmarkAverage: number
  }>>
})

const UserProfile: React.FC = () => {
  const [userProfile, setUserProfile] = useState({
    userId: 0,
    userName: "",
    userSelfIntroduction: "",
    userImage: {
      url: "",
    },
    userNickname: "",
    quizzesLength: 0,
    bookmarksLength: 0,
    answerRecordsLength: 0,
    quizAverage: 0,
    answerRecordAverage: 0,
    bookmarkAverage: 0
  })

  const { currentUser } = useContext(AuthContext)
  const { id } = useParams<{ id: string }>()

  const handleGetUserProfile = async() => {
    const userProfileRes = await getUserProfile(Number(id))
    setUserProfile({
      userId: userProfileRes.data.userData.id,
      userName: userProfileRes.data.userData.userName,
      userSelfIntroduction: userProfileRes.data.userData.userSelfIntroduction,
      userImage: {
        url: userProfileRes.data.userData.image.url,
      },
      userNickname: userProfileRes.data.userData.nickname,
      quizzesLength: userProfileRes.data.quizzesLength,
      bookmarksLength: userProfileRes.data.quizBookmarksLength,
      answerRecordsLength: userProfileRes.data.quizAnswerRecordsLength,
      quizAverage: userProfileRes.data.quizAverage,
      answerRecordAverage: userProfileRes.data.quizAnswerRecordAverage,
      bookmarkAverage: userProfileRes.data.quizBookmarkAverage,

    })
  }

  useEffect(() => {
    handleGetUserProfile()
  }, [])

  useEffect(() => {
    console.log("userProfile", userProfile)
  }, [userProfile])


  return(
    <UserProfileContext.Provider
      value={{
        userProfile, setUserProfile
      }}
      >
      {id === String(currentUser?.id) &&
        <UserEdit />
        }

      {id !== String(currentUser?.id) &&
        <>
          <Button
            type="submit"
            color="default"
            variant="contained"
            component={Link}
            to={`/user/${id}/quiz/list`}
          >
            userが作成したクイズ一覧
          </Button>
          <Button
            type="submit"
            color="default"
            variant="contained"
            component={Link}
            to={`/user/${id}/quiz/bookmark/list`}
          >
            userがブックマークしたクイズ一覧
          </Button>
          <AvatarImage image={userProfile.userImage.url} rank={userProfile.userNickname} />
          <p>{userProfile.userName}</p>
          <p>{userProfile.userSelfIntroduction}</p>
          <p>{userProfile.answerRecordsLength}</p>
          <p>{userProfile.bookmarksLength}</p>
          <p>{userProfile.quizzesLength}</p>
          <p>{userProfile.userName}</p>
          <p>{userProfile.userSelfIntroduction}</p>
        </>
        }
    </UserProfileContext.Provider>
  )
}

export default UserProfile