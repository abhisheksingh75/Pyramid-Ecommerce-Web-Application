import React, { useState } from "react"
import Layout from "../core/Layout"
import Alert from "../core/Alert"
import { setAlert } from "../../actions/alert"
import { register } from "../../actions/auth"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Redirect } from "react-router-dom"
const SignUp = ({
  auth: { isAuthenticated, loading, errorFlag, user },
  setAlert,
  register,
}) => {
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const { name, email, password } = formData
  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    register(formData)
  }

  if (isAuthenticated) {
    if (user.role === 0) {
      return <Redirect to="/userdashboard" />
    } else if (user.role === 1) {
      return <Redirect to="/admindashboard" />
    }
  }
  const signUpForm = () => {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
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
        title="SignUp page"
        description="SignUp Node React E-commerce App"
      ></Layout>

      <div className="container col-md-8 offset-md-2">{signUpForm()}</div>
    </div>
  )
}

SignUp.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { setAlert, register })(SignUp)
