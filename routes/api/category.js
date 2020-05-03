const express = require("express")
const router = express.Router()

const {
  create,
  read,
  categoryById,
  update,
  remove,
  list,
} = require("../../controllers/category")
const { requireSignIn, isAuth, isAdmin } = require("../../controllers/auth")
const { createCategory } = require("../../validator/index")
const { userById } = require("../../controllers/user")

//create category
router.post(
  "/create/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  createCategory,
  create
)
//update
router.put(
  "/update/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  createCategory,
  update
)

//delete
router.delete(
  "/remove/:categoryId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
)

//read category
router.get("/read/:categoryId", read)

router.get("/categories", list)

router.param("userId", userById)
router.param("categoryId", categoryById)
module.exports = router
