const express = require("express")
const router = express.Router()
const { requireSignIn, isAuth, isAdmin } = require("../../controllers/auth")
const { userById, addOrderToUserHistory } = require("../../controllers/user")
const {
  create,
  listOrder,
  getOrderStatusValues,
  updateOrderStatus,
  orderById,
} = require("../../controllers/order")
const { ProductQuantityUpdate } = require("../../controllers/product")

router.post(
  "/create/:userId",
  requireSignIn,
  isAuth,
  addOrderToUserHistory,
  ProductQuantityUpdate,
  create
)

router.get("/list/:userId", requireSignIn, isAuth, isAdmin, listOrder)
router.get(
  "/order-status/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  getOrderStatusValues
)
router.put(
  "/:orderId/status/:userId",
  requireSignIn,
  isAuth,
  isAdmin,
  updateOrderStatus
)

router.param("userId", userById)
router.param("userId", orderById)

module.exports = router
