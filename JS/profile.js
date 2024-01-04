const logoutBtn = document.querySelector('#logout')
let recipes = {}

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('token')
    window.location.href = 'html/login.html'
})



//add a listener that runs when the DOM content is fully loaded and depending on the current URL runs a particular code
document.addEventListener('DOMContentLoaded', function(){
    // use decodeJWT to get the userID as it's a parameter for gerRecipes
    const userId = decodeJWT().payload.userId
    getRecipes(userId)
    .then(()=>{
        renderProfile()
    })
})

async function getRecipes(userId){
   //pull the token information from local storage 
    const token = localStorage.getItem('token')

    try {
        console.log(token)
        const response = await axios.get(`http://localhost:3000/api/recipes/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }})  
            recipes = response.data.allUserRecipes
            
    } catch (error) {
        console.error("Error fetching all recipes: ", error.response.data || error.message);
    }
}


function renderProfile(){//make this a foreach loop
    //find the section with the class of profile
    recipes.forEach((recipe)=>{
        const profile = document.querySelector('.user-profile')

        //create a div element and p element
        const recipeDiv = document.createElement('div')
        const recipeTitle = document.createElement('a')
    
        //add a class to the div and element
        recipeDiv.className = 'profile'
        recipeTitle.className = 'recipe-title'
        
        console.log(recipe)
        //fill text
        recipeTitle.textContent = recipe.title 
        
        recipeTitle.href = `recipePage.html?id=${recipe._id}`
    
        //append the p element to the div element
        recipeDiv.appendChild(recipeTitle)
    
        //append the div element to the section element
        profile.appendChild(recipeDiv)
    })
}

// this is to get the token along with the user infor like the id and username
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

