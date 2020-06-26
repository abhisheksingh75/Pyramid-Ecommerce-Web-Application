import React, { Fragment, useEffect } from "react"
import "./App.css"
import Main from "../src/components/router/Main"
import { Provider } from "react-redux"
import store from "./store"
import setAuthTokoen from "./utilities/setAuthToken"
import ReactGa from "react-ga"

function App() {
  useEffect(() => {
    ReactGa.initialize("UA-168534600-2")
    ReactGa.pageview(window.location.pathname + window.location.search)
    console.log(window.location.pathname)
  }, [window.location.pathname])
  return (
    <Provider store={store}>
      <Fragment>
        <Main />
      </Fragment>
    </Provider>
  )
}

export default App
