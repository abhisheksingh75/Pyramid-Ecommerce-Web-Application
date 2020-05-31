import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types"
import { setAlert } from "./alert"
import axios from "axios"

export const register = ({ formData }) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  const body = JSON.stringify(formData)
  try {
    const res = await axios.post("/api/auth/signup", body, config)
    dispatch({ type: REGISTER_SUCCESS })
    dispatch(setAlert("Account Created", "success"))
  } catch (error) {
    console.log(error.response.data.error)
    dispatch({ type: REGISTER_FAIL })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}
