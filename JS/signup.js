const submitBtn = document.querySelector(".submit")

submitBtn.addEventListener('click', async function(e){
    e.preventDefault()
    await newUser()
})

async function newUser(){
    const username = document.getElementById('username')
    const password = document.getElementById('password')
    const email = document.getElementById('email')

    const newUsername = username.value
    const newPassword = password.value
    const newEmail = email.value

    try {
        const response = await axios.post('http://localhost:3000/api/user', {username: newUsername, password: newPassword, email: newEmail})
        console.log(response.data)
    } catch (error) {
        console.error("Signup error:", error)
    }
}