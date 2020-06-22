import React, { useState, useEffect, Fragment } from "react"
import Layout from "../core/Layout"
import PropTypes from "prop-types"
import ProductCard from "../core/ProductCard"
import axios from "axios"

function ProductPage(props) {
  const [product, setProduct] = useState({})
  const [realtedProducts, setRealtedProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const productId = props.match.params.productId
      const config = {
        headers: {
          Accept: "application/json",
        },
      }
      try {
        const result = await axios.get(`/api/product/read/${productId}`, config)
        setProduct(result.data)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchData()
  }, [props])

  useEffect(() => {
    const fetchData = async () => {
      const productId = props.match.params.productId
      const config = {
        headers: {
          Accept: "application/json",
        },
      }
      try {
        const result = await axios.get(
          `/api/product/related/${productId}`,
          config
        )
        setRealtedProducts(result.data)
      } catch (error) {
        console.log(error.response.data.error)
      }
    }
    fetchData()
  }, [props])

  return (
    <Fragment>
      <Layout
        title="Product page"
        description="Node React E-commerce App"
      ></Layout>
      <div className="row">
        {product && product.description && (
          <ProductCard
            product={product}
            no_of_col="6"
            showViewProduct={false}
          />
        )}
        {realtedProducts.length > 0 && (
          <div className="col-md-4 ml-2">
            <h4>Related Products</h4>
            {realtedProducts.map((product, i) => {
              return <ProductCard product={product} />
            })}
          </div>
        )}
      </div>
    </Fragment>
  )
}

ProductPage.propTypes = {}

export default ProductPage
