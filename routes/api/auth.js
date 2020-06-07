const express = require("express")
const router = express.Router()
const {
  userSignUpValidator,
  userSignInValidator,
} = require("../../validator/index")

const {
  signUp,
  signIn,
  signOut,
  requireSignIn,
  loadUser,
} = require("../../controllers/auth")

//api/auth/signup
//post - Sign Up User
//PUBLIC
router.post("/signup", userSignUpValidator, signUp)

//api/auth/signup
//get - Sign in User
//PUBLIC
router.post("/signin", userSignInValidator, signIn)

//api/auth
router.get("/", requireSignIn, loadUser)

module.exports = router
