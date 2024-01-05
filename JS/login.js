const logingBtn = document.querySelector('#account')
const joinBtn = document.querySelector('#join')

let userInfo = {}

logingBtn.addEventListener("click", async function(e){
    e.preventDefault()
    const id = e.target.getAttribute('data-id')
    await loginEvent(id)
    .then(()=>{

    })
})

joinBtn.addEventListener("click", function(){
    window.location.href = `signup.html`
})

async function loginEvent(){
    try {
        const username = document.querySelector("#username").value
        const password = document.querySelector("#password").value

        // logingBtn.setAttribute('data-id', userInfo._id)

        console.log("Attempting login with:", username, password)

        // const response = await axios.post("http://localhost:3000/api/user/login",{username: username, password: password})
        const response = await axios.post("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/user/login",{username: username, password: password})

        console.log("Server response:", response.data)
        console.log("check for user status", response.status)

        if(response.status === 200){
            
            localStorage.setItem('token', response.data.token)
            console.log("after the response if statement",response.data.token, response.data)

            userInfo = response.data.userProfile
            console.log('logged in user info:', userInfo)
            window.location.href =  `/html/profile.html?id=${userInfo._id}`
            
            
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

