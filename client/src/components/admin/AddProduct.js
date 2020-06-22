import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { createProduct } from "../../actions/products"
import { getCategories } from "../../actions/category"
import Layout from "../core/Layout"
import Alert from "../core/Alert"

function AddProduct({
  auth: { user },
  category: { categories },
  createProduct,
  getCategories,
}) {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    formCategories: [],
    Category: "",
    shipping: "",
    quantity: "",
    photo: "",
    formData: "",
    createdProduct: "",
  })

  const {
    name,
    description,
    price,
    formCategories,
    category,
    shipping,
    quantity,
    photo,
    formData,
    createdProduct,
  } = formValues
  useEffect(() => {
    setFormValues({
      ...formValues,
      formData: new FormData(),
      formCategories: categories,
    })
  }, [categories])

  useEffect(() => {
    getCategories()
  }, [])

  const handleChange = (e) => {
    const value = e.target.name === "photo" ? e.target.files[0] : e.target.value
    formData.set(e.target.name, value)
    setFormValues({ ...formValues, [e.target.name]: value })
  }

  const resetForm = () => {
    document.getElementById("create-product-form").reset()
    setFormValues({
      ...formValues,
      name: "",
      description: "",
      price: "",
      quantity: "",
      formData: new FormData(),
    })
  }
  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    createProduct(user._id, formData)
    resetForm()
  }

  const newPostForm = () => (
    <form className="mb-3" id="create-product-form">
      <label className="text-muted" htmlFor="">
        Add Photo
      </label>
      <div className="form-group">
        <label className="form-control" id="photo-field-padding">
          <input
            type="file"
            name="photo"
            id="inp"
            accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            onChange={handleChange}
          />
        </label>
      </div>
      {/* Name */}
      <div className="form-group">
        <label className="text-muted" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          value={name}
          name="name"
          onChange={handleChange}
        />
      </div>
      {/* Description */}
      <div className="form-group">
        <label className="text-muted" htmlFor="description">
          Description
        </label>
        <textarea
          className="form-control"
          value={description}
          name="description"
          onChange={handleChange}
          rows="2"
        />
      </div>
      {/* Price */}
      <div className="form-group">
        <label className="text-muted" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          value={price}
          name="price"
          onChange={handleChange}
        />
      </div>
      {/* Category */}
      <div className="form-group">
        <label className="text-muted" htmlFor="category">
          Category
        </label>
        <select
          className="form-control"
          name="category"
          onChange={handleChange}
        >
          <option>Please Select</option>
          {formCategories &&
            formCategories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {/* qunatity */}
      <div className="form-group">
        <label className="text-muted" htmlFor="quantity">
          Quantity
        </label>
        <input
          type="number"
          className="form-control"
          value={quantity}
          name="quantity"
          onChange={handleChange}
        />
      </div>
      {/* Shipping */}
      <div className="form-group">
        <label className="text-muted" htmlFor="shipping">
          Shipping
        </label>
        <select
          className="form-control"
          onChange={handleChange}
          name="shipping"
        >
          <option>Please Select</option>
          <option value="0">Not Available</option>
          <option value="1">Available</option>
        </select>
      </div>
      {/* submit button */}
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={HandleSubmit}
      >
        Create Product
      </button>
    </form>
  )

  return (
    <Fragment>
      <Alert />
      <Layout
        title="Add a new Product"
        description={`Hey ${user.name}, Wanna add new product?`}
      ></Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">{newPostForm()}</div>
        </div>
      </div>
    </Fragment>
  )
}

AddProduct.propTypes = {
  auth: PropTypes.object.isRequired,
  createProduct: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  category: state.category,
})

export default connect(mapStateToProps, { createProduct, getCategories })(
  AddProduct
)
