import { combineReducers } from "redux"
import alert from "./alert"
import auth from "./auth"
import category from "./category"
import product from "./product"
export default combineReducers({ alert, auth, category, product })
