const Recipe = require("../models/recipe");

const addRecipe = function (req) {
    return new Recipe(req.body)
};

const getAllRecipes = function (req) {
    return Recipe.find();
};

const getOneRecipe = function (req) {
    // return Recipe.findById(req.params.id);
    return Recipe.aggregate(
      [{$sample: {size: 1}}]
    );
};

const deleteRecipe = function (id) {
    return Recipe.findByIdAndRemove(id);
};

const updateRecipe = function(req) {
    return Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
}

module.exports = {
    getAllRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    getOneRecipe
}