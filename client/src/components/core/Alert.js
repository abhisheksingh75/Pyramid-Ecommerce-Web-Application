import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { removeAlert } from "../../actions/alert"

const Alert = ({ alerts, removeAlert }) => {
  if (alerts !== null && alerts.length > 0) {
    return (
      <div>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "10",
            }}
          >
            {alerts.map((alert) => (
              <div
                className={`alert alert-dismissible alert-${alert.alertType} fade show elementToFadeInAndOut`}
                key={alert.id}
                role="alert"
              >
                {alert.msg}
                <button
                  type="button"
                  class="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => removeAlert(alert.id)}
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
  return <div></div>
}

Alert.propTypes = {
  alerts: PropTypes.object.isRequired,
  removeAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps, { removeAlert })(Alert)
