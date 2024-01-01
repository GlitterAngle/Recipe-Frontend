const logingBtn = document.querySelector('.account')
const joinBtn = document.querySelector('.join')



logingBtn.addEventListener("click", function(){
    console.log(logingBtn,"clicked")
})

joinBtn.addEventListener("click", function(){
    console.log(joinBtn, "clicked join")
    window.location.href = `signup.html`
})

async function loginEvent(){
    const username = document.getElementById(".username")
    const password = document.getAnimations(".password")

    const usernameInput = username.value
    const passwordInput = password.value

    const checkForUser = await axios.post("https://heartfeltbites-3a2e21beb448.herokuapp.com/api/user/login",{username: usernameInput, password: passwordInput})

    .then(()=>{
        return checkForUser
    })
}
