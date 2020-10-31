const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "User",
    },
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
