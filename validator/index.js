const { check } = require("express-validator")
exports.userSignUpValidator = [
  check("name")
    .notEmpty()
    .withMessage("Name is required"),
  check("email")
    .isEmail()
    .withMessage("Enter valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Enter password of atlease 8 characters")
    .matches(/\d/)
    .withMessage("password must contain a number"),
]

exports.userSignInValidator = [
  check("email")
    .isEmail()
    .withMessage("Enter valid email address"),
]

exports.createCategory = [
  check("name")
    .notEmpty()
    .withMessage("Category name is required"),
]

exports.createProduct = [
  check("name")
    .notEmpty()
    .withMessage("Product name is required"),
  check("description")
    .notEmpty()
    .withMessage("Product description is required"),
  check("price")
    .notEmpty()
    .withMessage("Product price is required"),
]
