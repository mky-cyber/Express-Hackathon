let serverUrl = "http://localhost:5000/";
let recipesUrl = serverUrl

function displayRecipes(recipes) {
    let section = document.querySelector("#recipe-list")
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

getRecipeList()