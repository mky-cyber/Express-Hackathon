const mongoose = require("mongoose");
const assert =  require("assert");
const Recipe = require("../models/recipe");
const recipes = require("../assets/recipe.json");

mongoose.connect('mongodb://localhost/my_recipe');

var db = mongoose.connection;

const importRecipe = function () {
  Recipe.collection.insertMany(recipes, (err, res) => {
    assert.equal(null, err);
    assert.equal(9, res.insertedCount);
    db.close();
  });
  console.log(`Data imported successfully ${Recipe.find()}`);
}

importRecipe();
