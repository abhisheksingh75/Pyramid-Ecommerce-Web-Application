import { CATEGORY_CREATE, CATEGORY_ERROR, CATEGORIES_FETCH } from "./types"
import { setAlert } from "./alert"
import axios from "axios"

export const createCategory = (name, userId) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  const body = JSON.stringify({ name })
  try {
    const res = await axios.post(`/api/category/create/${userId}`, body, config)
    dispatch({
      type: CATEGORY_CREATE,
      payload: res.data,
    })
    dispatch(setAlert("Category Created Successfully", "success"))
  } catch (error) {
    dispatch({ type: CATEGORY_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const getCategories = () => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  try {
    const res = await axios.get(`/api/category/categories`, config)
    dispatch({
      type: CATEGORIES_FETCH,
      payload: res.data,
    })
  } catch (error) {
    dispatch({ type: CATEGORY_ERROR, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}
