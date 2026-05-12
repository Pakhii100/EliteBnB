const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const Listing = require("../models/listings.js");
const {isLoggedIn} = require("../middleware.js")
const {isOwner,validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer = require("multer");
const { cloudinary,storage } = require("../cloudConfig");
const upload = multer({ storage });

//index and create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("image"),validateListing,wrapAsync(listingController.createListing))

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm)


//show,update,delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,upload.single("listing[image]"),isOwner,validateListing, wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))

//edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.renderEditForm));


module.exports = router;