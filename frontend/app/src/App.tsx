import React, { useState, useEffect, createContext } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"

import CommonLayout from "components/layouts/CommonLayout"
import Home from "components/pages/Home"
import SignUp from "components/pages/SignUp"
import SignIn from "components/pages/SignIn"
import ChangePassword from "components/pages/ChangePassword"
import ForgetPassword from "components/pages/ForgetPassword"
import RedirectForgetPassword from "components/pages/RedirectForgetPassword"
import UserDelete from "components/pages/UserDelete"
import CreateQuiz from "components/pages/CreateQuiz"

import { getCurrentUser } from "lib/api/auth"
import { User } from "interfaces/index"
import QuizListPage from "components/pages/QuizListPage"
import QuizSetUp from "components/pages/QuizSetUp"
import UserProfile from "components/pages/UserProfile"
import QuizWeeklyRanking from "components/pages/QuizWeeklyRanking"
import UserRanking from "components/pages/UserRanking"
import UserUpdateTitleAlert from "components/utils/UserGetTitleAlert"
import Top from "components/pages/Top"
import { ScrollTop } from "components/utils/ScroollTop"
import { isMobile } from "react-device-detect"

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
        UserUpdateTitleAlert(currentUser?.id)
        return children
      } else {
        return <Redirect to="/" />
      }
    } else {
      return <></>
    }
  }

  const MobileLimit = ({ children }: { children: React.ReactElement }) =>{
    if (isMobile) {
      return <Redirect to="/" />
    } else {
      return children
    }
  }

  return (
    <BrowserRouter>
      <ScrollTop />
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser}}>
        <CommonLayout>
            <Switch>
              <Route exact path="/" component={Top} />
              <MobileLimit>
                <Switch>
                  <Route path="/api/v1/auth/password/reset/form" component={RedirectForgetPassword} />
                  <Route exact path="/signup" component={SignUp} />
                  <Route exact path="/signin" component={SignIn} />
                  <Route exact path="/password/reset" component={ForgetPassword} />
                  <Private>
                    <Switch>
                      <Route exact path="/home" component={Home} />
                      <Route exact path="/password" component={ChangePassword} />
                      <Route exact path="/user/:id/edit" component={UserProfile} />
                      <Route exact path="/user/delete" component={UserDelete} />
                      <Route exact path="/user/ranking" component={UserRanking} />
                      <Route exact path="/quiz/list" component={QuizListPage} />
                      <Route exact path="/quiz/lesson/elementary" component={QuizListPage} />
                      <Route exact path="/quiz/lesson/intermediate" component={QuizListPage} />
                      <Route exact path="/quiz/lesson/advanced" component={QuizListPage} />
                      <Route exact path="/quiz" component={CreateQuiz} />
                      <Route exact path="/quiz/ranking/weekly" component={QuizWeeklyRanking} />
                      <Route path="/user/:id/quiz/list" component={QuizListPage} />
                      <Route path="/user/:id/quiz/bookmark/list" component={QuizListPage} />
                      <Route path="/quiz/setup/:id" component={QuizSetUp} />
                      <Route path="/quiz/edit/:id" component={CreateQuiz} />
                      <Route path="/quiz/init/edit/:id" component={CreateQuiz} />
                      <Route path="/quiz/answer/:id" component={CreateQuiz} />
                    </Switch>
                  </Private>
                </Switch>
              </MobileLimit>
            </Switch>
        </CommonLayout>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
