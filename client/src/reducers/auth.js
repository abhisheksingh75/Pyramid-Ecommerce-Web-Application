import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOAD,
  USER_FAIL,
  LOGOUT,
} from "../actions/types"

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: false,
  loading: true,
  errorFlag: false,
}
export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
        errorFlag: false,
      }
    case USER_LOAD:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
        errorFlag: false,
      }
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case USER_FAIL:
    case LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
        loading: false,
        errorFlag: true,
      }
    default:
      return state
  }
}
