import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Alert from "../core/Alert"
import {
  readProduct,
  updateProduct,
  deleteProduct,
  readAllProducts,
} from "../../actions/products"

function EditProduct({
  product: { product_read_byId, product_read_all, products_loading },
  auth: { user },
  readAllProducts,
  deleteProduct,
}) {
  const [products, setproducts] = useState([])
  useEffect(() => {
    readAllProducts()
  }, [])
  useEffect(() => {
    setproducts(product_read_all)
  }, [product_read_all])

  const destroy = (productId, userId) => {
    deleteProduct(productId, userId)
  }
  return (
    <div className="container">
      <Alert />
      <div className="col-md-12">
        <h3 className="text-center">Total {products.length} products</h3>
        <table class="table">
          <tbody>
            {products.map((product, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    <strong>{product.name}</strong>
                  </td>
                  <td>
                    <span className="badge badge-warning badge-pill mouse-pointer">
                      Update
                    </span>
                  </td>
                  <td>
                    <span
                      onClick={() => destroy(product._id, user._id)}
                      className="badge badge-danger badge-pill justify-self-end mouse-pointer"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

EditProduct.propTypes = {
  product: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  product: state.product,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  readProduct,
  updateProduct,
  deleteProduct,
  readAllProducts,
})(EditProduct)
