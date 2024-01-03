// //idk if i will need this
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Console log the token
    console.log("User token:", token);
});



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


//I think this was just to test if the fucntion worked
// Use the function
try {
    const decoded = decodeJWT();
    console.log(decoded);
} catch (error) {
    console.error('Error decoding JWT:', error.message);
}



/////how i had profile js

const logoutBtn = document.querySelector('.logout')
let recipes = {}

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('token')

    window.location.href = 'html/login.html'
})



//add a listener that runs when the DOM content is fully loaded and depending on the current URL runs a particular code
document.addEventListener('DOMContentLoaded', function(){
    //parses the current URL to check if there is a recipe ID parameter
    const urlParams = new URLSearchParams(window.location.search)//this works pulls an array of 1 because thats what it is
    console.log(urlParams)

    const userId = urlParams.get('id')//this works
    console.log(userId)

    //checks if the current page is allRecipes.html if soe calls allrecipes function and renderRecipes
    if(window.location.href.includes(`/profile.html?id=${userId}`)){
       getRecipes()
       .then(()=>{
        // console.log(recipes)
        renderProfile()
       })
    } 
})

async function getRecipes(){
    const urlParams = new URLSearchParams(window.location.search)
    const token = localStorage.getItem('token')
    const userId = urlParams.get('id')
    console.log(userId)
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


//if i'm going to add images
async function createRecipe(){
    const image = document.querySelector('.imageInput')
    const title = document.querySelector('.title').value
    const ingredients = document.querySelector('.ingredients').value
    const directions = document.querySelector('.directions').value
    const story = document.querySelector('.story').value
    //declare the token so you can use it in the header
    const token = localStorage.getItem('token')
    //declare the user id that is held in the deconstructed token
    const userId = decodeJWT().payload.userId
   //to upload the image
   const formData = new FormData();
   if (image.files[0]) {
       formData.append('image', image.files[0]);
   }
   //another way to add the information to the form so you don't need to add it in the response one by one
   formData.append('title', title);
   formData.append('ingredients', ingredients);
   formData.append('directions', directions);
   formData.append('story', story)
    //try catch to do post and add all the information entered into the form
    try {
        const response = await axios.post(`http://localhost:3000/api/recipes/${userId}`, formData,{headers: {Authorization: `Bearer ${token}`}})
        // .then((response)=>{
        //     window.location.href = `profile.html?id=${userId}`
        // })
        if(response.status === 200){
            window.location.href = `profile.html?id=${userId}`
        }else{
            console.log('error not redirecting to profile page')
        }
    } catch (error) {
        console.error('Error creating recipe:', error.response.data || error.message)
    }

}


// this is to get the token along with the user infor like the id and username
// function decodeJWT() {
//     const token = localStorage.getItem('token'); // Retrieve the token from local storage
//     if (!token) {
//         throw new Error('No token found in local storage');
//     }

//     const parts = token.split('.'); // Split the token into parts
//     if (parts.length !== 3) {
//         throw new Error('The token is invalid');
//     }

//     const decodedHeader = atob(parts[0]); // Decode the header
//     const decodedPayload = atob(parts[1]); // Decode the payload

//     return {
//         header: JSON.parse(decodedHeader),
//         payload: JSON.parse(decodedPayload)
//     };
// }

