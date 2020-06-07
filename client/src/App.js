import React, { Fragment } from "react"
import "./App.css"
import Main from "../src/components/router/Main"
import { Provider } from "react-redux"
import store from "./store"
import setAuthTokoen from "./utilities/setAuthToken"

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Main />
      </Fragment>
    </Provider>
  )
}

export default App
