const Recipe = require("../models/recipe");

const addRecipe = function (req) {
  return new Recipe(req.body);
}

module.exports = {
  addRecipe,
}