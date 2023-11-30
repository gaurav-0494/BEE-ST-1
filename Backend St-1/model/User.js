const mongoose = require('mongoose');

const User = new mongoose.Schema({
    //Product schema

    Name: {type: String, required: true},
    Description: {type: String, required: true},
    Price: {type: Number, required: true},
    Category: {type: String, required: true},
    Reviews: {type: String},

    //review schema

    Content: {type: String,  required: true},
    Rating: {type: Number, required: true},
    Author: {type: String, required: true},
    CreatedAt: {type: Number}
})

module.exports = mongoose.model("G22User",User);
