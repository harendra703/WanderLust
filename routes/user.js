const express = require("express");
const router = express.Router()
const User = require("../models/user.js");
const { use } = require("passport");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//SignUp

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(userController.signUpUser);

//LogIn

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), userController.loginUser);

//LogOut

router.get("/logout", userController.logoutUser);

module.exports = router;