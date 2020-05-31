import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import SignIn from "../auth/SignIn"
import SignUp from "../auth/SignUp"
import Home from "../core/Home"
import NavBar from "../core/NavBar"

const Main = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
      </Switch>
    </BrowserRouter>
  )
}

export default Main
