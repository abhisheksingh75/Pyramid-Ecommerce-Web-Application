import {
  PAYMENT_TOKEN,
  PAYMENT_TOKEN_FAIL,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
} from "../actions/types"

const initialState = {
  paymentToken: null,
  makePaymentResult: null,
  paymentLoading: true,
  errorFlag: false,
}
export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case PAYMENT_TOKEN:
      return {
        ...state,
        paymentToken: payload,
        paymentLoading: false,
        errorFlag: false,
      }
    case PAYMENT_SUCCESS:
      return {
        ...state,
        makePaymentResult: payload,
        paymentLoading: false,
        errorFlag: false,
      }
    case PAYMENT_TOKEN_FAIL:
    case PAYMENT_FAIL:
      return {
        ...state,
        paymentToken: null,
        paymentLoading: false,
        errorFlag: true,
      }
    default:
      return state
  }
}
