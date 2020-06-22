const User = require("../models/user")
const { Order, CartItem } = require("../models/order")
require("dotenv").config()

exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById({ _id: id })
    if (!user) {
      return res.status(400).json({
        error: "user not found",
      })
    }
    req.profile = user
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.read = (req, res) => {
  req.profile.hashed_password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

exports.update = async (req, res) => {
  try {
    if (req.body.email && req.profile.email !== req.body.email) {
      const userexists = await User.findOne({ email: req.body.email })
      if (userexists) {
        return res
          .status(400)
          .json({ error: "This email is already registered" })
      }
    }
    const newUser = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true }
    ).catch((error) => {
      return res.status(400).json({ error: error.message })
    })
    newUser.hashed_password = undefined
    newUser.salt = undefined
    return res.json(newUser)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.addOrderToUserHistory = async (req, res, next) => {
  let history = []
  req.body.order.products.forEach((item) => {
    history.push({
      _id: item._id,
      name: item.name,
      description: item.description,
      category: item.category,
      quantity: item.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    })
  })
  try {
    await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $push: { history: history } },
      { new: true }
    )
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.purchaseHistory = async (req, res) => {
  try {
    const result = await Order.find({ user: req.profile._id })
      .populate("user", "_id name")
      .sort("-createdAt")
    res.json(result)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
