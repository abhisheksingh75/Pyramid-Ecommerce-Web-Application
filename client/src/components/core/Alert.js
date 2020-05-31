import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

const Alert = ({ alerts }) => {
  if (alerts !== null && alerts.length > 0) {
    return (
      <div>
        <div
          aria-live="polite"
          aria-atomic="true"
          // style="position: relative; min-height: 200px;"
          style={{ position: "relative" }}
        >
          <div style={{ position: "absolute", top: "0", right: "0" }}>
            {alerts.map((alert) => (
              <div
                className={`alert alert-dismissible fade show  alert-${alert.alertType}`}
                key={alert.id}
                role="alert"
              >
                {alert.msg}
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  return <Fragment></Fragment>
}

Alert.propTypes = {
  alerts: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps)(Alert)
