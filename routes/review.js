const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router({mergeParams:true});
const {validateReview, isLoggedIn, isReviewAuthor }= require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

//Post review route

router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.addNewReview));

//Post review delete route

router.delete("/:reviewId",isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;