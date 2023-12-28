//get all recipes only show title name
//get recipe by id show the whole recipe
//get the user by id and their entrie recipe history

let recipes = []
let users = []


document.addEventListener('DOMContentLoaded', function(){
    allRecipes()
    .then(()=>{
        return render()
    })
})

async function allRecipes(){
    const response = await axios.get("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes")
    .then(response=>{
        console.log(response.data.allRecipes)
        recipes = response.data.allRecipes
    })
    
}

function render(){
    recipes.forEach((recipe) => {
        const allRecipesContainer = document.querySelector('.allRecipes-containter')

        //create the divs where the information will live
        const recipeDiv = document.createElement('div')
        const recipeTitle = document.createElement('a')
        //will comeback and add image somehow 

        //make titles a hyperlink
        recipeTitle.href = ""

        //give class name 
        recipeDiv.className = "recipe"
        recipeTitle.className = "title"
        
        //fill text
        recipeTitle.textContent = recipe.title

        //append to div
        recipeDiv.appendChild(recipeTitle)

        //append div to page
        allRecipesContainer.appendChild(recipeDiv)

    });
}