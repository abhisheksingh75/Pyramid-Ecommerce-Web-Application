import {
  CART_ADDITEM,
  CART_UPDATE,
  CART_REMOVEITEM,
  CART_DELETE,
} from "./types"

export const addItem = (item) => (dispatch) => {
  let cart = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({
      ...item,
      count: 1,
    })

    cart = Array.from(new Set(cart.map((product) => product._id))).map((id) => {
      return cart.find((product) => product._id === id)
    })

    localStorage.setItem("cart", JSON.stringify(cart))
    dispatch({ type: CART_ADDITEM, payload: cart })
  }
}

// export const itemTotal = () => (dispatch)=> {
//   if (typeof window !== "undefined") {
//     if (localStorage.getItem("cart")) {
//       return JSON.parse(localStorage.getItem("cart")).length
//     }
//   }
//   return 0
// }

// export const getCart = () => {
//   if (typeof window !== "undefined") {
//     if (localStorage.getItem("cart")) {
//       return JSON.parse(localStorage.getItem("cart"))
//     }
//   }
//   return []
// }

export const updateItem = (productId, count) => (dispatch) => {
  let cart = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }

    cart.map((product, idx) => {
      if (product._id === productId) {
        cart[idx].count = count
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  dispatch({ type: CART_UPDATE, payload: cart })
}

export const removeItem = (productId) => (dispatch) => {
  let cart = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }

    cart.map((product, idx) => {
      if (product._id === productId) {
        cart.splice(idx, 1)
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart))
  }
  dispatch({ type: CART_REMOVEITEM, payload: cart })
}

export const emptyCart = () => (dispatch) => {
  let cart = []
  if (typeof window !== "undefined") {
    localStorage.removeItem("cart")
  }
  dispatch({ type: CART_DELETE, payload: cart })
}
