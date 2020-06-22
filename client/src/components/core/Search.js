import React, { useState, useEffect, Fragment } from "react"
import PropTypes from "prop-types"
import ProductCard from "./ProductCard"
import { getCategories } from "../../actions/category"
import { getProductsBySearchPattern } from "../../actions/products"
import { connect } from "react-redux"

const Search = ({
  category: { categories, category_loading },
  product: { products_by_search_pattern, products_loading },
  getCategories,
  getProductsBySearchPattern,
}) => {
  const [categoryList, SetCategoryList] = useState([])
  const [formData, setFormData] = useState({
    category: "",
    search: "",
    result: [],
    searched: false,
  })
  // Initializing didMount as false
  const [didMount, setDidMount] = useState(false)

  const { category, search, result, searched } = formData

  useEffect(() => {
    if (categoryList.length <= 0) {
      getCategories()
    }
  }, [])
  useEffect(() => {
    SetCategoryList(categories)
  }, [categories])

  useEffect(() => {
    if (didMount) {
      setFormData({
        ...formData,
        result: products_by_search_pattern,
        searched: true,
      })
    }
  }, [products_by_search_pattern])

  // Setting didMount to true upon mounting
  useEffect(() => setDidMount(true), [])

  const searchedMessage = (searched, result) => {
    if (searched) {
      return `Found ${result.length} products`
    }
  }

  const searchedProducts = (result = []) => {
    return (
      <Fragment>
        <h2 className="mt-4 mb-4">{searchedMessage(searched, result)}</h2>
        <div className="container">
          <div className="row my-flex-card">
            {result.map((product, i) => (
              <ProductCard key={i} product={product} no_of_col="4" />
            ))}
          </div>
        </div>
      </Fragment>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    getProductsBySearchPattern({
      search: search || undefined,
      category: category,
    })
  }
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const searchForm = () => {
    return (
      !category_loading && (
        <form onSubmit={handleSubmit}>
          <span className="input-group-text">
            <div className="input-group-prepend">
              <select
                className="btn mr-2"
                name="category"
                onChange={handleChange}
              >
                <option value="All">Pick category</option>
                {categoryList.map((c, i) => {
                  return (
                    <option key={i} value={c._id}>
                      {c.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange}
              name="search"
              placeholder="search by name"
            />
            <div className="btn input-group-append">
              <button className="input-group-text">Search</button>
            </div>
          </span>
        </form>
      )
    )
  }
  return (
    <Fragment>
      <div className="row">
        <div className="container mb-3">{searchForm()}</div>
      </div>
      {searchedProducts(result)}
    </Fragment>
  )
}
Search.propTypes = {}

const mapStateToProps = (state) => ({
  category: state.category,
  product: state.product,
})

export default connect(mapStateToProps, {
  getCategories,
  getProductsBySearchPattern,
})(Search)
