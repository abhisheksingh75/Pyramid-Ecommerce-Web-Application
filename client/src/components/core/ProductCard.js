import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import ShowImg from "./ShowImg"
import moment from "moment"
import { addItem, removeItem, updateItem } from "../../actions/cart"
import { connect } from "react-redux"

function ProductCard({
  product,
  no_of_col,
  showViewProduct = true,
  showAddtoCart = true,
  cardQuantity = false,
  showRemoveProductButton = false,
  history,
  updateItem,
  removeItem,
  addItem,
}) {
  const [count, setCount] = useState(product.count)
  const handleChange = (event, productId) => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
  }

  const addCardQuantity = () => {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Adjust Qunatity</span>
        </div>
        <input
          type="number"
          className="form-control"
          value={count}
          name="count"
          onChange={(event) => handleChange(event, product._id)}
        />
      </div>
    )
  }

  const removeproudctItem = () => {
    removeItem(product._id)
  }

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button onClick={removeproudctItem} className="btn btn-outline-danger">
          Remove Product
        </button>
      )
    )
  }

  const getClassName = () => {
    if ((showViewProduct && showAddtoCart) || showRemoveProductButton) {
      return "row mt-auto justify-content-around"
    } else {
      return ""
    }
  }
  const showStock = () => {
    return product.quantity > 0 ? (
      <span
        className="badge badge-primary badge-pill"
        style={{ width: "60px" }}
      >
        In stock
      </span>
    ) : (
      <span className="badge badge-primary badge-pill" style={{ width: "60%" }}>
        Out of stock
      </span>
    )
  }
  const addToCart = () => {
    addItem(product)
    history.push("/cart")
  }
  return (
    <div className={`col-md-${no_of_col} mb-2`}>
      <div className="card">
        <div className="card-header product-name">{product.name}</div>
        <div className="card-body d-flex flex-column">
          <ShowImg productId={product._id} />
          <p className="lead mt-2">{product.description.substring(0, 40)}</p>
          <p className="black-10">&#8360; {product.price}</p>
          <p className="black-9">
            Category: {product.category && product.category.name}
          </p>

          <p className="black-8">
            Added on {moment(product.createdAt).fromNow()}
          </p>

          {/* add qunatity parameter */}
          {cardQuantity && addCardQuantity()}
          {/* show stock */}
          {showStock()}
          <br />

          <div className={getClassName()}>
            {showViewProduct && (
              <Link to={`/product/${product._id}`}>
                <button className="btn btn-outline-primary">
                  View Product
                </button>
              </Link>
            )}
            {showAddtoCart && (
              <button onClick={addToCart} className="btn btn-outline-primary">
                Add to Cart
              </button>
            )}
            {showRemoveButton(showRemoveProductButton)}
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {
  cart: PropTypes.object.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})

export default withRouter(
  connect(mapStateToProps, { updateItem, removeItem, addItem })(ProductCard)
)
