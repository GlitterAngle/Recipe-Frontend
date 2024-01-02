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

document.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(window.location.search)
    const recipeId = urlParams.get('id')
    if(recipeId){
        recipeByID(recipeId)
    }
})

async function allRecipes(){
    const response = await axios.get("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes")
    .then(response=>{
        recipes = response.data.allRecipes
    })
    
}

// async function recipeByID(id){
//     const response = await axios.get(`https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes/${id}`)
//     .then(response=>{
//         oneRecipe = response.data.singleRecipe
//     }).then(()=>{
//         renderSingle()
//     })
// }

async function recipeByID(id){
    try {
        const response = await axios.get(`https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes/${id}`);
        renderSingle(response.data.singleRecipe);
    } catch (error) {
        console.error('Error fetching recipe:', error);
        // Handle errors, maybe display a message to the user
    }
}
document.addEventListener('DOMContentLoaded', function(){
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get('id');
    if (recipeId) {
        recipeByID(recipeId);
    }
});



function renderSingle(){
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
    recipes.forEach((recipe) => {
        const allRecipesContainer = document.querySelector('.allRecipes-container')

        //create the divs where the information will live
        const recipeDiv = document.createElement('div')
        const recipeTitle = document.createElement('a')
        //will comeback and add image somehow 

        //make titles a hyperlink
        recipeTitle.href = ""

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
            e.preventDefault()
            const id = e.target.getAttribute('data-id')//grabs the id for the recipe you click on 
            window.location.href = `html/recipePage.html?id=${id}`
            
        })

    });
}




///////
// function renderSingle(){
//     oneRecipe.forEach((recipe)=>{
//         //find the section in the html made for this area
//         const singleRecipeContainer = document.querySelector('.recipe-container')

//         //create divs where the information will life
//         const recipeDiv = document.createElement('div')
//         const recipeImg = document.createElement('img')
//         const recipeTitle = document.createElement('h2')
//         const recipeUser = document.createElement('h3')
//         const recipeCreated = document.createElement('p')
//         const recipeIngredients = document.createElement('p')
//         const recipeDirections = document.createElement('p')
//         const recipeStory = document.createElement('p')

//         //give them their values
//         recipeImg.src = oneRecipe.imagePath
//         recipeTitle.textContent = oneRecipe.title
//         recipeUser.textContent = oneRecipe.user
//         recipeCreated.textContent = oneRecipe.timestamps
//         recipeIngredients.textContent = oneRecipe.ingredients
//         recipeDirections.textContent = oneRecipe.directions
//         recipeStory.textContent = oneRecipe.story

//         //give class names
//         recipeDiv.className = 'recipeDiv'
//         recipeImg.className = 'recipeImg'
//         recipeTitle.className = 'recipeTitle'
//         recipeUser.className = 'recipeUser'
//         recipeCreated.className = 'recipeCreated'
//         recipeIngredients.className = 'recipeIngredients'
//         recipeDirections.className = 'recipeDirections'
//         recipeStory.className = 'recipeStory'

//         //set id incase user is logged in and wants to edit page from here 
//         recipeDiv.setAttribute('data-id', recipe._id)

//        //
        

//     })
// }

/////removing the email required for login

// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <link href="style.css">
//     <script defer src="/JS/longin.js"></script>
//     <script defer src="https://unpkg.com/axios/dist/axios.min.js"></script>
//     <title>Document</title>
// </head>
// <body>
//     <nav> 
//         <img src="../assets /DALL·E 2023-12-27 20.11.48 - Create a logo identical to the second example from the previous set, but replace the text with 'Heartfelt Bites'. The logo should have a simple and mi.png" width="100" height="100"/>
//         <a href="allRecipes.html" class="allRecipes">All Recipes</a>
//     </nav>
//     <div class="login">
//         <form class="username">
//             <text>
//                 <input type="text" placeholder="Enter username" id="username"/>
//                 <input type="password" placeholder="Enter password" id="password"/>
//                 <input placeholder="Enter email" id="email"/>
//                 <button class="account">Login</button>
//             </text>
//         </form>
//     </div>
//     <div class="new-memeber">
//         <p>Not a member yet joing us!</p>
//         <button class="join" type="submit">Join</button>
//     </div>
    
// </body>
// </html>


const logingBtn = document.querySelector('.account')
const joinBtn = document.querySelector('.join')

let userInfo = {}



logingBtn.addEventListener("click", async function(e){
    e.preventDefault()
    const id = e.target.getAttribute('data-id')
    await loginEvent()
    .then(()=>{

    })
})

joinBtn.addEventListener("click", function(){
    window.location.href = `signup.html`
})

async function loginEvent(){
    try {
        const username = document.querySelector("#username")
        const password = document.querySelector("#password")
        const email = document.querySelector("#email")

        const usernameInput = username.value
        const passwordInput = password.value
        const emailInput = email.value

        console.log("Attempting login with:", usernameInput, passwordInput, emailInput)

        const checkForUser = await axios.post("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/user/login",{username: usernameInput, password: passwordInput, email: emailInput})

        console.log("Server response:", checkForUser.data)
        console.log("check for user status", checkForUser.status)

        if(checkForUser.data){
            
            const token = checkForUser.data
            localStorage.setItem('token', token)
            console.log("after the checkforuser if statement",token)
            userInfo = checkForUser.data
            console.log('logged in user info:', userInfo)
            window.location.href =  `profile.html?id=${userInfo._id}`
            
        } else{
            const errorMessage = checkForUser.data.message || 'Login failed with no additional message'
            console.log('Login failed:this is the error', errorMessage)
            console.log("Else response:", checkForUser.data)
        }
    } catch (error) {
        console.error("Login error:", error)
    }
    

}

async function findUser(id){
    const response = await axios.get(`https://heartfeltbites-3a2e21beb448.herokuapp.com/api/user/${id}`)
    try {
        user = response.data.userInfo
        console.log('fetched user:', user)
    } catch (error) {
        console.log(error)
    }
}

///// what i tried for authenticatioin


async function loginEvent(){
    try {
        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value

        console.log("Attempting login with:", username, password)

        const response = await axios.post("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/user/login",{username: username, password: password})

        console.log("Server response:", response.data)
        console.log("check for user status", response.status)

        if(response.status === 200){
            
            localStorage.setItem('token', response.data.token)
            console.log("after the response if statement",response.data.token)

            userInfo = response.data.allUsers
            console.log('logged in user info:', userInfo)
            window.location.href =  `profile.html?id=${userInfo._id}`
            
        } else{
            const errorMessage = response.data.message || 'Login failed with no additional message'
            console.log('Login failed:this is the error', errorMessage)
            console.log("Else response:", response.data)
            alert('Error:' + errorMessage)
        }
    } catch (error) {
        console.error("Login error:", error)
    }
    

}
///

async function loginEvent(){
    try {
        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value

        logingBtn.setAttribute('data-id', userInfo._id)

        console.log("Attempting login with:", username, password)

        const response = await axios.post("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/user/login",{username: username, password: password})

        console.log("Server response:", response.data.userProfile)
        console.log("check for user status", response.status)

        if(response.status === 200){
            
            localStorage.setItem('token', response.data.token)
            console.log("after the response if statement",response.data.token, response.data)

            userInfo = response.data.userProfile
            console.log('logged in user info:', userInfo)
            window.location.href =  `profile.html?id=${userInfo._id}`
            
        } else{
            const errorMessage = response.data.message || 'Login failed with no additional message'
            console.log('Login failed:this is the error', errorMessage)
            console.log("Else response:", response.data)
            alert('Error:' + errorMessage)
        }
    } catch (error) {
        console.error("Login error:", error)
    }
    

}