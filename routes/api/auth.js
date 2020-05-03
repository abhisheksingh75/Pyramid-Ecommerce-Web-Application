const express = require("express")
const router = express.Router()
const {
  userSignUpValidator,
  userSignInValidator,
} = require("../../validator/index")

const { signUp, signIn, signOut, auth } = require("../../controllers/auth")

//api/user/signup
//post - Sign Up User
//PUBLIC
router.post("/signup", userSignUpValidator, signUp)

//api/user/signup
//get - Sign in User
//PUBLIC
router.get("/signin", userSignInValidator, signIn)

//api/user/signout
//get - Sign out User
//PUBLIC
router.get("/signout", signOut)

module.exports = router
