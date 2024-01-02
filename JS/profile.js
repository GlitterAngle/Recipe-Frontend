// //add a listener that runs when the DOM content is fully loaded and depending on the current URL runs a particular code
// document.addEventListener('DOMContentLoaded', function(){
//     //parses the current URL to check if there is a recipe ID parameter
//     const urlParams = new URLSearchParams(window.location.search)
//     const userId = urlParams.get('id')

//     //checks if the current page is allRecipes.html if soe calls allrecipes function and renderRecipes
//     if(window.location.href.includes(`/users.html?id=${userId}`)){
       
//     }
// })

// document.addEventListener('DOMContentLoaded', () => {
//     // Retrieve the token from local storage
//     const token = localStorage.getItem('token');

//     // Console log the token
//     console.log("User token:", token);
// });

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

// Use the function
try {
    const decoded = decodeJWT();
    console.log(decoded);
} catch (error) {
    console.error('Error decoding JWT:', error.message);
}
