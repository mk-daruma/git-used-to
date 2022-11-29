import { updateUsertitle } from "lib/api/users"

const UserUpdateTitleAlert = async(userId :number | undefined) => {
  try {
    const res = await updateUsertitle(userId)
    if (res?.data.message === "称号に変化がありました") {
      console.log(res?.data)
      alert(`称号が"${res?.data.userData.nickname}"になりました！`)
    } else {
      console.log(res?.data)
    }
  } catch (err) {
    console.log(err)
  }
}

export default UserUpdateTitleAlert