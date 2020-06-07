import {
  PRODUCT_CREATE,
  PRODUCT_ERROR,
  PRODUCTS_FETCH_BY_SOLD,
  PRODUCTS_FETCH_BY_CREATEDAT,
} from "../actions/types"

const initialstate = {
  products_by_sold: [],
  products_by_createdAt: [],
  error: null,
  loading: true,
}

export default function(state = initialstate, action) {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_CREATE:
      return {
        ...state,
        loading: false,
      }
    case PRODUCTS_FETCH_BY_SOLD:
      return {
        ...state,
        products_by_sold: payload,
        loading: false,
      }
    case PRODUCTS_FETCH_BY_CREATEDAT:
      return {
        ...state,
        products_by_createdAt: payload,
        loading: false,
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        loading: true,
      }
    default:
      return state
  }
}
