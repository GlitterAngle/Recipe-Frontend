
const createBtn = document.querySelector('#create-recipe');
const logoutBtn = document.querySelector('#logout')

logoutBtn.addEventListener('click', function(){
    localStorage.removeItem('token')

    window.location.href = '../index.html'
})


createBtn.addEventListener('click', async function(e){
    //needs prevent default so that it does go back to the profile page not very sure why 
    e.preventDefault()
    await createRecipe()
    console.log('clicked')
})

async function createRecipe(){
    const image = document.querySelector('#imageInput').value
    const title = document.querySelector('.title').value
    const ingredients = document.querySelector('.ingredients').value
    const directions = document.querySelector('.directions').value
    const story = document.querySelector('.story').value
    //declare the token so you can use it in the header
    const token = localStorage.getItem('token')
    //declare the user id that is held in the deconstructed token
    const userId = decodeJWT().payload.userId

    console.log(userId,token)
   
    //try catch to do post and add all the information entered into the form
    try {
        // const response = await axios.post(`http://localhost:3000/api/recipes/${userId}`, {imagePath: image, title: title, ingredients: ingredients, directions: directions, story: story}, {headers: {Authorization: `Bearer ${token}`}})
        const response = await axios.post(`https://heartfeltbites-3a2e21beb448.herokuapp.com/api/recipes/${userId}`, {imagePath: image, title: title, ingredients: ingredients, directions: directions, story: story}, {headers: {Authorization: `Bearer ${token}`}})
        .then((response)=>{
            window.location.href = `profile.html?id=${userId}`
        })
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
