import React, { useState, useEffect, Fragment } from "react"
import Layout from "./Layout"
import { getProductsByCreatedAt } from "../../actions/products"
import { getProductsBySold } from "../../actions/products"
import PropTypes from "prop-types"
import { set } from "mongoose"
import { connect } from "react-redux"
import ProductCard from "./ProductCard"

const Home = ({
  product: { products_by_sold, products_by_createdAt },
  getProductsByCreatedAt,
  getProductsBySold,
}) => {
  const [productBySell, setProductBySell] = useState([])
  const [productByArrival, setProductByArrival] = useState([])

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
      <h2 className="mb-4">New Arrivals</h2>
      <div className="container">
        <div className="row my-flex-card">
          {productByArrival.map((product, idx) => {
            return <ProductCard key={idx} product={product} />
          })}
        </div>
      </div>
      {/* Best  Seller */}
      <h2 className="mb-4">Best Seller</h2>
      <div className="container">
        <div className="row my-flex-card">
          {productBySell.map((product, idx) => {
            return <ProductCard key={idx} product={product} />
          })}
        </div>
      </div>
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
