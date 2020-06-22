const express = require("express")
const router = express.Router()

const { requireSignIn, isAuth, isAdmin } = require("../../controllers/auth")
const {
  userById,
  read,
  update,
  purchaseHistory,
} = require("../../controllers/user")

router.get("/secret/:userId", requireSignIn, isAuth, isAdmin, (req, res) => {
  res.json({
    user: req.profile,
  })
})

//read user
router.get("/read/:userId", requireSignIn, isAuth, read)

//update user
router.put("/update/:userId", requireSignIn, isAuth, update)

//read user purchase history
router.get(
  "/read/purchasehistory/:userId",
  requireSignIn,
  isAuth,
  purchaseHistory
)

router.param("userId", userById)

module.exports = router
