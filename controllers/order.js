const { Order, CartItem } = require("../models/order")
const { errorHandler } = require("../helpers/dbErrorHandler")

exports.orderById = async (req, res, next, id) => {
  try {
    const res = await Order.findById(id).populate(
      "products.product",
      "name price"
    )
    req.order = res
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ error: error.message })
  }
}

exports.create = async (req, res) => {
  req.body.order.user = req.profile
  try {
    const order = new Order(req.body.order)
    await order.save()
    res.send(order)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.listOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "_id name email")
      .sort("-createdAt")
    res.json(orders)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.getOrderStatusValues = async (req, res) => {
  res.json(Order.schema.path("status").enumValues)
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.updateOne(
      { _id: req.params.orderId },
      { $set: { status: req.body.status } }
    )
    res.json(order)
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ error: error.message })
  }
}
