const serverUrl = "http://localhost:5000/";
const recipesUrl = serverUrl;
const recipeUrl =  serverUrl + 'random';

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

function printString(info) {
    let section = document.getElementById("one-recipe");
    let para = document.createElement("p");
    section.appendChild(para);
    para.textContent = info;
}

function printIngredients(info) {
    let section = document.getElementById("one-recipe");
    let ingredients = document.createElement("ul");
    section.appendChild(ingredients);
    console.log(`info: ${info}`);
    ingredients.textContent = "Ingredients:";
    for(let i = 0; i < info.length; i++) {
        let ul = document.createElement("ul");
        section.appendChild(ul);
        ul.textContent = `${info[i].name}: ${info[i].quantity}`;
    }
}

function printArray(key, value) {
    let section = document.getElementById("one-recipe");
    let keyName = document.createElement("ul");
    section.appendChild(keyName);
    keyName.textContent = `${key}: `;
    for(let i = 0; i < value.length; i++) {
        let ul = document.createElement("ul");
        section.appendChild(ul);
        ul.textContent = value[i];
    }
}

function displayOneRecipe(recipe) {
    let section = document.getElementById("one-recipe");
    section.innerHTML = null;
    printString(`Name: ${recipe.name}`);
    printIngredients(recipe.ingredients)
    printArray("Steps", recipe.steps);
    printArray("Timer", recipe.timers);
    printString(`Image: ${recipe.imageURL}`);
    printString(`Original url: ${recipe.originalURL}`);
}

function getOneRecipe(event) {
    fetch(recipeUrl)
        .then(response => {
            if (response.status !== 200) {
                console.log("Got an error from the server:", response.status)
                return
            }
            console.log("Got response from server:", response.body)
            // Parsing the response
            response.json().then(recipe => {
                event.preventDefault();
                console.log("parsed body", recipe[0])
                displayOneRecipe(recipe[0]);
            })
        })
        .catch(err => console.log(err))
}

function getRecipeList(event) {
    fetch(recipesUrl)
        .then(response => {
            if (response.status !== 200) {
                console.log("Got an error from the server:", response.status)
                return
            }
            console.log("Got response from server:", response.body)
            // Parsing the response
            response.json().then(recipes => {
                event.preventDefault();
                displayRecipes(recipes);
                console.log("parsed body", recipes)
            })
        })
        .catch(err => console.log(err))
}


document.getElementById("getAllRecipes").addEventListener("click", getRecipeList);

document.getElementById("getOneRecipe").addEventListener("click", getOneRecipe);

function jsonCallback(response) {
	console.log("parsed body", response)
	getRecipeList(response)
}

let newRecipeForm = document.getElementById("add-recipe-form")
newRecipeForm.addEventListener("submit", postNewRecipe)

function postNewRecipe(event) {
    event.preventDefault()
    let textField = event.target.elements
    let options = {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            "name": textField[0].value,
            "ingredients": [{"quantity": textField[1].value, "name": textField[2].value, "type": textField[3].value}],
            "steps": [textField[4].value]
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
