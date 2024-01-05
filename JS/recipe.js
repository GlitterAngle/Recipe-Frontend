//global variables

let recipes = []
let oneRecipe = {}


const logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('token')

    window.location.href = 'index.html'
})

//add a listener that runs when the DOM content is fully loaded and depending on the current URL runs a particular code
document.addEventListener('DOMContentLoaded', function(){
    //parses the current URL to check if there is a recipe ID parameter
    const urlParams = new URLSearchParams(window.location.search)
    const recipeId = urlParams.get('id')

    //checks if the current page is allRecipes.html if soe calls allrecipes function and renderRecipes
    if(window.location.href.includes('/html/allRecipes.html')){
        console.log('all recipes')
        allRecipes()
        .then(()=>{
            return renderRecipes()
        })
    }

    //checks if the current page is recipePage.html with a specific recipe id and if so calls the recipeById function and then the renderSingle 
    if(window.location.href.includes(`/html/recipePage.html?id=${recipeId}`)){
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
    
}

//needs a recipe ID as a parameter with an async get with the ID as a parameter
async function recipeByID(id){
    const token = localStorage.getItem('token')
    try {
        const response = await axios.get(`http://localhost:3000/api/recipes/${id}`, {headers: {Authorization: `Bearer ${token}`}}) 
        oneRecipe = response.data.singleRecipe
        // console.log(oneRecipe)
    } catch (error) {
        console.error(error)
    }
}

async function editRecipe(e, id){
    //get the token from local storage
    const token = localStorage.getItem('token')
    //target the parent node holding the area you want to edit
    const recipeDiv = e.target.parentNode 

    //target the area you want to edit
    const recipeImage = recipeDiv.querySelector('.recipeImg')
    const recipeTitle = recipeDiv.querySelector('.recipeTitle')
    const recipeIngredients = recipeDiv.querySelector('.recipeIngredients')
    const recipeDirections = recipeDiv.querySelector('.recipeDirections')
    const recipeStory = recipeDiv.querySelector('.recipeStory')

    //because there are two buttons on the page you need to target the one that was clicked
    const editBtn = recipeDiv.querySelector('button:nth-of-type(1)')

    //if the button says edit you will allow the click to make the area editable and change the edit button to say save
    if(editBtn.textContent === 'Edit'){
        recipeImage.contentEditable = true
        recipeTitle.contentEditable = true
        recipeIngredients.contentEditable = true
        recipeDirections.contentEditable = true
        recipeStory.contentEditable = true

        //change the button to say save
        editBtn.textContent = 'Save Changes'
    }else{
        recipeImage.contentEditable = false
        recipeTitle.contentEditable = false
        recipeIngredients.contentEditable = false
        recipeDirections.contentEditable = false
        recipeStory.contentEditable = false

        //change the button to say edit
        editBtn.textContent = 'Edit'

        //grab the new information from the page
        const newImage = recipeImage.textContent
        const newTitle = recipeTitle.textContent
        const newIngredients = recipeIngredients.textContent
        const newDirections = recipeDirections.textContent
        const newStory = recipeStory.textContent

        try {
            const response = await axios.put(`http://localhost:3000/api/recipes/${id}`, {imagePath: newImage, title: newTitle, ingredients: newIngredients, directions: newDirections, story: newStory}, {headers: {Authorization: `Bearer ${token}`}})
        } catch (error) {
           throw new Error(error) 
        }
    }
}


function renderSingle(){
    //adding decodeJWT to get the user id from the token
    const token = localStorage.getItem('token')
    const userId = decodeJWT().payload.userId
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
            recipeUser.textContent = oneRecipe.user.username
            recipeCreated.textContent = oneRecipe.timestamp
            recipeIngredients.textContent = oneRecipe.ingredients
            recipeDirections.textContent = oneRecipe.directions
            recipeStory.textContent = oneRecipe.story
    
            //append to div 
            recipeDiv.appendChild(recipeImg)
            recipeDiv.appendChild(recipeTitle)
            recipeDiv.appendChild(recipeUser)
            recipeDiv.appendChild(recipeCreated)
            recipeDiv.appendChild(recipeIngredients)
            recipeDiv.appendChild(recipeDirections)
            recipeDiv.appendChild(recipeStory)
            console.log(recipeDiv)
    
            //append the div to the html page
            singleRecipeContainer.appendChild(recipeDiv)

            if(userId === oneRecipe.user._id){
                const editBtn = document.createElement('button')
                editBtn.className = 'editBtn'
                editBtn.textContent = 'Edit'
                recipeDiv.appendChild(editBtn)
                const deleteBtn = document.createElement('button')
                deleteBtn.className = 'deleteBtn'
                deleteBtn.textContent = 'Delete'
                recipeDiv.appendChild(deleteBtn)
                
                editBtn.addEventListener('click', function(e){
                    editRecipe(e, oneRecipe._id)
                })

                deleteBtn.addEventListener('click', async function(e){
                    try {
                        await axios.delete(`http://localhost:3000/api/recipes/${oneRecipe._id}`, {headers: {Authorization: `Bearer ${token}`}})
                        window.location.href = `profile.html?id=${userId}`
                    } catch (error) {
                       throw new Error(error) 
                    }
            })
        } 
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

//I need to get the user id from the token so that i can see if the user is on the single recipe page to allow edits
function decodeJWT() {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage
    if (!token) {
        throw new Error('No token found in local storage');
    }

    const parts = token.split('.'); // Split the token into parts
    if (parts.length !== 3) {
        throw new Error('The token is invalid');
    }

    const decodedHeader = atob(parts[0]); // Decode the header
    const decodedPayload = atob(parts[1]); // Decode the payload

    return {
        header: JSON.parse(decodedHeader),
        payload: JSON.parse(decodedPayload)
    };
}