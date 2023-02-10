const express = require("express");
const router = express.Router();
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const { userSchema, reviewSchema } = require("../schemas.js");
const User = require("../models/user");
const user = require("../controllers/user");

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

router
  .route("/register")
  .get(user.renderRegister)
  .post(validateUser, catchAsync(user.register));

router
  .route("/login")
  .get(user.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    user.login
  );

router.get("/logout", user.logout);

module.exports = router;
