import {
  PRODUCT_CREATE,
  PRODUCT_ERROR,
  PRODUCTS_FETCH_BY_SOLD,
  PRODUCTS_FETCH_BY_CREATEDAT,
  PRODUCTS_FETCH_BY_SEARCH,
  PRODUCTS_FETCH_BY_SEARCH_LOAD_MORE,
  PRODUCTS_FETCH_BY_SEARCH_PATTERN,
  PRODUCT_READ,
  PRODUCT_DELETE,
  PRODUCT_UPDATE,
  PRODUCT_ALL_READ,
} from "./types"
import { setAlert } from "./alert"
import axios from "axios"
import queryString from "query-string"

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

export const readProduct = (productId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.get(`/api/product/read/${productId}`, config)
    dispatch({
      type: PRODUCT_READ,
      payload: res.data,
    })
  } catch (error) {
    console.log(error)
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const updateProduct = (productId, userId, formData) => async (
  dispatch
) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.put(
      `/api/product/update/${productId}/${userId}`,
      formData,
      config
    )
    dispatch({
      type: PRODUCT_UPDATE,
      payload: res.data,
    })
    dispatch(setAlert("product updated Successfully", "success"))
  } catch (error) {
    console.log(error)
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const deleteProduct = (productId, userId) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.delete(
      `/api/product/delete/${productId}/${userId}`,
      config
    )
    dispatch({
      type: PRODUCT_DELETE,
      payload: res.data,
    })
    dispatch(readAllProducts())
    dispatch(setAlert("product delete Successfully", "success"))
  } catch (error) {
    console.log(error)
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const readAllProducts = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const limit = 100000000
    const res = await axios.get(`/api/product/products?limit=${limit}`, config)
    dispatch({
      type: PRODUCT_ALL_READ,
      payload: res.data,
    })
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

export const getProductsBySearch = (
  myFilters,
  skip = "0",
  loadMore = false,
  order = "asc",
  sortBy = "_id",
  limit = "6"
) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.post(
      `/api/product/by/search?sortBy=${sortBy}&order=${order}&limit=${limit}&skip=${skip}`,
      myFilters,
      config
    )
    // if loadmore is false do the initial round of load
    //else append record to initially loaded records
    if (!loadMore) {
      dispatch({
        type: PRODUCTS_FETCH_BY_SEARCH,
        payload: res.data.products,
      })
    } else {
      dispatch({
        type: PRODUCTS_FETCH_BY_SEARCH_LOAD_MORE,
        payload: res.data.products,
      })
    }
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const getProductsBySearchPattern = (params) => async (dispatch) => {
  const query = queryString.stringify(params)
  const config = {
    headers: {
      Accept: "application/json",
    },
  }
  try {
    const res = await axios.get(
      `/api/product/by/searchpattern?${query}`,
      config
    )
    dispatch({
      type: PRODUCTS_FETCH_BY_SEARCH_PATTERN,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: PRODUCT_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}
