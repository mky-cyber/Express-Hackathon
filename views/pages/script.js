let serverUrl = "http://localhost:5000/";
let recipesUrl = serverUrl

function displayRecipes(recipes) {
    let section = document.querySelector("#recipe-list")
    section.innerHTML = null;
    let ul = document.createElement("ul")
    section.appendChild(ul)
    for (let recipe of recipes) {
        let li = document.createElement("li")
        li.textContent = recipe.name
        ul.appendChild(li)
    }
}

function getRecipeList() {
    fetch(recipesUrl)
        .then(response => {
            if (response.status !== 200) {
                console.log("Got an error from the server:", response.status)
                return
            }
            console.log("Got response from server:", response.body)
            // Parsing the response
            response.json().then(recipes => {
                displayRecipes(recipes)
                console.log("parsed body", recipes)
            })
        })
        .catch(err => console.log(err))
}

function jsonCallback(response) {
	console.log("parsed body", response)
	getRecipeList(response)
}

let newRecipeForm = document.getElementById("add-recipe-form")
newRecipeForm.addEventListener("submit", postNewRecipe)

function postNewRecipe(event) {
    event.preventDefault()
    let textField = event.target.elements[0]
    let recipe = textField.value
    console.log("recipe", recipe)
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: recipe
        })
    }
    fetch(recipesUrl, options).then((response) => {
        if (response.status !== 201) {
            console.log("There was a problem on the server:", response.status);
        }
        console.log("Added recipe");
        textField.value = "";
        response.json().then(jsonCallback)
    }).catch((err) => console.log(err));
}

getRecipeList()