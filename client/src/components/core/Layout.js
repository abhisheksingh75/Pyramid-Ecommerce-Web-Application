import React, { Fragment } from "react"

const Layout = ({
  title = "title",
  description = "description",
  className,
  children,
}) => {
  return (
    <Fragment>
      <div className="jumbotron">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}></div>
    </Fragment>
  )
}

export default Layout
