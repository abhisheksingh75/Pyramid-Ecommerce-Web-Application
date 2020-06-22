const express = require("express")
const dbConnect = require("./config/dbconfig.js")
const morgan = require("morgan")
const bodyParser = require("body-Parser")
const cookieParser = require("cookie-Parser")
const app = express()
require("dotenv").config()

//Connect to DBy
dbConnect()

//middleware
app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(cookieParser())

//apply middleware-source to destination mapping of routes
app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/user", require("./routes/api/user"))
app.use("/api/category", require("./routes/api/category"))
app.use("/api/product", require("./routes/api/product"))
app.use("/api/braintree", require("./routes/api/braintree"))
app.use("/api/order", require("./routes/api/order"))

//assign Port
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server is listing on port${port}`)
})
