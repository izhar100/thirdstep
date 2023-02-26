let loginUserEmail = document.getElementById("email");
let loginUserPassword = document.getElementById("password");
let loginUserform = document.querySelector("form");
let cartData = JSON.parse(localStorage.getItem("productsAdd")) || [];
let login_name = JSON.parse(localStorage.getItem("login_name")) || [];
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let loginUserToken = localStorage.getItem("loginUser") || false;
console.log("loginUserToken:", loginUserToken);
loginUserform.addEventListener("submit", (e) => {
  e.preventDefault();
  //login box border red if empty
  if(loginUserEmail.value==""){
    loginUserEmail.style.border="2px solid red";
  }
  else if(loginUserPassword.value==""){
    loginUserEmail.style.border="1px solid black";
    loginUserPassword.style.border="2px solid red";
  }
  //
  else{
    loginUserEmail.style.border="1px solid black";
    loginUserPassword.style.border="1px solid black";
    loginUser();
  }
});

function loginUser() {
  fetch(`https://63c77a71e52516043f3eaecd.mockapi.io/Dominos/`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        if (
          loginUserEmail.value == "admin@gmail.com" &&
          loginUserPassword.value == "admin"
        ) {
          if (loginUserToken == false) {
            location.href = "../Admin Side/admin.html";
          } else {
            alert("Please sign out before logging as Admin");
          }

          return;
        } else if (
          data[i].email == loginUserEmail.value &&
          data[i].password == loginUserPassword.value
        ) {
          loginUserToken = true;
          localStorage.setItem("loginUser", loginUserToken);
          login_name = data[i].firstName;
          localStorage.setItem("login_name", JSON.stringify(login_name));
          console.log(loginUserToken);
          alert("log in successful");
          location.href = "../User Side/menu.html";
          return;
        }
      }
      alert("Invalid Details");
      return;
    });
}

console.log(loginUserToken);
