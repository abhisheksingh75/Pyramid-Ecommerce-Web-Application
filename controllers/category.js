const Category = require("../models/category")
const { errorHandler } = require("../helpers/dbErrorHandler")
const { validationResult } = require("express-validator")

exports.create = async (req, res) => {
  //check for errors
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const firstError = errors.errors[0].msg
    return res.status(400).json({ error: firstError })
  }
  try {
    const category = new Category(req.body)
    await category.save()
    res.send(category)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById({ _id: id }).catch((err) => {
      return res.status(400).json({
        error: "Category not found",
      })
    })
    req.category = category
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//read
exports.read = (req, res) => {
  return res.json(req.category)
}

//update
exports.update = async (req, res) => {
  try {
    const category = req.category
    category.name = req.body.name
    await category.save()
    return res.json(category)
  } catch (error) {
    return res.json({ error: error.message })
  }
}

//update
exports.remove = async (req, res) => {
  try {
    const category = req.category
    await category.remove()
    return res.json({ message: "Category removed" })
  } catch (error) {
    return res.json({ error: error.message })
  }
}

exports.list = async (req, res) => {
  try {
    const categories = await Category.find()
    return res.json(categories)
  } catch (error) {
    return res.json({ error: error.message })
  }
}
