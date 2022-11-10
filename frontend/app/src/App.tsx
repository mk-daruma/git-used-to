import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import CommonLayout from "components/layouts/CommonLayout"
import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"
import UserEdit from "components/pages/UserEdit"
import ChangePassword from "components/pages/ChangePassword"
import ForgetPassword from "components/pages/ForgetPassword"
import RedirectForgetPassword from "components/pages/RedirectForgetPassword"
import UserDelete from "components/pages/UserDelete"
import CreateQuiz from "components/pages/CreateQuiz"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"
import QuizList from "components/pages/QuizList"

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
})

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()

  const handleGetCurrentUser = async () => {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data)

        console.log(res?.data.data)
      } else {
        console.log("No current user")
      }
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  useEffect(() => {
    handleGetCurrentUser()
  }, [setCurrentUser])

  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        return <Redirect to="/signin" />
      }
    } else {
      return <></>
    }
  }

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
          <Switch>
            <Route path="/api/v1/auth/password/reset/form" component={RedirectForgetPassword} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/password/reset" component={ForgetPassword} />
            <Private>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/password" component={ChangePassword} />
                <Route exact path={`/user/${currentUser?.id}/edit`} component={UserEdit} />
                <Route exact path="/user/delete" component={UserDelete} />
                <Route exact path="/user/quiz/list" component={QuizList} />
                <Route exact path="/user/bookmark/list" component={QuizList} />
                <Route exact path="/quiz/list" component={QuizList} />
                <Route exact path="/quiz" component={CreateQuiz} />
                <Route path="/quiz/edit/:id" component={CreateQuiz} />
                <Route path="/quiz/init/edit/:id" component={CreateQuiz} />
                <Route path="/quiz/answer/:id" component={CreateQuiz} />
              </Switch>
            </Private>
          </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
