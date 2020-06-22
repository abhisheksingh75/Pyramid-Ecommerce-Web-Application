import React, { useEffect, useState, Fragment } from "react"
import Layout from "../core/Layout"
import PropTypes from "prop-types"
import ProductCard from "../core/ProductCard"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { getPaymentToken, makePayment } from "../../actions/payment"
import DropIn from "braintree-web-drop-in-react"
import Alert from "../core/Alert"

function CheckOut({
  auth: { isAuthenticated, user, loading },
  payment: { paymentToken, paymentLoading },
  cart: { cartItems },
  getPaymentToken,
  makePayment,
}) {
  const [lcPaymentToken, setLcPaymentToken] = useState(null)
  const [instance, setInstance] = useState({})
  const [address, setAddress] = useState("")

  const getTotal = () => {
    return cartItems.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  useEffect(() => {
    setLcPaymentToken(paymentToken)
  }, [paymentToken])

  useEffect(() => {
    {
      isAuthenticated && getPaymentToken(user._id)
    }
  }, [isAuthenticated])

  const buy = async () => {
    //send the nonce to server
    makePayment(user._id, getTotal(), instance, cartItems, address)
  }

  const handleChange = (e) => {
    setAddress(e.target.value)
  }

  const showDropIn = () => {
    return (
      <div>
        {lcPaymentToken !== null && cartItems.length > 0 ? (
          <Fragment>
            <div>
              <div className="gorm-group mb-3">
                <label className="text-muted">Delivery Address:</label>
                <textarea
                  onChange={(e) => handleChange(e)}
                  className="form-control"
                  value={address}
                  name="address"
                  placeholder="Type your address here"
                />
              </div>
            </div>
            <div>
              <DropIn
                options={{
                  authorization: lcPaymentToken,
                }}
                onInstance={(instance) => setInstance(instance)}
              />
              <button onClick={buy} className="btn btn-success">
                Make Payment
              </button>
            </div>
          </Fragment>
        ) : null}
      </div>
    )
  }

  return (
    <div>
      <h2>Total: &#8360; {getTotal()}</h2>
      {isAuthenticated && !loading ? (
        showDropIn()
      ) : (
        <Link to="/signin">
          <button className="btn btn-primary"> Sign in to CheckOut</button>
        </Link>
      )}
    </div>
  )
}

CheckOut.propTypes = {
  auth: PropTypes.object.isRequired,
  payment: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  payment: state.payment,
  cart: state.cart,
})
export default connect(mapStateToProps, { getPaymentToken, makePayment })(
  CheckOut
)
