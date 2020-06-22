import React from "react"
import PropTypes from "prop-types"
import moment from "moment"

function PurchaseHistory({ orderHistory }) {
  return (
    <div className="card ">
      <h3 className="card-header">Purchase History</h3>
      <ul className="list-group">
        <li className="list-group-item">
          {orderHistory.map((order, idx) => {
            return (
              <div>
                {order.products.map((product, productIdx) => {
                  return (
                    <div key={idx}>
                      <h6>Product name: {product.name}</h6>
                      <h6>Product price: Rs{product.price}</h6>
                      <h6>
                        Purchase date: {moment(order.createdAt).fromNow()}
                      </h6>
                      <hr />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </li>
      </ul>
    </div>
  )
}

PurchaseHistory.propTypes = {}

export default PurchaseHistory
