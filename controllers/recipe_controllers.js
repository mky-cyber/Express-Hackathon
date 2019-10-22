const {
    getAllRecipes,
    addRecipe,
    deleteRecipe,
    updateRecipe,
    getOneRecipe
} = require("../utils/recipe_utils");

const makeRecipe = function (req, res) {
    addRecipe(req).save((err, post) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.status(201);
        res.send(post);
        console.log("recipe created");
    });
}

const getRecipes = function (req, res) {
    getAllRecipes(req).exec((err, recipes) => {
        if (err) {
            res.status(500);
            res.json({
                error: err.message
            });
        }
        res.send(recipes);
        console.log("All recipes displayed");
    });
};

const getRecipe = function (req, res) {
    getOneRecipe(req).exec((err, recipe) => {
        if (err) {
            res.status(404);
            res.send("Post not found");
        }
        res.send(recipe);
        console.log("Recipe displayed");
    });
};

const removeRecipe = function (req, res) {
    if (req.error) {
        req.status(req.error.status);
        res.send(req.error.message);
    } else {
        deleteRecipe(req.params.id).exec((err) => {
            if (err) {
                res.status(500);
                res.json({
                    error: err.message
                });
            }
            res.sendStatus(204);
            console.log("recipe deleted");
        });
    }
}

const changeRecipe = function(req, res) {
    if (req.error) {
        res.status(req.error.status);
        res.send(req.error.message);
    } else {
        updateRecipe(req).exec((err, post) => {
            if (err) {
                res.status(500);
                res.json({
                    error: err.message
                });
            }
            res.status(200);
            res.send(post);
            console.log("recipe updated");
        });
    }
}

module.exports = {
    getRecipes,
    makeRecipe,
    removeRecipe,
    changeRecipe,
    getRecipe
}