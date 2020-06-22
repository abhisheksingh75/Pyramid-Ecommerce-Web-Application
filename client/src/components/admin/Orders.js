import React, { useState, useEffect, Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {
  fetchAllOrders,
  getOrderStatusValues,
  UpdateOrderStatusValues,
} from "../../actions/order"
import Layout from "../core/Layout"
import PropTypes from "prop-types"
import { json } from "body-parser"
import Spinner from "../core/Spinner"
import moment from "moment"

function Orders({
  fetchAllOrders,
  getOrderStatusValues,
  UpdateOrderStatusValues,
  order: { list_of_orders, order_loading, order_status_values },
  auth: { user },
}) {
  const [orders, setOrders] = useState([])
  const [orderStatusValues, setOrderStatusValues] = useState([])
  useEffect(() => {
    fetchAllOrders(user._id)
    getOrderStatusValues(user._id)
  }, [])
  useEffect(() => {
    setOrders(list_of_orders)
    setOrderStatusValues(order_status_values)
  }, [list_of_orders, order_status_values])

  const ShowOrdersCount = () => {
    return (
      <Fragment>
        {orders.length > 0 ? (
          <h4>Total orders: {orders.length}</h4>
        ) : (
          <h4>No Orders found!!</h4>
        )}
      </Fragment>
    )
  }

  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
        </div>
        <input type="text" value={value} className="form-control" readOnly />
      </div>
    )
  }

  const handleStatusChange = (e, orderId) => {
    const dataValue = e.target.value
    const statusData = {
      status: dataValue,
    }
    UpdateOrderStatusValues(user._id, orderId, statusData).then(
      fetchAllOrders(user._id)
    )
  }
  const showStatus = (Order) => {
    return (
      <div className="form-group">
        <h5 className="mb-1">Status: {Order.status}</h5>
        <select
          name="order status"
          className="form-control"
          onChange={(e) => handleStatusChange(e, Order._id)}
        >
          <option>Update Status</option>
          {orderStatusValues.map((status, idx) => {
            return (
              <option key={idx} value={status}>
                {status}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  return (
    <Fragment>
      <Layout
        title="List of Orders"
        description={`Good day ${user.name}`}
        className="container"
      ></Layout>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {order_loading ? (
            <Spinner />
          ) : (
            <Fragment>
              {ShowOrdersCount()}
              {orders.map((order, idx) => {
                return (
                  <div
                    className="mt-3"
                    key="idx"
                    style={{ borderBottom: "3px solid indigo" }}
                  >
                    <div className="mb-1">
                      <span>Order ID:{order._id}</span>
                    </div>
                    <ul className="list-group mb-1">
                      <li className="list-group-item">{showStatus(order)}</li>
                      <li className="list-group-item">
                        Transaction ID: {order.transaction_id}
                      </li>
                      <li className="list-group-item">
                        Amount: {order.amount}
                      </li>
                      <li className="list-group-item">
                        Order By: {order.user.name}
                      </li>
                      <li className="list-group-item">
                        Ordered on: {moment(order.createdAt).fromNow()}
                      </li>
                      <li className="list-group-item">
                        Delivery Address : {order.address}
                      </li>
                    </ul>
                    <h5 className="mt-2 mb-2 font-italic">
                      Total products in the Order: {order.products.length}
                    </h5>

                    {order.products.map((product, idx) => {
                      return (
                        <div
                          className="mb-3"
                          key={idx}
                          style={{
                            padding: "10px",
                            border: "1px solid indigo",
                          }}
                        >
                          {showInput("Product ID", product._id)}
                          {showInput("Product Name", product.name)}
                          {showInput("Product Price", product.price)}
                          {showInput("Product quantity ", product.count)}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  )
}

Orders.propTypes = {
  fetchAllOrders: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getOrderStatusValues: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
})

export default connect(mapStateToProps, {
  fetchAllOrders,
  getOrderStatusValues,
  UpdateOrderStatusValues,
})(Orders)
