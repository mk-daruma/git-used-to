import { AuthContext } from "App"
import { getUserProfile } from "lib/api/users"
import { createContext, useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import OtherUserProfile from "./OtherUserProfile"
import UserEdit from "./UserEdit"

export const UserProfileContext = createContext({} as {
  userProfile: {
    userId: number,
    userName: string,
    userSelfIntroduction: string,
    userEmail: string,
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
    userEmail: string,
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
    userEmail: "",
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
      userEmail: userProfileRes.data.userData.email,
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

  const checkGuestUser = currentUser?.email === "guest_user@git-used-to.com"
  const checkCurrentUser = id === String(currentUser?.id)
  const checkEditUser = checkCurrentUser && !checkGuestUser
  const checkGuestOrOtherUser = !checkCurrentUser || checkGuestUser

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
      {checkEditUser && <UserEdit />}
      {checkGuestOrOtherUser && <OtherUserProfile />}
    </UserProfileContext.Provider>
  )
}

export default UserProfile