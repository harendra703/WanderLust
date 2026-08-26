const express = require("express");
const wrapAsync = require("../utils/wrapAsync.js");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage })


router
    .route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, validateListing, upload.single('listing[image]'), wrapAsync(listingController.createListing));

//NEW ROUTE

router.get("/new", isLoggedIn, listingController.newListing);

router
    .route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, validateListing,upload.single('listing[image]'), wrapAsync(listingController.updateListing))
    .delete(isOwner, isLoggedIn, wrapAsync(listingController.destroyListing));

//EDIT ROUTE

router.get("/:id/edit", isLoggedIn, isOwner, listingController.editListing)

module.exports = router;