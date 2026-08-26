const Listing = require("../models/listing");

//Index

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

//New Listing

module.exports.newListing = (req, res) => {
    res.render("listings/new.ejs");
};

//Show Listing

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for dose not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing});
};

//Create Listing

module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url,filename};
    req.flash("success", "New Listing Created!");
    await newListing.save();
    res.redirect("/listings");
}

//Edit Listing

module.exports.editListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing you requested for dose not exist!");
        return res.redirect("/listings");
    }
    let orignalListingUrl = listing.image.url;
    orignalListingUrl = orignalListingUrl.replace("upload","upload/w_250");
    res.render("listings/edit.ejs", { listing ,orignalListingUrl});
};

//Update Listing
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
   let newListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file != "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        newListing.image = {url,filename};
        newListing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

//Destroy Listing

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
    // console.log(deleteListing);
};