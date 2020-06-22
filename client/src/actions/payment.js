import {
  PAYMENT_TOKEN,
  PAYMENT_TOKEN_FAIL,
  PAYMENT_SUCCESS,
  PAYMENT_FAIL,
  ORDER_FAIL,
} from "./types"
import { setAlert } from "./alert"
import axios from "axios"
import { emptyCart } from "./cart"
import { createOrder } from "./order"

export const getPaymentToken = (userId) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }
  try {
    const res = await axios.get(`/api/braintree/gettoken/${userId}`, config)
    dispatch({
      type: PAYMENT_TOKEN,
      payload: res.data.clientToken,
    })
  } catch (error) {
    dispatch({ type: PAYMENT_TOKEN_FAIL, payload: error.response.data.error })
    dispatch(setAlert(error.response.data.error, "danger"))
  }
}

export const makePayment = (
  userId,
  totalAmount,
  instance,
  cartItems,
  address
) => async (dispatch) => {
  const config = {
    headers: {
      "content-type": "application/json",
    },
  }

  try {
    const result = await instance.requestPaymentMethod()
    const nonce = result.nonce
    const body = {
      paymentMethodNonce: nonce,
      amount: totalAmount,
    }
    const bodystring = JSON.stringify(body)
    const res = await axios.post(
      `/api/braintree/payment/${userId}`,
      bodystring,
      config
    )
    dispatch({
      type: PAYMENT_SUCCESS,
      payload: res.data,
    })
    if (res.data.success) {
      // prepare create order data
      const createOrderData = {
        products: cartItems,
        transaction_id: res.data.transaction.id,
        amount: totalAmount,
        address: address,
      }
      dispatch(setAlert("payment successful", "success"))
      Promise.resolve(
        dispatch(createOrder(userId, { order: createOrderData }))
      ).then((response) => dispatch(emptyCart()))
    } else {
      dispatch(setAlert("payment failed", "danger"))
    }
  } catch (error) {
    dispatch({ type: PAYMENT_FAIL, payload: error })
    dispatch(setAlert(error, "danger"))
  }
}
