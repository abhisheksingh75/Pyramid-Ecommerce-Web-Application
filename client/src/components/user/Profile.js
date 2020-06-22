import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { readUser, updateUser } from "../../actions/user"
import Alert from "../core/Alert"
// import component
import Layout from "../core/Layout"

function Profile({ auth, readUser, updateUser, user: { userData } }) {
  const [formData, setFromdata] = useState({
    name: "",
    email: "",
  })

  const { name, email } = formData

  useEffect(() => {
    readUser(auth.user._id)
  }, [])

  useEffect(() => {
    if (userData) {
      setFromdata({ ...formData, name: userData.name, email: userData.email })
    }
  }, [userData])

  const handleChange = (e) => {
    setFromdata({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    //will send update
    e.preventDefault()
    updateUser(auth.user._id, { name, email })
  }
  const profileUpdate = (name, email) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            className="form-control"
            value={email}
          />
        </div>
        <button onClick={handleSubmit} className="btn btn-primary">
          Submit
        </button>
      </form>
    )
  }
  return (
    <div className="container">
      <Alert />
      <h3 className="mb-4">Profile Update</h3>
      {profileUpdate(name, email)}
    </div>
  )
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  user: state.user,
  auth: state.auth,
})

export default connect(mapStateToProps, { readUser, updateUser })(Profile)
