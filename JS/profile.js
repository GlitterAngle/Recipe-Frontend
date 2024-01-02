// //add a listener that runs when the DOM content is fully loaded and depending on the current URL runs a particular code
// document.addEventListener('DOMContentLoaded', function(){
//     //parses the current URL to check if there is a recipe ID parameter
//     const urlParams = new URLSearchParams(window.location.search)
//     const userId = urlParams.get('id')

//     //checks if the current page is allRecipes.html if soe calls allrecipes function and renderRecipes
//     if(window.location.href.includes(`/users.html?id=${userId}`)){
       
//     }
// })

document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the token from local storage
    const userToken = localStorage.getItem('jwtToken');

    // Console log the token
    console.log("User token:", userToken);
});

