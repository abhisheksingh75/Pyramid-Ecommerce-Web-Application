import {
  USER_READ,
  USER_UPDATE,
  USER_PROFILE_FAIL,
  USER_LOAD,
  USER_PURCHASE_HISTORY,
} from "./types"
import { setAlert } from "./alert"
import axios from "axios"

export const readUser = (userId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.get(`/api/user/read/${userId}`, config)
    dispatch({
      type: USER_READ,
      payload: res.data,
    })
    dispatch({
      type: USER_LOAD,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const updateUser = (userId, userData) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.put(`/api/user/update/${userId}`, userData, config)
    dispatch({
      type: USER_UPDATE,
      payload: res.data,
    })
    dispatch(setAlert("User data updpated Successfully", "success"))
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const readUserPurchaseHistory = (userId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.get(
      `/api/user/read/purchasehistory/${userId}`,
      config
    )
    dispatch({
      type: USER_PURCHASE_HISTORY,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: USER_PROFILE_FAIL, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}
