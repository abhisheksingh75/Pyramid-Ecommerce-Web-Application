import React from "react"
import { Link, withRouter } from "react-router-dom"

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

const NavBar = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-items">
          <Link className={getClasses(history, "/")} to="/">
            Home
          </Link>
        </li>
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
      </ul>
    </div>
  )
}

export default withRouter(NavBar)
