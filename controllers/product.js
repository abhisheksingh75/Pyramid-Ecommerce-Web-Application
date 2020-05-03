const formidable = require("formidable")
const fs = require("fs")
const _ = require("lodash")
const Product = require("../models/product")
const { errorHandler } = require("../helpers/dbErrorHandler")
const { validationResult } = require("express-validator")

//Create Product
exports.create = async (req, res) => {
  //save data
  try {
    //form data
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Image could not be uploaded" })
      }
      const product = new Product(fields)
      const { name, description, price, category, quantity, shipping } = fields
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({ error: "All fields are required" })
      }
      // console.log(product)
      if (files.photo) {
        if (files.photo.size > 3145728) {
          return res
            .status(400)
            .json({ error: "Image should be less than 3MB in Size" })
        }
        product.photo.data = fs.readFileSync(files.photo.path)
        product.photo.contentType = files.photo.type
      }
      const result = await product.save()
      return res.json(result)
    })
  } catch (error) {
    // console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

//find product by ID
exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById({ _id: id })
    if (!product) {
      return res.status(400).json({
        error: "Product not found",
      })
    }
    req.product = product
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//read product by Id
exports.read = (req, res) => {
  req.product.photo = undefined
  res.send(req.product)
}

//delete product by Id
exports.remove = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.product._id)
    return res.json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//update Product
exports.update = (req, res) => {
  //save data
  try {
    //form data
    const form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "Image could not be uploaded" })
      }
      const { name, description, price, category, quantity, shipping } = fields
      if (
        !name ||
        !description ||
        !price ||
        !category ||
        !quantity ||
        !shipping
      ) {
        return res.status(400).json({ error: "All fields are required" })
      }

      let product = req.product
      product = _.extend(product, fields)

      if (files.photo) {
        if (files.photo.size > 3145728) {
          return res
            .status(400)
            .json({ error: "Image should be less than 3MB in Size" })
        }
        product.photo.data = fs.readFileSync(files.photo.path)
        product.photo.contentType = files.photo.type
      }
      const result = await product.save()
      return res.json(result)
    })
  } catch (error) {
    // console.log(error)
    return res.status(400).json({ error: error.message })
  }
}

// sell/ arival
// by sell =/prodcuts?sortby=sold&order=desc&limit=4
// by arival =/prodcuts?sortby=createdAt&order=desc&limit=4
//if noo params are sen, then send all products

exports.list = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc"
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
  let limit = req.query.limit ? parseInt(req.query.limit) : 6
  try {
    console.log(sortBy)
    const products = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(limit)
      .catch((error) => {
        return res.status(400).json({ error: error.message })
      })
    res.send(products)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

//get related products
//It will find the product based on request product category.
//based on that other products having same category will be returned
exports.listRelated = async (req, res) => {
  try {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    console.log(req.product.category)
    const products = await Product.find({
      _id: { $ne: req.product._id },
      category: req.product.category,
    })
      .select("-photo")
      .limit(limit)
      .catch((error) => {
        return res.status(400).json({ error: error.message })
      })
    return res.send(products)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.listCategories = async (req, res) => {
  try {
    const categorylist = await Product.distinct("category", {}).catch(
      (error) => {
        return res.status(400).json({ error: error.message })
      }
    )
    return res.send(categorylist)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

// list products by serach
//we will implement
exports.listBySearch = async (req, res) => {
  let order = req.query.order ? req.query.order : "asc"
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
  let limit = req.query.limit ? parseInt(req.query.limit) : 6
  let skip = req.query.skip ? parseInt(req.body.skip) : 0
  let findArgs = {}

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][0],
        }
      } else {
        findArgs[key] = req.body.filters[key]
      }
    }
  }
  try {
    const products = await Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .catch((error) => {
        return res.status(400).json({ error: "products are not found" })
      })
    res.json({ size: products.length, products })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

exports.photo = (req, res, next) => {
  try {
    if (req.product.photo.data) {
      res.set("content-Type", req.product.photo.contentType)
      return res.send(req.product.photo.data)
    }
    next()
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}
