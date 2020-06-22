const express = require("express")
const router = express.Router()

const {
  create,
  productById,
  read,
  remove,
  update,
  list,
  listRelated,
  listCategories,
  listBySearch,
  listBySearchPattern,
  photo,
} = require("../../controllers/product")
const { requireSignIn, isAuth, isAdmin } = require("../../controllers/auth")
const { createProduct } = require("../../validator/index")
const { userById } = require("../../controllers/user")

//create product
router.post("/create/:userId", requireSignIn, isAuth, isAdmin, create)

// get public api: read product
router.get("/read/:productId", read)

// get private admin api: read product
router.delete(
  "/delete/:productId/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  remove
)

//put private admin api: udpate product
router.put("/update/:productId/:userId", requireSignIn, isAuth, isAdmin, update)

//get all products
router.get("/products", list)

//get releated Products
router.get("/related/:productId", listRelated)

//get all categories for prooducts
router.get("/categories", listCategories)

//get product by search
router.post("/by/search", listBySearch)

// get product by pattern
router.get("/by/searchpattern", listBySearchPattern)

router.get("/photo/:productId", photo)

router.param("userId", userById)
router.param("productId", productById)
module.exports = router
