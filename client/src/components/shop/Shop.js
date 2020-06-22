import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import Layout from "../core/Layout"
import { connect } from "react-redux"
import CheckBox from "./CheckBox"
import { prices } from "./fixedPrice"
import RadioBox from "./RadioBox"
import { getCategories } from "../../actions/category"
import { getProductsBySearch } from "../../actions/products"
import ProductCard from "../core/ProductCard"
import Spinner from "../core/Spinner"

function Shop({
  category: { categories, category_loading },
  product: { products_by_search, products_loading },
  getCategories,
  getProductsBySearch,
}) {
  const [categoryList, SetCategoryList] = useState([])
  const [myFilters, setMyFilters] = useState({
    filters: {
      category: [],
      price: [],
    },
  })
  useEffect(() => {
    if (categories.length <= 0) {
      getCategories()
    }
  }, [])
  useEffect(() => {
    SetCategoryList(categories)
  }, [categories])

  // load product based on filters applied, reload if filters changes
  useEffect(() => {
    getProductsBySearch(myFilters)
  }, [myFilters.filters.price, myFilters.filters.category])
  const handlePrice = (value) => {
    //sds
    const data = prices
    let array = []
    for (let idx in data) {
      if (data[idx]._id === parseInt(value)) {
        array = data[idx].array
        break
      }
    }
    return array
  }
  const handleFilters = (filters, filterBy) => {
    const newFitlers = { ...myFilters }
    newFitlers.filters[filterBy] = filters

    // for price
    if (filterBy == "price") {
      let priceValue = handlePrice(filters)
      newFitlers.filters[filterBy] = priceValue
    }

    setMyFilters(newFitlers)
  }

  const loadMore = () => {
    getProductsBySearch(myFilters, products_by_search.length, true)
  }

  return (
    <Fragment>
      <Layout
        title="Shope Page"
        description="Node react E-commerce app"
        className="container-fluid"
      ></Layout>
      {category_loading || products_loading ? (
        <Spinner />
      ) : (
        <div className="row">
          <div className="col-4">
            <h5 className="ml-2">Filter Category</h5>
            <ul>
              <CheckBox
                categories={categoryList}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>

            <h5 className="mt-2 ml-2">Filter Price</h5>
            <ul>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </ul>
          </div>
          <div className="col-8">
            <div className="container-fluid">
              <div className="row my-flex-card">
                {products_by_search.map((product, idx) => {
                  return (
                    <ProductCard key={idx} product={product} no_of_col="6" />
                  )
                })}
              </div>
              <hr />
              <button
                onClick={loadMore}
                className="btn btn-outline-warning mb-5"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

Shop.propTypes = {
  category: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getProductsBySearch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  category: state.category,
  product: state.product,
})

export default connect(mapStateToProps, { getCategories, getProductsBySearch })(
  Shop
)
