import React, { useEffect } from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import SignIn from "../auth/SignIn"
import SignUp from "../auth/SignUp"
import Home from "../home/Home"
import NavBar from "../core/NavBar"
import { connect } from "react-redux"
import setAuthTokoen from "../../utilities/setAuthToken"
import { loadUser } from "../../actions/auth"
import UserDashboard from "../user/UserDashboard"
import PrivateRoute from "./PrivateRoute"
import AdminRoute from "./AdminRoute"
import AdminDashboard from "../admin/AdminDashboard"
import AddCategory from "../admin/AddCategory"
import AddProduct from "../admin/AddProduct"
import Shop from "../shop/Shop"
import ProductPage from "../product/ProductPage"
import Cart from "../cart/Cart"
import Orders from "../admin/Orders"
import Profile from "../user/Profile"
import EditProduct from "../admin/EditProduct"

if (localStorage.token) {
  // console.log("inside localstroage.token")
  setAuthTokoen(localStorage.token)
}

const Main = ({ loadUser }) => {
  useEffect(() => {
    loadUser()
  }, [])
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/shop" component={Shop}></Route>
        <Route exact path="/signin" component={SignIn}></Route>
        <Route exact path="/signup" component={SignUp}></Route>
        <Route exact path="/product/:productId" component={ProductPage}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <PrivateRoute exact path="/userdashboard" component={UserDashboard} />
        <PrivateRoute exact path="/profile/:userId" component={Profile} />
        <AdminRoute exact path="/admindashboard" component={AdminDashboard} />
        <AdminRoute exact path="/admindashboard/orders" component={Orders} />
        <AdminRoute exact path="/create/category" component={AddCategory} />
        <AdminRoute exact path="/create/product" component={AddProduct} />
        <AdminRoute exact path="/edit/product" component={EditProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default connect(null, { loadUser })(Main)
