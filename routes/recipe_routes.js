const express = require('express');
const router = express.Router();
const {
    getRecipes,
    makeRecipe,
    removeRecipe,
    changeRecipe,
    getRecipe
} = require("../controllers/recipe_controllers");

// CREATE
router.post("/", makeRecipe);

// READ
router.get("/", getRecipes);
// router.get("/", function (request, response) {
//     let recipes = getRecipes();
//     console.log(`recipes: ${recipes}`)
//     response.render("pages/index", {dogs: recipes});
// })

router.get("/:id", getRecipe);

// DELETE
router.delete("/:id", removeRecipe);

// UPDATE
router.put("/:id", changeRecipe)

module.exports = router;