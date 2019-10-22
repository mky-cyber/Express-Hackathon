const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Recipe = new Schema({
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [{
      quantity: {
        type: String,
      },
      name: {
        type: String,
      },
      type: {
        type: String,
      }
    }],
    required: true
  },
  steps: {
    type: String,
    required: true
  },
  timers: {
    type: [Number]
  },
  imageURL: {
    type: String
  },
  originalURL: {
    type: String
  }
});



module.exports = mongoose.model('Recipe', Recipe);