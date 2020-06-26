import React, { Fragment, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { logOut } from "../../actions/auth"
import { PropTypes } from "prop-types"
import ReactGa from "react-ga"

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return "border-white border-bottom-0"
  } else {
    return ""
  }
}

const getClasses = (history, path) => {
  return "nav-link text-white " + isActive(history, path)
}

const NavBar = ({
  auth: { isAuthenticated, loading, user },
  cart: { cartItems },
  logOut,
  history,
}) => {
  useEffect(() => {
    ReactGa.initialize("UA-168534600-2")
    ReactGa.pageview(window.location.pathname + window.location.search)
    console.log(window.location.pathname)
  }, [window.location.pathname])
  const authLinks = () => {
    return (
      <Fragment>
        <li className="nav-items">
          {user.role === 0 ? (
            <Link
              className={getClasses(history, "/userdashboard")}
              to="/userdashboard"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              className={getClasses(history, "/admindashboard")}
              to="/admindashboard"
            >
              Dashboard
            </Link>
          )}
        </li>
        <li className="nav-items">
          <a
            className={getClasses(history, "/logout")}
            style={{ cursor: "pointer" }}
            onClick={logOut}
          >
            Logout
          </a>
        </li>
      </Fragment>
    )
  }
  const guestLinks = () => {
    return (
      <Fragment>
        <li className="nav-items">
          <Link className={getClasses(history, "/signin")} to="/signin">
            SignIn
          </Link>
        </li>
        <li className="nav-items">
          <Link className={getClasses(history, "/signup")} to="/signup">
            SignUp
          </Link>
        </li>
      </Fragment>
    )
  }

  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-items">
          <Link className={getClasses(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-items">
          <Link className={getClasses(history, "/shop")} to="/shop">
            Shop
          </Link>
        </li>
        <li className="nav-items">
          <Link className={getClasses(history, "/cart")} to="/cart">
            Cart{" "}
            <sup>
              <small className="badge badge-light badge-circle">
                {cartItems !== null ? cartItems.length : 0}
              </small>
            </sup>
          </Link>
        </li>
        {!loading && isAuthenticated ? authLinks() : guestLinks()}
      </ul>
    </div>
  )
}

NavBar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { auth: state.auth, cart: state.cart }
}

export default connect(mapStateToProps, { logOut })(withRouter(NavBar))
