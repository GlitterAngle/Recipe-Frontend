//get all recipes only show title name
//get recipe by id show the whole recipe
//get the user by id and their entrie recipe history

let recipes = []
let oneRecipe = []
let users = []


document.addEventListener('DOMContentLoaded', function(){
    allRecipes()
    .then(()=>{
        return renderRecipes()
    })
})

// document.addEventListener('DOMContentLoaded', function(){
//     recipeByID()
//     .then(()=>{

//     })
// })


async function allRecipes(){
    const response = await axios.get("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes")
    .then(response=>{
        recipes = response.data.allRecipes
    })
    
}

async function recipeByID(id){
    const response = await axios.get(`https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes/${id}`)
    .then(response=>{
        oneRecipe = response.data.singleRecipe
    })
}

function renderRecipes(){
    recipes.forEach((recipe) => {
        const allRecipesContainer = document.querySelector('.allRecipes-container')

        //create the divs where the information will live
        const recipeDiv = document.createElement('div')
        const recipeTitle = document.createElement('a')
        //will comeback and add image somehow 

        //make titles a hyperlink
        recipeTitle.href = "html/recipePage.html"

        //give class name 
        recipeDiv.className = "recipe"
        recipeTitle.className = "singleTitle"

        //set ID 
        recipeTitle.setAttribute('data-id', recipe._id)
        
        
        //fill text
        recipeTitle.textContent = recipe.title

        //append to div
        recipeDiv.appendChild(recipeTitle)

        //append div to page
        allRecipesContainer.appendChild(recipeDiv)

        recipeTitle.addEventListener('click', function(e){
            // e.preventDefault()
            const id = e.target.getAttribute('data-id')//grabs the id for the recipe you click on 
            console.log('clicked recipe id:',id)
            recipeByID(id)
        })

    });
}