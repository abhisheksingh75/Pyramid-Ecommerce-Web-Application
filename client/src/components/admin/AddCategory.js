import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { createCategory } from "../../actions/category"
import Alert from "../core/Alert"

function AddCategory({ auth, createCategory }) {
  const [name, setName] = useState("")
  const HandleChange = (e) => {
    setName(e.target.value)
  }
  const HandleSubmit = (e) => {
    e.preventDefault()
    createCategory(name, auth.user._id)
    setName("")
  }
  return (
    <div>
      <Alert />
      <div className="container col-md-8 offset-md-2">
        <form className="mt-3">
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input
              type="text"
              className="form-control"
              onChange={HandleChange}
              value={name}
              autoFocus
            />
          </div>
          <button className="btn btn-outline-primary" onClick={HandleSubmit}>
            Create Category
          </button>
        </form>
      </div>
    </div>
  )
}

AddCategory.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { createCategory })(AddCategory)
