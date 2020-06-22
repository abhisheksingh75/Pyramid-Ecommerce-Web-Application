import React, { useState, useEffect, Fragment } from "react"
import Layout from "../core/Layout"
import { getProductsByCreatedAt } from "../../actions/products"
import { getProductsBySold } from "../../actions/products"
import PropTypes from "prop-types"
import { set } from "mongoose"
import { connect } from "react-redux"
import ProductCard from "../core/ProductCard"

import Search from "../core/Search"
import Spinner from "../core/Spinner"

const Home = ({
  product: { products_by_sold, products_by_createdAt, products_loading },
  getProductsByCreatedAt,
  getProductsBySold,
}) => {
  const [productBySell, setProductBySell] = useState([])
  const [productByArrival, setProductByArrival] = useState([])
  const [categoryList, SetCategoryList] = useState([])

  useEffect(() => {
    setProductBySell(products_by_sold)
  }, [products_by_sold])

  useEffect(() => {
    setProductByArrival(products_by_createdAt)
  }, [products_by_createdAt])

  useEffect(() => {
    if (products_by_sold.length <= 0) {
      getProductsBySold()
    }
    if (products_by_createdAt.length <= 0) {
      getProductsByCreatedAt()
    }
  }, [])

  return (
    <Fragment>
      <Layout
        title="Home page"
        description="Node React E-commerce App"
      ></Layout>
      {/* check if product is still loading show spinner */}
      {products_loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div>
            <Search />
          </div>

          <h2 className="mb-4">New Arrivals</h2>
          <div className="container">
            <div className="row my-flex-card">
              {productByArrival.map((product, idx) => {
                return <ProductCard key={idx} product={product} no_of_col="4" />
              })}
            </div>
          </div>

          {/* Best  Seller */}
          <h2 className="mb-4">Best Seller</h2>
          <div className="container">
            <div className="row my-flex-card">
              {productBySell.map((product, idx) => {
                return <ProductCard key={idx} product={product} no_of_col="4" />
              })}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Home.propTypes = {
  product: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  product: state.product,
})

export default connect(mapStateToProps, {
  getProductsByCreatedAt,
  getProductsBySold,
})(Home)
