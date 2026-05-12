require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listings.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({
  accessToken: mapToken,
});

const dbURL =process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbURL);
}

const initDB = async ()=>{
await Listing.deleteMany({});
initData.data = initData.data.map((obj)=>({...obj, owner:"6a00c16b66e52d3d18ed29f1"}));
await Listing.insertMany(initData.data);
console.log("data initialized successfully");
}

initDB();