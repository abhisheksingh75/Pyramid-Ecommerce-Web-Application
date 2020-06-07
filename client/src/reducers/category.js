import {
  CATEGORY_CREATE,
  CATEGORY_ERROR,
  CATEGORIES_FETCH,
} from "../actions/types"

const initialState = {
  categories: [],
  error: null,
  loading: true,
}
export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CATEGORY_CREATE:
      return {
        ...state,
        error: null,
        loading: false,
      }
    case CATEGORIES_FETCH:
      return {
        ...state,
        categories: payload,
        loading: false,
      }
    case CATEGORY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
