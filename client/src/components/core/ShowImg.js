import React from "react"
import PropTypes from "prop-types"

function ShowImg({ productId }) {
  return (
    <div className="product-img">
      <img
        src={`/api/product/photo/${productId}`}
        alt="Card image cap"
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  )
}

ShowImg.propTypes = {}

export default ShowImg
