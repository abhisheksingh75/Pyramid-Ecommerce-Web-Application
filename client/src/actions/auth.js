import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOAD,
  USER_FAIL,
  LOGOUT,
} from "./types"
import { setAlert } from "./alert"
import axios from "axios"
import setAuthTokoen from "../utilities/setAuthToken"

export const register = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  const body = JSON.stringify(formData)
  try {
    // console.log(formData)
    const res = await axios.post("/api/auth/signup", body, config)
    dispatch({ type: REGISTER_SUCCESS, payload: res.data })
    dispatch(loadUser())
    dispatch(setAlert("Account Created", "success"))
  } catch (error) {
    console.log(error.response.data.error)
    dispatch({ type: REGISTER_FAIL })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const login = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  const body = JSON.stringify(formData)
  try {
    const res = await axios.post("/api/auth/signin", body, config)
    dispatch({ type: LOGIN_SUCCESS, payload: res.data })
    dispatch(loadUser())
    dispatch(setAlert("Login Successful", "success"))
  } catch (error) {
    console.log(error.response.data.error)
    dispatch({ type: LOGIN_FAIL })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

///LOAD USER
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthTokoen(localStorage.token)
  }

  try {
    const res = await axios.get("/api/auth")
    dispatch({
      type: USER_LOAD,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: USER_FAIL,
    })
  }
}

export const logOut = () => async (dispatch) => {
  dispatch({ type: LOGOUT })
}
