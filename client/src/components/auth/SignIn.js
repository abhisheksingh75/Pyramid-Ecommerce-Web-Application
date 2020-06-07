import React, { useState } from "react"
import Layout from "../core/Layout"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { login } from "../../actions/auth"
import Alert from "../core/Alert"
import { Redirect } from "react-router-dom"
const SignIn = ({
  auth: { isAuthenticated, loading, errorFlag, user },
  login,
}) => {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  })
  const { email, password } = formData

  function onChange(e) {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(formData)
  }
  if (isAuthenticated) {
    if (user.role === 0) {
      return <Redirect to="/userdashboard" />
    } else if (user.role === 1) {
      return <Redirect to="/admindashboard" />
    }
  }

  const signInForm = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    )
  }
  return (
    <div>
      <Alert />
      <Layout
        title="SignIn page"
        description="Sign in Node React E-commerce App"
      ></Layout>
      <div className="container col-md-8 offset-md-2">{signInForm()}</div>
    </div>
  )
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { login })(SignIn)
