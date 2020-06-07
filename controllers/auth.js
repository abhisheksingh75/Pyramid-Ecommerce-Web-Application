const User = require("../models/user")
const { errorHandler } = require("../helpers/dbErrorHandler")
const { validationResult } = require("express-validator")
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
require("dotenv").config()

exports.signUp = async (req, res) => {
  //check for errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const firstError = errors.errors[0].msg
    return res.status(400).json({ error: firstError })
  }

  try {
    let user = new User(req.body)
    user.email = user.email.toUpperCase()
    //check if email already exits
    const userexists = await User.findOne({ email: user.email })
    if (userexists) {
      return res.status(400).json({ error: "Email already registered" })
    }

    await user.save()
    user.salt = undefined
    user.hashed_password = undefined

    //generate a signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    //persit token in cookie
    res.cookie("t", token, { expire: new Date() + 999999 })
    //return to user
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, name, email, role } })
  } catch (error) {
    res.status(400).json({
      error: errorHandler(error),
    })
  }
}

exports.signIn = async (req, res) => {
  let { email, password } = req.body
  email = email.toUpperCase()
  //check for errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const firstError = errors.errors[0].msg
    return res.status(400).json({ error: firstError })
  }
  //check if email exist
  try {
    //check if email already exists
    const user = await User.findOne({ email: req.body.email.toUpperCase() })
    if (!user) {
      return res.status(400).json({ error: "Email is not registered" })
    }
    //check password is correct
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: "Invalid Email and Password" })
    }
    //generate a signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    //return to user
    const { _id, name, email, role } = user
    return res.json({ token, user: { _id, name, email, role } })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
})

exports.isAuth = (req, res, next) => {
  const user = req.profile && req.auth && req.profile._id == req.auth._id
  if (!user) {
    return res.status(403).json({ error: "Accces Denied" })
  }
  next()
}

exports.isAdmin = (req, res, next) => {
  if (req.profile.role !== 1) {
    return res.status(403).json({ error: "Admin resource! Accces Denied" })
  }
  next()
}

exports.loadUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.auth._id })
    //return to user
    const { _id, name, email, role } = user
    return res.json({ _id, name, email, role })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
