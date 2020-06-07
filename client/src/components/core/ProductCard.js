import React from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import ShowImg from "./ShowImg"

function ProductCard({ product }) {
  return (
    <div className="col-md-4 mb-2">
      <div className="card">
        <div className="card-header">{product.name}</div>
        <div className="card-body d-flex flex-column">
          <ShowImg productId={product._id} />
          <p>{product.description}</p>
          <p>&#8360; {product.price}</p>
          <div className="row mt-auto justify-content-around">
            <Link to="/">
              <button className="btn btn-outline-primary m-1">
                View Product
              </button>
            </Link>
            <button className="btn btn-outline-primary m-1">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

ProductCard.propTypes = {}

export default ProductCard
