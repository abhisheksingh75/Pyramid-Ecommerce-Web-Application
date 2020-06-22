import {
  PRODUCT_CREATE,
  PRODUCT_ERROR,
  PRODUCTS_FETCH_BY_SOLD,
  PRODUCTS_FETCH_BY_CREATEDAT,
  PRODUCTS_FETCH_BY_SEARCH,
  PRODUCTS_FETCH_BY_SEARCH_PATTERN,
  PRODUCTS_FETCH_BY_SEARCH_LOAD_MORE,
  PRODUCT_READ,
  PRODUCT_DELETE,
  PRODUCT_UPDATE,
  PRODUCT_ALL_READ,
} from "../actions/types"

const initialstate = {
  products_by_sold: [],
  products_by_createdAt: [],
  products_by_search: [],
  products_by_search_pattern: [],
  product_read_byId: null,
  product_read_all: [],
  error: null,
  products_loading: true,
}

export default function(state = initialstate, action) {
  const { type, payload } = action
  switch (type) {
    case PRODUCT_CREATE:
    case PRODUCT_DELETE:
    case PRODUCT_UPDATE:
      return {
        ...state,
        products_loading: false,
      }
    case PRODUCT_READ:
      return {
        ...state,
        product_read_byId: payload,
        products_loading: false,
      }
    case PRODUCT_ALL_READ:
      return {
        ...state,
        product_read_all: payload,
        products_loading: false,
      }
    case PRODUCTS_FETCH_BY_SOLD:
      return {
        ...state,
        products_by_sold: payload,
        products_loading: false,
      }
    case PRODUCTS_FETCH_BY_CREATEDAT:
      return {
        ...state,
        products_by_createdAt: payload,
        products_loading: false,
      }
    case PRODUCTS_FETCH_BY_SEARCH:
      return {
        ...state,
        products_by_search: payload,
        products_loading: false,
      }
    case PRODUCTS_FETCH_BY_SEARCH_PATTERN:
      return {
        ...state,
        products_by_search_pattern: payload,
        products_loading: false,
      }
    case PRODUCTS_FETCH_BY_SEARCH_LOAD_MORE:
      return {
        ...state,
        products_by_search: [...state.products_by_search, ...payload],
        products_loading: false,
      }
    case PRODUCT_ERROR:
      return {
        ...state,
        error: payload,
        products_loading: false,
      }
    default:
      return state
  }
}
