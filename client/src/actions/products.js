import {
  PRODUCT_CREATE,
  PRODUCT_ERROR,
  PRODUCTS_FETCH_BY_SOLD,
  PRODUCTS_FETCH_BY_CREATEDAT,
} from "./types"
import { setAlert } from "./alert"
import axios from "axios"

export const createProduct = (userId, product) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.post(
      `/api/product/create/${userId}`,
      product,
      config
    )
    dispatch({
      type: PRODUCT_CREATE,
      payload: res.data,
    })
    dispatch(setAlert("product Created Successfully", "success"))
  } catch (error) {
    console.log(error)
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const getProductsBySold = (
  sortBy = "sold",
  order = "desc",
  limit = "6"
) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res1 = await axios.get(
      `/api/product/products?sortBy=${sortBy}&order=${order}&limit=${limit}`,
      config
    )
    dispatch({
      type: PRODUCTS_FETCH_BY_SOLD,
      payload: res1.data,
    })
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const getProductsByCreatedAt = (
  sortBy = "createdAt",
  order = "desc",
  limit = "6"
) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res2 = await axios.get(
      `/api/product/products?sortBy=${sortBy}&order=${order}&limit=${limit}`,
      config
    )
    dispatch({
      type: PRODUCTS_FETCH_BY_CREATEDAT,
      payload: res2.data,
    })
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}
