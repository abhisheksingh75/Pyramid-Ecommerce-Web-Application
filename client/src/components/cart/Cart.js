import React, { useState, useEffect, Fragment } from "react"
import Layout from "../core/Layout"
import PropTypes from "prop-types"
import ProductCard from "../core/ProductCard"
import { Link } from "react-router-dom"
import CheckOut from "./CheckOut"
import Alert from "../core/Alert"
import { connect } from "react-redux"

function Cart({ cart: { cartItems } }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    if (cartItems !== null) {
      setItems(cartItems)
    }
  }, [cartItems])

  const showItems = (items) => {
    return (
      <Fragment>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            showAddtoCart={false}
            no_of_col="12"
            cardQuantity={true}
            showRemoveProductButton={true}
          />
        ))}
      </Fragment>
    )
  }

  const noItemsMessage = () => (
    <Fragment>
      <h2>Your cart is empty</h2>
      <hr />
      <Link to="/shop">
        <button className="btn btn-primary">Continue Shopping</button>
      </Link>
    </Fragment>
  )

  return (
    <Fragment>
      <Alert />
      <Layout
        title="Shopping Cart"
        description="Manage your cart  items."
      ></Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>
          <div className="col-md-6">
            {items.length > 0 && (
              <Fragment>
                <h2 className="mb-4">Your Cart Summary</h2>
                <hr />
                <CheckOut />
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Cart.propTypes = {
  cart: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  cart: state.cart,
})
export default connect(mapStateToProps, {})(Cart)
