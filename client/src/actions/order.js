import {
  ORDER_CREATE,
  ORDER_FAIL,
  ODERS_FETCH_ALL,
  ORDER_STATUS_VALUES,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_UPDATE,
  ORDER_STATUS_UPDATE_FAIL,
} from "./types"
import axios from "axios"
import { setAlert } from "./alert"

export const createOrder = (userId, createOrderData) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  const body = JSON.stringify({ createOrderData })
  try {
    const res = await axios.post(
      `/api/order/create/${userId}`,
      createOrderData,
      config
    )
    dispatch({
      type: ORDER_CREATE,
      payload: res.data,
    })
    dispatch(setAlert("Order Created Successfully", "success"))
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const fetchAllOrders = (userId) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  try {
    const res = await axios.get(`/api/order/list/${userId}`, config)
    dispatch({
      type: ODERS_FETCH_ALL,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: ORDER_FAIL, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const getOrderStatusValues = (userId) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  try {
    const res = await axios.get(`/api/order/order-status/${userId}`, config)
    dispatch({
      type: ORDER_STATUS_VALUES,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: ORDER_STATUS_FAIL, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const UpdateOrderStatusValues = (userId, orderId, orderStatus) => async (
  dispatch
) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  try {
    const res = await axios.put(
      `/api/order/${orderId}/status/${userId}`,
      orderStatus,
      config
    )
    dispatch({
      type: ORDER_STATUS_UPDATE,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_STATUS_UPDATE_FAIL,
      payload: error.response.data.error,
    })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}
