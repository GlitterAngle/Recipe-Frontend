//global variables

let recipes = []
let oneRecipe = {}


//add a listener that runs when the DOM content is fully loaded and depending on the current URL runs a particular code
document.addEventListener('DOMContentLoaded', function(){
    //parses the current URL to check if there is a recipe ID parameter
    const urlParams = new URLSearchParams(window.location.search)
    const recipeId = urlParams.get('id')

    //checks if the current page is allRecipes.html if soe calls allrecipes function and renderRecipes
    if(window.location.href.includes('/allRecipes.html')){
        allRecipes()
        .then(()=>{
            return renderRecipes()
        })
    }

    //checks if the current page is recipePage.html with a specific recipe id and if so calls the recipeById function and then the renderSingle 
    if(window.location.href.includes(`recipePage.html?id=${recipeId}`)){
        recipeByID(recipeId)
        
        .then(()=>{
            renderSingle()
        })
    }
   
})


//makes an async GET request to API endpont to fetch all recipes
async function allRecipes(){
    const token = localStorage.getItem('token')
    console.log('token', token)
    try {
        console.log(token)
        const response = await axios.get("http://localhost:3000/api/recipes", {
            headers: { Authorization: `Bearer ${token}` }})  
            recipes = response.data.allRecipes
            
    } catch (error) {
        console.error("Error fetching all recipes: ", error.response.data || error.message);
    }
    
    // .then(response=>{

    //     //stores the fetched data in an array
    //     recipes = response.data.allRecipes
    // })
    
}

//needs a recipe ID as a parameter with an async get with the ID as a parameter
async function recipeByID(id){
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`http://localhost:3000/api/recipes/${id}`, {headers: {Authorization: `Bearer ${token}`}}) 
        oneRecipe = response.data.singleRecipe
    } catch (error) {
        console.error(error)
    }
    // const response = await axios.get(`https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes/${id}`)
    // .then(response=>{

    //     //stores the fetched recipe in the oneRecipe that was globaly declared
    //     oneRecipe = response.data.singleRecipe
    // }).catch((error)=>{
    //     console.error(error)
    // })
}

function renderSingle(){
    // checks if oneRecipe is not empty 
    if(oneRecipe){ 
        //find the section in the html made for this area
            const singleRecipeContainer = document.querySelector('.recipe-container')
    
            //create divs where the information will life
            const recipeDiv = document.createElement('div')
            const recipeImg = document.createElement('img')
            const recipeTitle = document.createElement('h2')
            const recipeUser = document.createElement('h3')
            const recipeCreated = document.createElement('p')
            const recipeIngredients = document.createElement('p')
            const recipeDirections = document.createElement('p')
            const recipeStory = document.createElement('p')
    
            //give class names
            recipeDiv.className = 'recipeDiv'
            recipeImg.className = 'recipeImg'
            recipeTitle.className = 'recipeTitle'
            recipeUser.className = 'recipeUser'
            recipeCreated.className = 'recipeCreated'
            recipeIngredients.className = 'recipeIngredients'
            recipeDirections.className = 'recipeDirections'
            recipeStory.className = 'recipeStory'
    
            //set id incase user is logged in and wants to edit page from here 
            recipeDiv.setAttribute('data-id', oneRecipe._id)
    
            //fill text
            recipeImg.src = oneRecipe.imagePath
            recipeTitle.textContent = oneRecipe.title
            recipeUser.textContent = oneRecipe.user
            recipeCreated.textContent = oneRecipe.timestamp
            recipeIngredients.textContent = oneRecipe.ingredients
            recipeDirections.textContent = oneRecipe.recipeDirections
            recipeStory.textContent = oneRecipe.story
    
            //append to div 
            recipeDiv.appendChild(recipeImg)
            recipeDiv.appendChild(recipeTitle)
            recipeDiv.appendChild(recipeUser)
            recipeDiv.appendChild(recipeCreated)
            recipeDiv.appendChild(recipeIngredients)
            recipeDiv.appendChild(recipeDirections)
            recipeDiv.appendChild(recipeStory)
    
            //append the div to the html page
            singleRecipeContainer.appendChild(recipeDiv)
        }
}


function renderRecipes(){
    //iterates over the recipes array
    recipes.forEach((recipe) => {
        const allRecipesContainer = document.querySelector('.allRecipes-container')

        //create the divs where the information will live
        const recipeDiv = document.createElement('div')
        const recipeTitle = document.createElement('a')
        //will comeback and add image somehow 

        //make titles a hyperlink
        recipeTitle.href = `recipePage.html?id=${recipe._id}`

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
            const id = e.target.getAttribute('data-id')//grabs the id for the recipe you click on 
            recipeByID(id)
        })

    });
}





//global variables

// let recipes = []
// let oneRecipe = {}


// //add a listener that runs when the DOM content is fully loaded and depending on the current URL runs a particular code
// document.addEventListener('DOMContentLoaded', function(){
//     //parses the current URL to check if there is a recipe ID parameter
//     const urlParams = new URLSearchParams(window.location.search)
//     const recipeId = urlParams.get('id')

//     //checks if the current page is allRecipes.html if soe calls allrecipes function and renderRecipes
//     if(window.location.href.includes('/allRecipes.html')){
//         allRecipes()
//         .then(()=>{
//             return renderRecipes()
//         })
//     }

//     //checks if the current page is recipePage.html with a specific recipe id and if so calls the recipeById function and then the renderSingle 
//     if(window.location.href.includes(`recipePage.html?id=${recipeId}`)){
//         recipeByID(recipeId)
        
//         .then(()=>{
//             renderSingle()
//         })
//     }
   
// })


// //makes an async GET request to API endpont to fetch all recipes
// async function allRecipes(){
//     const response = await axios.get("http://localhost:3000/api/recipes")
//     .then(response=>{

//         //stores the fetched data in an array
//         recipes = response.data.allRecipes
//     })
    
// }

// //needs a recipe ID as a parameter with an async get with the ID as a parameter
// async function recipeByID(id){
//     const response = await axios.get(`http://localhost:3000/api/recipes/${id}`)
//     .then(response=>{

//         //stores the fetched recipe in the oneRecipe that was globaly declared
//         oneRecipe = response.data.singleRecipe
//     }).catch((error)=>{
//         console.error(error)
//     })
// }

// function renderSingle(){
//     // checks if oneRecipe is not empty 
//     if(oneRecipe){ 
//         //find the section in the html made for this area
//             const singleRecipeContainer = document.querySelector('.recipe-container')
    
//             //create divs where the information will life
//             const recipeDiv = document.createElement('div')
//             const recipeImg = document.createElement('img')
//             const recipeTitle = document.createElement('h2')
//             const recipeUser = document.createElement('h3')
//             const recipeCreated = document.createElement('p')
//             const recipeIngredients = document.createElement('p')
//             const recipeDirections = document.createElement('p')
//             const recipeStory = document.createElement('p')
    
//             //give class names
//             recipeDiv.className = 'recipeDiv'
//             recipeImg.className = 'recipeImg'
//             recipeTitle.className = 'recipeTitle'
//             recipeUser.className = 'recipeUser'
//             recipeCreated.className = 'recipeCreated'
//             recipeIngredients.className = 'recipeIngredients'
//             recipeDirections.className = 'recipeDirections'
//             recipeStory.className = 'recipeStory'
    
//             //set id incase user is logged in and wants to edit page from here 
//             recipeDiv.setAttribute('data-id', oneRecipe._id)
    
//             //fill text
//             recipeImg.src = oneRecipe.imagePath
//             recipeTitle.textContent = oneRecipe.title
//             recipeUser.textContent = oneRecipe.user
//             recipeCreated.textContent = oneRecipe.timestamp
//             recipeIngredients.textContent = oneRecipe.ingredients
//             recipeDirections.textContent = oneRecipe.recipeDirections
//             recipeStory.textContent = oneRecipe.story
    
//             //append to div 
//             recipeDiv.appendChild(recipeImg)
//             recipeDiv.appendChild(recipeTitle)
//             recipeDiv.appendChild(recipeUser)
//             recipeDiv.appendChild(recipeCreated)
//             recipeDiv.appendChild(recipeIngredients)
//             recipeDiv.appendChild(recipeDirections)
//             recipeDiv.appendChild(recipeStory)
    
//             //append the div to the html page
//             singleRecipeContainer.appendChild(recipeDiv)
//         }
// }


// function renderRecipes(){
//     //iterates over the recipes array
//     recipes.forEach((recipe) => {
//         const allRecipesContainer = document.querySelector('.allRecipes-container')

//         //create the divs where the information will live
//         const recipeDiv = document.createElement('div')
//         const recipeTitle = document.createElement('a')
//         //will comeback and add image somehow 

//         //make titles a hyperlink
//         recipeTitle.href = `recipePage.html?id=${recipe._id}`

//         //give class name 
//         recipeDiv.className = "recipe"
//         recipeTitle.className = "singleTitle"

//         //set ID 
//         recipeTitle.setAttribute('data-id', recipe._id)
        
        
//         //fill text
//         recipeTitle.textContent = recipe.title

//         //append to div
//         recipeDiv.appendChild(recipeTitle)

//         //append div to page
//         allRecipesContainer.appendChild(recipeDiv)

//         recipeTitle.addEventListener('click', function(e){
//             const id = e.target.getAttribute('data-id')//grabs the id for the recipe you click on 
//             recipeByID(id)
//         })

//     });
// }