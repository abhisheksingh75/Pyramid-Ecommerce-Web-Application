import {
  USER_PROFILE_FAIL,
  USER_READ,
  USER_UPDATE,
  USER_PURCHASE_HISTORY,
} from "../actions/types"

const initialState = {
  userData: null,
  userPurchaseHistory: [],
  loading: true,
  userErrorFlag: false,
}
export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case USER_READ:
      return {
        ...state,
        userData: payload,
        loading: false,
        errorFlag: false,
      }
    case USER_UPDATE:
      return {
        ...state,
        loading: false,
        errorFlag: false,
      }
    case USER_PURCHASE_HISTORY:
      return {
        ...state,
        userPurchaseHistory: payload,
        loading: false,
        errorFlag: false,
      }
    case USER_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        errorFlag: true,
      }
    default:
      return state
  }
}
