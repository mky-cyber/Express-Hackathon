const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recipe = new Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Recipe', Recipe)