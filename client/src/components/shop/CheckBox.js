import React, { useState } from "react"
import PropTypes from "prop-types"

function CheckBox({ categories, handleFilters }) {
  const [checked, setChecked] = useState([])

  const handleToggle = (cat_id) => () => {
    //   return the first index or -1
    const currentCategoryId = checked.indexOf(cat_id)
    const newCheckedCategoryId = [...checked]
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(cat_id)
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1)
    }
    setChecked(newCheckedCategoryId)
    handleFilters(newCheckedCategoryId)
  }

  return (
    <div>
      {categories.map((category, idx) => {
        return (
          <li key={idx} className="list-unstyled">
            <input
              onChange={handleToggle(category._id)}
              value={checked.indexOf(category._id === -1)}
              type="checkbox"
              className="form-check-inp"
            />
            <label className="form-check-label ml-2">{category.name}</label>
          </li>
        )
      })}
    </div>
  )
}

CheckBox.propTypes = {}

export default CheckBox
