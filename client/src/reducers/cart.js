import {
  CART_ADDITEM,
  CART_UPDATE,
  CART_REMOVEITEM,
  CART_DELETE,
} from "../actions/types"

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")),
  loading: true,
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CART_ADDITEM:
    case CART_UPDATE:
    case CART_REMOVEITEM:
    case CART_DELETE:
      return {
        ...state,
        cartItems: payload,
        loading: false,
      }
    default:
      return state
  }
}
