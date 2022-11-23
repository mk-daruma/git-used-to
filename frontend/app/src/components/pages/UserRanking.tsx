import { getUserRanking } from "lib/api/users"
import { useEffect, useState } from "react"

const UserRanking :React.FC = () => {
  const [rankingUsers, setRankingUSers] = useState([{
    userId: 0,
    userName: "",
    userImage: "",
    bookmarkCount: 0
  }])

  const handleGetUserRankingData = async() => {
    const weeklyRankingQuizzesRes = await getUserRanking()
    weeklyRankingQuizzesRes?.data.userRanking.forEach((user :any) =>
      setRankingUSers(users => [...users,{
        userId: user.userId,
        userName: user.createUserName,
        userImage: user.createUserImage,
        bookmarkCount: user.bookmarkCount
      }]))
  }

  useEffect(() => {
    handleGetUserRankingData()
  },[])

  useEffect(() => {
    console.log("rankingUsers", rankingUsers)
  },[rankingUsers])

  return(
    <>
      {rankingUsers.map((user, index) =>
        <p key={index}>{user.userName}</p>
        )}
    </>
  )
}

export default UserRanking