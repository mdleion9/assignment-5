  document.getElementById("loginForm")
.addEventListener("submit",function(e){

e.preventDefault()

const username =
document.getElementById("username").value.trim()

const password =
document.getElementById("password").value.trim()

if(username === "admin" && password === "admin123"){

window.location.href = "home .html"

}
else{

alert("Wrong username or password")

}

})

