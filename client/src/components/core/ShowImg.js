import React from "react"
import PropTypes from "prop-types"
import defaultimg from "../../Img/defaultimg.jpg"

function ShowImg({ productId }) {
  return (
    <div className="product-img">
      <img
        src={`/api/product/photo/${productId}`}
        onError={(event) => {
          event.target.onerror = null
          event.target.src = defaultimg
        }}
        alt="Card image cap"
        className="mb-3"
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    </div>
  )
}

ShowImg.propTypes = {}

export default ShowImg
