import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import category from "./category"
import product from "./product"
import payment from "./payment"
import cart from "./cart"
import order from "./order"
import user from "./user"
export default combineReducers({
  alert,
  auth,
  category,
  product,
  payment,
  cart,
  order,
  user,
})
