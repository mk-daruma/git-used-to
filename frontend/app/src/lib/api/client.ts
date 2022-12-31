import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"

const options = {
  ignoreHeaders: true
}

// 開発環境用
const client = applyCaseMiddleware(axios.create({
  baseURL: "http://localhost:3001/api/v1"
}), options)

// 本番環境用
// const client = applyCaseMiddleware(axios.create({
//   baseURL: "https://api.git-used-to.com/api/v1"
// }), options)

export default client
