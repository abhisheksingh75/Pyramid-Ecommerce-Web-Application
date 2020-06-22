import {
  ORDER_CREATE,
  ORDER_FAIL,
  ODERS_FETCH_ALL,
  ORDER_STATUS_VALUES,
  ORDER_STATUS_FAIL,
  ORDER_STATUS_UPDATE,
  ORDER_STATUS_UPDATE_FAIL,
} from "../actions/types"

const initialstate = {
  list_of_orders: [],
  order_status_values: [],
  order_error: null,
  order_loading: true,
}

export default function(state = initialstate, action) {
  const { type, payload } = action
  switch (type) {
    case ORDER_CREATE:
    case ORDER_STATUS_UPDATE:
      return {
        ...state,
        order_loading: false,
      }
    case ODERS_FETCH_ALL:
      return {
        ...state,
        list_of_orders: payload,
        order_loading: false,
        order_error: null,
      }
    case ORDER_STATUS_VALUES:
      return {
        ...state,
        order_status_values: payload,
        order_loading: false,
        order_error: null,
      }

    case ORDER_STATUS_FAIL:
    case ORDER_STATUS_UPDATE_FAIL:
    case ORDER_FAIL:
      return {
        ...state,
        order_error: payload,
        order_loading: false,
      }
    default:
      return state
  }
}
