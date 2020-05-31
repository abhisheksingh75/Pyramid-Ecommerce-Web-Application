import { REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types"

const initialState = {
  loading: true,
  errorFlag: false,
}
export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, loading: false, errorFlag: false }

    case REGISTER_FAIL:
      return { ...state, loading: false, errorFlag: true }
    default:
      return state
  }
}
