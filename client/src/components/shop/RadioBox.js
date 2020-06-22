import React, { useState, useEffect, Fragment } from "react"
import PropTypes from "prop-types"

function RadioBox({ prices, handleFilters }) {
  const [values, setValues] = useState(0)

  const handleChange = (event) => {
    handleFilters(event.target.value)
    setValues(event.target.value)
  }

  return (
    <Fragment>
      {prices.map((price, idx) => {
        return (
          <li key={idx} className="list-unstyled">
            <input
              onChange={handleChange}
              value={price._id}
              name={price}
              type="radio"
              className="form-check-inp"
            />
            <label className="form-check-label ml-2">{price.name}</label>
          </li>
        )
      })}
    </Fragment>
  )
}

RadioBox.propTypes = {}

export default RadioBox
