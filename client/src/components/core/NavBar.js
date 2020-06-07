import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { logOut } from "../../actions/auth"
import { PropTypes } from "prop-types"

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return "border-white"
  } else {
    return ""
  }
}

const getClasses = (history, path) => {
  return "nav-link text-white " + isActive(history, path)
}

const NavBar = ({
  auth: { isAuthenticated, loading, user },
  logOut,
  history,
}) => {
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
        {!loading && isAuthenticated ? authLinks() : guestLinks()}
      </ul>
    </div>
  )
}

NavBar.propTypes = {
  logOut: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return { auth: state.auth }
}

export default connect(mapStateToProps, { logOut })(withRouter(NavBar))
